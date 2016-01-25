var images;
var talentApplication;
var initialTalentData = {};

function switchVersionClass(prefix, version) {
	if (typeof talentApplication == "undefined") {
		startRefresh(prefix, version);
		return;
	}
	if (prefix != talentApplication.activeClassPrefix) {
		talentApplication.activeClassPrefix = prefix
		switchToClassLayout(talentApplication.getActiveClass());
	}
	if (talentApplication.patchdata.game_version != version) {
		startRefresh(prefix, version);
	}
};
function startRefresh(prefix, version) {
	// Когда изменилась версия
	// загрузить новые картинки и данные по талантам
	var sources = {
		atlasActive: "images/Skills" + version + ".png",
		atlasInactive: "images/inactiveSkills" + version + ".png"
	};
	loadImages(sources, function(imgs) {
		images = imgs;
		$.get("/talent_data.php?version=" + version, processTalentData);
	});
}
function getContext(prefix) {
	var element = document.getElementById("calculator-" + prefix + "-layout");
	return element.getContext('2d');
}
function processTalentData(data) {
	talentApplication = new TalentView(getLocale(), data, images.atlasActive, images.atlasInactive, getContext);
	$.each(talentApplication.classes, function(prefix, playerClass) {
		$("#calculator-" + prefix + "-layout").attr("width", talentApplication.classes[prefix].totalWidth);
		$("#calculator-" + prefix + "-layout").attr("height", talentApplication.classes[prefix].totalHeight);
		$("#calculator-" + prefix + "-layout").click(function(e) {
			talentApplication.handleClick(e.offsetX, e.offsetY);
			update_link();
			$("#merc-level").html(playerClass.calculator.getRequiredLevel());
			$("#points-left").html(playerClass.calculator.getAvailableTalentPoints());
			updateTalentTooltip(talentApplication);
		});
		$("#calculator-" + prefix + "-layout").mousemove(function(e) {
			var offset = $(this).offset();
			talentApplication.handleMouseMove(e.pageX - offset.left, e.pageY - offset.top);
			if (!$("#talent-visibility-checkbox").is(":checked")) {
				updateTalentTooltip(talentApplication);
			}
		});
		$("#" + prefix + "-link").click(function(){
			var version = $("#selVersion").val();
			switchVersionClass(prefix, version);
		});
	});
	switchToClassLayout(talentApplication.getActiveClass());
	if (initialTalentData.gameVersion == talentApplication.patchdata.game_version &&
		initialTalentData.classPrefix == talentApplication.activeClass.prefix) {
		talentApplication.classes[initialTalentData.classPrefix].learnTalentsFromString(initialTalentData.talentInput);
		talentApplication.drawTalents();
		update_link();
	}
	talentApplication.displayLayout();
}
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
		switchVersionClass(initialTalentData.classPrefix, initialTalentData.gameVersion);
	} else {
		switchVersionClass("as", 102);
	}
}
var initialLink = new ApplicationLink(location.search);
if (initialLink.linkString.length != 0) {
	// заходим по ссылке с данными о талантах "?t=981sc=2"
	// заходим по ссылке с данными о талантах "?talent=981sc=2" - старый формат
	initialLink.parts.forEach(function(item){
		if (typeof talentApplication.UriHandlers[item.key] != 'undefined') {
			talentApplication.UriHandlers[item.key].fn(
				item.key,
				item.value,
				talentApplication.UriHandlers[item.key].target);
		}
	});
} else {
	// заходим по ссылке без указания патча ""
	switchVersionClass("as", 102);
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
		var Url = "/talent.php?id=" + controller.recentItem.base().id
			+ "&locale=" + getLocale()
			+ "&prefix=" + controller.activeClassPrefix
			+ "&iframe=true&version=" + $("#selVersion").val();
		$.get(Url, function(data) {
			$("#talent-tooltip").html(data);
		});
	}
}
function switchToClassLayout(cls) {
	$("#calculator-" + cls.prefix + "-layout").prop("width", cls.calculator.totalWidth);
	$("#calculator-" + cls.prefix + "-layout").prop("height", cls.calculator.totalHeight);
	$("#merc-level").html(cls.calculator.getRequiredLevel());
	$("#points-left").html(cls.calculator.getAvailableTalentPoints());
	talentApplication.displayLayout();
}
$("#link-to-build").click(function(){
	window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());
});
$("#selVersion").change(function(){
	var version = $("#selVersion").val();
	var prefix = talentApplication.activeClassPrefix;
	switchVersionClass(prefix, version);
});
