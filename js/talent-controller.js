var images;
var talentApplication = new TalentView();
var initialTalentData = {};

function switchVersionClass(prefix, version) {
	if (prefix != talentApplication.activeClass.prefix) {
		// Изменился выбранный класс
		// нужно выставить активный класс
		var element = document.getElementById("calculator-" + prefix + "-layout");
		var ctx = element.getContext('2d');
		talentApplication.setActiveClass(ctx, prefix);
		switchToClassLayout(prefix, talentApplication.activeClass.calculator);
	}
	if (talentApplication.patchdata.game_version != version) {
		// Когда изменилась версия
		// загрузить новые картинки и данные по талантам
		var sources = {
			atlasActive: "images/Skills" + version + ".png",
			atlasInactive: "images/inactiveSkills" + version + ".png"
		};
		loadImages(sources, function(imgs) {
			talentApplication.handleImages(imgs.atlasActive, imgs.atlasInactive);
			images = imgs;
			$.get("/talent_data.php?version=" + version, processTalentData);
		});
	}
};
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
		switchVersionClass("as", 101);
	}
}
var initialLink = new TalentLink(location.search);
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
	switchVersionClass("as", 101);
}

function toggleTalentTooltip() {
	var display = $("#talent-visibility-checkbox").is(":checked");
	$("#talent-tooltip").toggle(!display);
}
toggleTalentTooltip();
function updateTooltip(controller, prefix) {
	if (typeof controller.recentItem != 'undefined') {
		if (controller.recentItem.base().id != recentId) {
			recentId = controller.recentItem.base().id;
			$("#talent-iframe").attr("src", "/talent.php?id=" + controller.recentItem.base().id +
				"&prefix=" + prefix +
				"&iframe=true&version=" + $("#selVersion").val());
		}
	}
}
function processTalentData(data) {
	talentApplication.init(data);
	switchToClassLayout(talentApplication.activeClass.prefix, talentApplication.activeClass.calculator);
	if (initialTalentData.gameVersion == talentApplication.patchdata.game_version &&
		initialTalentData.classPrefix == talentApplication.activeClass.prefix) {
		talentApplication.classes[initialTalentData.classPrefix].learnTalentsFromString(initialTalentData.talentInput);
		talentApplication.drawTalents();
		update_link();
	}
	talentApplication.displayLayout();
}
function switchToClassLayout(prefix, calculator) {
	$("#calculator-" + prefix + "-layout").prop("width", calculator.totalWidth);
	$("#calculator-" + prefix + "-layout").prop("height", calculator.totalHeight);
	$("#merc-level").html(calculator.getRequiredLevel());
	$("#points-left").html(calculator.getAvailableTalentPoints());
	talentApplication.displayLayout();
}
$.each(talentApplication.classes, function(prefix, calculator) {
	$("#calculator-" + prefix + "-layout").click(function(e) {
		talentApplication.handleClick(e.offsetX, e.offsetY);
		update_link();
		$("#merc-level").html(calculator.getRequiredLevel());
		$("#points-left").html(calculator.getAvailableTalentPoints());
		updateTooltip(talentApplication, prefix);
	});
	$("#calculator-" + prefix + "-layout").mousemove(function(e) {
		var offset = $(this).offset();
		talentApplication.handleMouseMove(e.pageX - offset.left, e.pageY - offset.top);
		if (!$("#talent-visibility-checkbox").is(":checked")) {
			updateTooltip(talentApplication, prefix);
		}
	});
	$("#" + prefix + "-link").click(function(){
		var version = $("#selVersion").val();
		switchVersionClass(prefix, version);
	});
});
$("#link-to-build").click(function(){
	window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());
});
$("#selVersion").change(function(){
	var version = $("#selVersion").val();
	var prefix = talentApplication.activeClass.prefix;
	switchVersionClass(prefix, version);
});
$("#selLang").change(function() {
	var locale = $("#selLang").val();
	if (typeof(localStorage) !== "undefined") {
		localStorage.setItem("lstc.wc.lt/locale", $("#selLang").val());
	}
	if (inventoryApp != "undefined") {
		inventoryApp.applyLocale(locale);
		applyLocaleToInventory(locale);
	}
});
