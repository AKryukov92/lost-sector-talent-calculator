var images;
var initialLink = new TalentLink(location.search);
var talentApplication;
var sources = {
	atlasActive: "Skills.png",
	atlasInactive: "inactiveSkills.png"
};
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
	if (initialLink.linkString.length != 0) {
		initialLink.parts.forEach(function(item){
			talentApplication.UriHandlers[item.key].fn(item.key, item.value, talentApplication.UriHandlers[item.key].target)
		});
	}
	$("#selVersion").val(talentApplication.patchdata.game_version);
	$.each(talentApplication.classes, function(index, value) {
		$("#calculator-" + index + "-layout").click(function(e) {
			talentApplication.handleClick(e.offsetX, e.offsetY);
			update_link();
			$("#merc-level").html(value.getRequiredLevel());
			$("#points-left").html(value.getAvailableTalentPoints());
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
			$("#calculator-" + index + "-layout").prop("width", value.totalWidth);
			$("#calculator-" + index + "-layout").prop("height", value.totalHeight);
			var element = document.getElementById("calculator-" + index + "-layout");
			var ctx = element.getContext('2d');
			talentApplication.setActiveClass(ctx, index);
			update_link();
			$("#merc-level").html(value.getRequiredLevel());
			$("#points-left").html(value.getAvailableTalentPoints());
			talentApplication.displayLayout();
		});
	});
	$("#as-link").trigger("click");
}
loadImages(sources, function(imgs) {
	talentApplication = new TalentView(imgs.atlasActive, imgs.atlasInactive);
	$("#link-to-build").click(function(){window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());});
	images = imgs;
	$.get("/talent_data.php?version=" + initialLink.getGameVersion(),processTalentData);
});
$("#selVersion").change(function(){
	$.get("/talent_data.php?version=" + $("#selVersion").val(), processTalentData);
});

