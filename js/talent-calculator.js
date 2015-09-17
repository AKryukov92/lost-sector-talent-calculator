var sources = {
	atlasActive: "Skills.png",
	atlasInactive: "inactiveSkills.png"
};

function updateTooltip(controller, prefix) {
	if (typeof controller.recentItem != 'undefined') {
		if (controller.recentItem.base().id != recentId) {
			recentId = controller.recentItem.base().id;
			// if ($("#talent-iframe").length != 0) {
				// $("#talent-iframe")[0].contentWindow.location.reload();
				// $("#talent-iframe").remove();
			// }
			$("#talent-iframe").attr("src", "/talent.php?id=" + controller.recentItem.base().id + "&prefix=" + prefix + "&iframe=true");
			console.log($("#talent-iframe").length);
		}
	}
}

function talentUriHandler(key, value, target) {
	talent = decodeURIComponent(value);
	var game_version = talent.split("_")[0];
	var talent_input = talent.split("_")[1];
	var class_prefix = game_version.substr(game_version.length - 2, 2);
	update_link();
	var index = $('#tabs a[href="#tabs-'+ class_prefix + '"]').parent().index();
	$("#tabs").tabs("option", "active", index);
	var data_version = game_version.substr(game_version.length - 3, 1);
	if (data_version == patchdata.data_version) {
		app.classes[class_prefix].calculator.learnTalentsFromString(talent_input);
		app.classes[class_prefix].controller.drawTalents();
		$("#merc-level").html(app.classes[class_prefix].calculator.getRequiredLevel());
		$("#points-left").html(app.classes[class_prefix].calculator.getAvailableTalentPoints());
	}
}

function tunableItemUriHandler(key, value, target) {
	itemstring = decodeURIComponent(tmp[1]);
	var item = get_item_by_id(itemstring.split("_")[0]);
	player_model.slots[target].color = itemstring.split("_")[1];
	player_model.slots[target].quality = itemstring.split("_")[2];
	$("#" + target + "-slider").slider("value", player_model.slots[target].quality);
	$("#" + target + "-quality-" + player_model.slots[target].color).prop('checked', true);
	equip_item(item, target);
}

function specialItemUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	var item = get_item_by_id(itemstring.split("_")[0]);
	equip_item(item, target);
}

loadImages(sources, function(images) {
	$("#link-to-build").click(function(){window.prompt("Для копирования нажмите: Ctrl+C, Enter", $("#link-to-build").val());});
	app = {
		classes: {
			"as": {
				calculator: new Calculator(patchdata.assault_data)
			},
			"ju": {
				calculator: new Calculator(patchdata.juggernaut_data)
			},
			"sc": {
				calculator: new Calculator(patchdata.scout_data)
			},
			"su": {
				calculator: new Calculator(patchdata.support_data)
			}
		},
		UriHandlers: {
			"t": {fn: talentUriHandler },
			"p": {fn: tunableItemUriHandler, target: "primary" },
			"s": { fn: tunableItemUriHandler, target: "secondary" },
			"a": { fn: tunableItemUriHandler, target: "armor" },
			"h": { fn: specialItemUriHandler, target: "hat" },
			"c1": { fn: specialItemUriHandler, target: "consumable_1" },
			"c2": { fn: specialItemUriHandler, target: "consumable_2" },
			"c3": { fn: specialItemUriHandler, target: "consumable_3" },
			"c4": { fn: specialItemUriHandler, target: "consumable_4" },
			"c5": { fn: specialItemUriHandler, target: "consumable_5" },
			/*legacy links handlers: */
			"talent": { fn: talentUriHandler },
			"primary": { fn: tunableItemUriHandler, target: "primary" },
			"secondary": { fn: tunableItemUriHandler, target: "secondary" },
			"armor": { fn: tunableItemUriHandler, target: "armor" },
			"hat": { fn: specialItemUriHandler, target: "hat" },
			"consumable1": { fn: specialItemUriHandler, target: "consumable_1" },
			"consumable2": { fn: specialItemUriHandler, target: "consumable_2" },
			"consumable3": { fn: specialItemUriHandler, target: "consumable_3" },
			"consumable4": { fn: specialItemUriHandler, target: "consumable_4" },
			"consumable5": { fn: specialItemUriHandler, target: "consumable_5" }
		},
		processData: function(UriItem) {
			tmp = UriItem.split("=");
			var key = tmp[0];
			var value = tmp[1];
			app.UriHandlers[key].fn(key, value, app.UriHandlers[key].target);
		}
	};
	app.activeClass = app.classes["as"];
	$.each(app.classes, function(index, value) {
		value.calculator.calculateWidth();
		value.calculator.assignPowerToTalents();
		value.calculator.fillHeightMap();
		value.calculator.mapRefsReqs();
		value.calculator.mapRanks();
		value.calculator.arrangeRows(5,3,35,50);
		$("#calculator-" + index + "-layout").prop("width", value.calculator.totalWidth);
		$("#calculator-" + index + "-layout").prop("height", value.calculator.totalHeight);
		
		var element = document.getElementById("calculator-" + index + "-layout");
		var ctx = element.getContext('2d');
		value.controller = new Controller(value.calculator, ctx, images.atlasActive, images.atlasInactive);
		
		value.controller.drawBackground();
		value.controller.markRows();
		value.controller.drawReqToRefLinks();
		value.controller.drawTalents();
		
		$("#calculator-" + index + "-layout").click(function(e) {
			value.controller.handleClick(e.offsetX, e.offsetY);
			update_link();
			$("#merc-level").html(value.calculator.getRequiredLevel());
			$("#points-left").html(value.calculator.getAvailableTalentPoints());
			updateTooltip(value.controller, index);
		});
		$("#calculator-" + index + "-layout").mousemove(function(e) {
			var offset = $(this).offset();
			value.controller.handleMouseMove(e.pageX - offset.left, e.pageY - offset.top);
			updateTooltip(value.controller, index);
		});
		$("#" + index + "-link").click(function(){
			app.activeClass = app.classes[index];
			update_link();
			$("#merc-level").html(value.calculator.getRequiredLevel());
			$("#points-left").html(value.calculator.getAvailableTalentPoints());
		});
	});
	location.search.replace("?", "").split("&").forEach(app.processData);
});