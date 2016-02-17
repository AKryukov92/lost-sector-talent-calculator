function TalentController() {
	this.layouts = {};
	this.currentPrefix;
	this.currentVersion;
	this.talentInput;
	this.orderToDisplay = function(prefix, version, talentInput) {
		if (prefix == this.currentPrefix && version == this.currentVersion) {
			return;
		}
		this.currentPrefix = prefix;
		this.currentVersion = version;
		this.talentInput = talentInput;
		if (typeof this.layouts[version] == "undefined") {
			this.layouts[version] = {};
			this.loadImages(version);
		} else {
			this.activateView(this.getView());
		}
	};
	this.getView = function() {
		return this.layouts[this.currentVersion].classViews[this.currentPrefix];
	};
	this.getCalculator = function() {
		return this.getView().calculator;
	}
	this.getDataVersion = function() {
		return 1;
	};
	this.getGameVersion = function() {
		return this.currentVersion;
	};
	
	this.loadImages = function(version) {
		this.layouts[version].atlases = {};
		var loadedImages = 0;
		var numImages = 2;
		var sources = {
			atlasActive: "images/Skills" + version + ".png",
			atlasInactive: "images/inactiveSkills" + version + ".png"
		};
		for(var src in sources) {
			this.layouts[version].atlases[src] = new Image();
			this.layouts[version].atlases[src].onload = function() {
				if(++loadedImages >= numImages) {
					notifyControllerImageLoad(version);
				}
			};
			this.layouts[version].atlases[src].src = sources[src];
		}
	};
	this.getTalentData = function(version) {
		$.get("/talent_data.php?version=" + version, function(data) {
			notifyControllerDataLoad(version, data);
		});
	};
	this.activateView = function(talentApplication) {
		$("#calculator-layout").attr("width", talentApplication.getTotalWidth());
		$("#calculator-layout").attr("height", talentApplication.getTotalHeight());
		if (typeof this.talentInput != "undefined") {
			talentApplication.calculator.learnTalentsFromString(this.talentInput);
		}
		talentApplication.displayLayout();
		update_link();
	};
	this.dispatchClick = function(x, y) {
		this.getView().handleClick(x, y);
		update_link();
		$("#merc-level").html(this.getView().getCalculator().getRequiredLevel());
		$("#points-left").html(this.getView().getCalculator().getAvailableTalentPoints());
		updateTalentTooltip(this.getView());
	};
	this.dispatchMouseMove = function(x, y) {
		this.getView().handleMouseMove(x, y);
		if (!$("#talent-visibility-checkbox").is(":checked")) {
			updateTalentTooltip(this.getView());
		}
	}
}
var talentController = new TalentController();
function notifyControllerImageLoad(version) {
	talentController.getTalentData(version);
}
function notifyControllerDataLoad(version, data) {
	var images = talentController.layouts[version].atlases;
	var locale = getLocale();
	talentController.layouts[version].classViews = {
		"as": new ClassTalentView(locale, data.as, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
		"ju": new ClassTalentView(locale, data.ju, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
		"sc": new ClassTalentView(locale, data.sc, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
		"su": new ClassTalentView(locale, data.su, images.atlasActive, images.atlasInactive, new Calculator(), getContext)
	};
	talentController.activateView(talentController.getView());
}
function getContext(prefix) {
	var element = document.getElementById("calculator-layout");
	return element.getContext('2d');
}
function toggleTalentTooltip() {
	var display = $("#talent-visibility-checkbox").is(":checked");
	$("#talent-tooltip").toggle(!display);
}
toggleTalentTooltip();
function updateTalentTooltip(controller) {
	if (typeof controller.recentItem != 'undefined') {
		if (controller.recentItem.base().id != recentId) {
			recentId = controller.recentItem.base().id;
			refreshTalentTooltipIframe(controller);
		}
	}
}
function refreshTalentTooltipIframe(controller){
	if (typeof controller.recentItem != 'undefined') {
		if ($("#selVersion").val() == "0") {
			var Url = "/custom_talent.php";
			var talent = {
				current: controller.recentItem.base(),
				locale: controller.locale,
				prefix: controller.activeClassPrefix
			};
			if (controller.recentItem.reqs.length > 0) {
				talent.required = controller.recentItem.reqs[0].base();
			}
			$.post(Url, talent, function(data, textStatus, jqXHR) {
				$("#talent-tooltip").html(data);
			}, 'text');
		} else {
			var Url = "/talent.php?id=" + controller.recentItem.base().id
				+ "&locale=" + getLocale()
				+ "&prefix=" + controller.activeClassPrefix
				+ "&iframe=true&version=" + $("#selVersion").val();
			$.get(Url, function(data) {
				$("#talent-tooltip").html(data);
			});
		}
	}
}
$("#link-to-build").click(function(){
	window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());
});
function talentUriHandler(key, value, target) {
	talent = decodeURIComponent(value);
	var match = /(\d*)(\d)(as|sc|ju|su)_(\w*)/.exec(value);
	if (match != null) {
		initialTalentData = {
			gameVersion : match[1],
			dataVersion : match[2],
			classPrefix : match[3],
			talentInput : match[4]
		};
		var tabIndex = $('#tabs a[href="#tabs-'+ initialTalentData.classPrefix + '"]').parent().index();
		$("#tabs").tabs("option", "active", tabIndex);
		$("#selVersion").val(initialTalentData.gameVersion);
		talentController.orderToDisplay(initialTalentData.classPrefix, initialTalentData.gameVersion, initialTalentData.talentInput);
	} else {
		talentController.orderToDisplay("as", 102);
	}
}
var initialLink = new ApplicationLink(location.search);
var uriHandlers = {
	"t": {fn: talentUriHandler },
	/*legacy links handler: */
	"talent": { fn: talentUriHandler }
};
if (initialLink.linkString.length != 0) {
	// заходим по ссылке с данными о талантах "?t=981sc=2"
	// заходим по ссылке с данными о талантах "?talent=981sc=2" - старый формат
	initialLink.parts.forEach(function(item){
		if (typeof uriHandlers[item.key] != 'undefined') {
			uriHandlers[item.key].fn(
				item.key,
				item.value,
				uriHandlers[item.key].target
			);
		}
	});
} else {
	// заходим по ссылке без указания патча ""
	talentController.orderToDisplay("as", 102);
}
$("#lblVersion").on("change","#special-talent-data", function(data) {
	var specialTalentData = document.getElementById("special-talent-data").files[0];
	if (specialTalentData) {
		var reader = new FileReader();
		reader.readAsText(specialTalentData, "UTF-8");
		reader.onload = function(e) {
			var version = 0;
			talentController.layouts[version] = {};
			talentController.layouts[version].atlases = {};
			var loadedImages = 0;
			var numImages = 2;
			var sources = {
				atlasActive: "images/SkillsDefault.png",
				atlasInactive: "images/inactiveSkillsDefault.png"
			};
			for(var src in sources) {
				talentController.layouts[version].atlases[src] = new Image();
				talentController.layouts[version].atlases[src].onload = function() {
					if(++loadedImages >= numImages) {
						$("#selVersion").append($("<option></option>").attr("value", 0).text("custom"));
						notifyControllerDataLoad(0, JSON.parse(e.target.result));
						talentController.orderToDisplay(talentController.currentPrefix, 0);
						$("#selVersion").val(0);
					}
				};
				talentController.layouts[version].atlases[src].src = sources[src];
			}
			
		}
	}
});
$("#selVersion").change(function(){
	// переключаем версию
	var version = $("#selVersion").val();
	var prefix = talentController.currentPrefix;
	talentController.orderToDisplay(prefix, version);
});
$("#as-link").click(function(){
	// переключаем класс
	var version = $("#selVersion").val();
	document.title = localizationData["t-assault"][getLocale()];
	talentController.orderToDisplay("as", version);
});
$("#ju-link").click(function(){
	// переключаем класс
	var version = $("#selVersion").val();
	document.title = localizationData["t-juggernaut"][getLocale()];
	talentController.orderToDisplay("ju", version);
});
$("#sc-link").click(function(){
	// переключаем класс
	var version = $("#selVersion").val();
	document.title = localizationData["t-scout"][getLocale()];
	talentController.orderToDisplay("sc", version);
});
$("#su-link").click(function(){
	// переключаем класс
	var version = $("#selVersion").val();
	document.title = localizationData["t-support"][getLocale()];
	talentController.orderToDisplay("su", version);
});
$("#calculator-layout").click(function(e) {
	talentController.dispatchClick(e.offsetX, e.offsetY);
});
$("#calculator-layout").mousemove(function(e) {
	var offset = $(this).offset();
	talentController.dispatchMouseMove(e.pageX - offset.left, e.pageY - offset.top);
});