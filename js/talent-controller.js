var images;
var initialLink = new TalentLink(location.search);
var talentApplication = new TalentView();

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
function talentUriHandler(key, value, target) {
	talent = decodeURIComponent(value);
	var match = /(\d*)(\d)(as|sc|ju|su)_(\w*)/.exec(value);
	var game_version = match[1];
	var data_version = match[2];
	var class_prefix = match[3];
	var talent_input = match[4];
	var index = $('#tabs a[href="#tabs-'+ class_prefix + '"]').parent().index();
	$("#tabs").tabs("option", "active", index);
	var element = document.getElementById("calculator-" + class_prefix + "-layout");
	var ctx = element.getContext('2d');
	talentApplication.setActiveClass(ctx, class_prefix);
	if (data_version == talentApplication.patchdata.data_version &&
		game_version == talentApplication.patchdata.game_version) {
		talentApplication.classes[class_prefix].learnTalentsFromString(talent_input);
		talentApplication.drawTalents();
		$("#merc-level").html(talentApplication.classes[class_prefix].getRequiredLevel());
		$("#points-left").html(talentApplication.classes[class_prefix].getAvailableTalentPoints());
	}
}
function processTalentData(data) {
	talentApplication.init(data);
	if (typeof initialLink.linkString != 'undefined') {
		if (initialLink.linkString.length != 0) {
			initialLink.parts.forEach(function(item){
				if (typeof talentApplication.UriHandlers[item.key] != 'undefined') {
					talentApplication.UriHandlers[item.key].fn(item.key, item.value, talentApplication.UriHandlers[item.key].target)
				}
			});
		}
	}
	$("#selVersion").val(talentApplication.patchdata.game_version);
	switchToClassLayout(talentApplication.activeClass.prefix, talentApplication.activeClass.calculator);
}
function switchToClassLayout(index, calculator) {
	$("#calculator-" + index + "-layout").prop("width", calculator.totalWidth);
	$("#calculator-" + index + "-layout").prop("height", calculator.totalHeight);
	var element = document.getElementById("calculator-" + index + "-layout");
	var ctx = element.getContext('2d');
	talentApplication.setActiveClass(ctx, index);
	update_link();
	$("#merc-level").html(calculator.getRequiredLevel());
	$("#points-left").html(calculator.getAvailableTalentPoints());
	talentApplication.displayLayout();
}
$.each(talentApplication.classes, function(index, calculator) {
	$("#calculator-" + index + "-layout").click(function(e) {
		talentApplication.handleClick(e.offsetX, e.offsetY);
		update_link();
		$("#merc-level").html(calculator.getRequiredLevel());
		$("#points-left").html(calculator.getAvailableTalentPoints());
		updateTooltip(talentApplication, index);
	});
	$("#calculator-" + index + "-layout").mousemove(function(e) {
		var offset = $(this).offset();
		talentApplication.handleMouseMove(e.pageX - offset.left, e.pageY - offset.top);
		if (!$("#talent-visibility-checkbox").is(":checked")) {
			updateTooltip(talentApplication, index);
		}
	});
	$("#" + index + "-link").click(function(){
		if (talentApplication.activeClass != index) {
			switchToClassLayout(index, calculator);
		}
	});
});
var sources = {
	atlasActive: "images/Skills101.png",
	atlasInactive: "images/inactiveSkills101.png"
};
$("#link-to-build").click(function(){
	window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());
});
loadImages(sources, function(imgs) {
	talentApplication.handleImages(imgs.atlasActive, imgs.atlasInactive);
	images = imgs;
	$.get("/talent_data.php?version=" + initialLink.getGameVersion(), processTalentData);
});
$("#selVersion").change(function(){
	initialLink = {};
	var version = $("#selVersion").val();
	var sources = {
		atlasActive: "images/Skills" + version + ".png",
		atlasInactive: "images/inactiveSkills" + version + ".png"
	};
	loadImages(sources, function(imgs) {
		talentApplication.handleImages(imgs.atlasActive, imgs.atlasInactive);
		images = imgs;
		$.get("/talent_data.php?version=" + version, processTalentData);
	});
});
