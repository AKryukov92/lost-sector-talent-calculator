﻿function TalentController() {
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
			atlasActive: "images/Skills" + talentsVersionFallback(version) + ".png",
			atlasInactive: "images/inactiveSkills" + talentsVersionFallback(version) + ".png"
		};
		for(var src in sources) {
			this.layouts[version].atlases[src] = new Image();
			this.layouts[version].atlases[src].onload = function() {
				if(++loadedImages >= numImages) {
					notifyTalentsImageLoad(version);
				}
			};
			this.layouts[version].atlases[src].src = sources[src];
		}
	};
	this.getTalentData = function(version) {
		$.get("/talent_data.php?version=" + version, function(data) {
			notifyTalentsDataLoad(version, data);
		});
	};
	this.activateView = function(talentApplication) {
		$("#calculator-layout").attr("width", talentApplication.getTotalWidth());
		$("#calculator-layout").attr("height", talentApplication.getTotalHeight());
		if (typeof this.talentInput != "undefined") {
			talentApplication.getCalculator().learnTalentsFromString(this.talentInput);
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
function notifyTalentsImageLoad(version) {
	talentController.getTalentData(version);
}
function getContext(prefix) {
	var element = document.getElementById("calculator-layout");
	return element.getContext('2d');
}
function notifyTalentsDataLoad(version, data) {
	var images = talentController.layouts[version].atlases;
	var locale = getLocale();
	if ($(window).width() > 624) {
		talentController.layouts[version].classViews = {
			"as": new ClassTalentView(locale, data.as, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
			"ju": new ClassTalentView(locale, data.ju, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
			"sc": new ClassTalentView(locale, data.sc, images.atlasActive, images.atlasInactive, new Calculator(), getContext),
			"su": new ClassTalentView(locale, data.su, images.atlasActive, images.atlasInactive, new Calculator(), getContext)
		};
	} else {
		var widgetWidth = $(".talents-background").width();
		talentController.layouts[version].classViews = {
			"as": new CompactClassTalentView(locale, data.as, images.atlasActive, images.atlasInactive, new Calculator(), getContext, widgetWidth),
			"ju": new CompactClassTalentView(locale, data.ju, images.atlasActive, images.atlasInactive, new Calculator(), getContext, widgetWidth),
			"sc": new CompactClassTalentView(locale, data.sc, images.atlasActive, images.atlasInactive, new Calculator(), getContext, widgetWidth),
			"su": new CompactClassTalentView(locale, data.su, images.atlasActive, images.atlasInactive, new Calculator(), getContext, widgetWidth)
		};
	}
	talentController.activateView(talentController.getView());
}
function toggleTalentTooltip() {
	var display = $("#talent-visibility-checkbox").is(":checked");
	$("#talent-tooltip").toggle(!display);
}
function updateTalentTooltip(view) {
	if (view.getRecent() != null) {
		if (view.getRecent().base().id != recentId) {
			recentId = view.getRecent().base().id;
			refreshTalentTooltipIframe(view);
		}
	}
}
function refreshTalentTooltipIframe(view){
	if (typeof view.getRecent() != null) {
		if ($("#selVersion").val() == "0") {
			var Url = "/custom_talent.php";
			var talent = {
				current: view.getRecent().base(),
				locale: getLocale(),
				prefix: view.getCalculator().prefix
			};
			if (view.getRecent().reqs.length > 0) {
				talent.required = view.getRecent().reqs[0].base();
			}
			$.post(Url, talent, function(data, textStatus, jqXHR) {
				$("#talent-tooltip").html(data);
			}, 'text');
		} else {
			var Url = "/talent.php?id=" + view.getRecent().base().id
				+ "&locale=" + getLocale()
				+ "&prefix=" + view.getCalculator().prefix
				+ "&iframe=true&version=" + $("#selVersion").val();
			$.get(Url, function(data) {
				$("#talent-tooltip").html(data);
			});
		}
	}
}
function loadSpecialTalentData(data){
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
						notifyTalentsDataLoad(0, JSON.parse(e.target.result));
						talentController.orderToDisplay(talentController.currentPrefix, 0);
						$("#selVersion").val(0);
					}
				};
				talentController.layouts[version].atlases[src].src = sources[src];
			}
		}
	}
}
function update_link() {
	var talentApplication = talentController.getView();
	var link = "/?t=" +
		talentController.getGameVersion() +
		1 +
		talentApplication.getCalculator().prefix + "_" +
		talentApplication.getCalculator().getTalentString();
	var subscription = "[img=\"" + location.origin + "/sub/" +
		talentController.getGameVersion() +
		1 +
		talentApplication.getCalculator().prefix + "_" +
		talentApplication.getCalculator().getTalentString()
		+ ".png\"][/img]";
	$("#subscription-template").val(subscription);
	var slot = inventoryApp.slots["primary"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&p=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
	}
	slot = inventoryApp.slots["secondary"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&s=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
	}
	slot = inventoryApp.slots["armor"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&a=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
	}
	slot = inventoryApp.slots["hat"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&h=" + slot.item.id;
	}
	slot = inventoryApp.slots["consumable_1"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&c1=" + slot.item.id;
	}
	slot = inventoryApp.slots["consumable_2"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&c2=" + slot.item.id;
	}
	slot = inventoryApp.slots["consumable_3"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&c3=" + slot.item.id;
	}
	slot = inventoryApp.slots["consumable_4"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&c4=" + slot.item.id;
	}
	slot = inventoryApp.slots["consumable_5"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&c5=" + slot.item.id;
	}
	slot = inventoryApp.slots["head_mod"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&hem=" + slot.item.id;
	}
	slot = inventoryApp.slots["chest_mod"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&cm=" + slot.item.id;
	}
	slot = inventoryApp.slots["hand_mod"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&ham=" + slot.item.id;
	}
	slot = inventoryApp.slots["feet_mod"];
	if (!$.isEmptyObject(slot.item)) {
		link += "&fm=" + slot.item.id;
	}
	$("#link-to-build").val(location.origin + "/combinator.php" + link);
}
function orderToDisplayInventory(handleUri) {
	inventoryApp.clearPool();
	inventoryApp.clearEquipped();
	$.get("/item_data.php?version=" + inventoryApp.version, function(data) {
		inventoryApp.fillAvailableItems(data);
		for (slot in inventoryApp.possible_slots) {
			$("#" + slot + "-container").droppable({
				accept:inventoryApp.possible_slots[slot],
				activeClass: "ui-state-hover",
				hoverClass: "ui-state-active",
				drop:function(event, ui) {
					var item_id = ui.draggable.context.id.split("_")[1];
					var item = inventoryApp.getItemById(item_id);
					var slot_name = $(this).context.id.split("-")[0];
					inventoryApp.equipItem(item, slot_name);
					update_link();
				}
			});
		}
		if (handleUri){
			initialLink.handleParts(uriHandlers);
		}
	}).fail(function() {
		inventoryApp.clearPool();
	});
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
		talentController.orderToDisplay(initialTalentData.classPrefix, initialTalentData.gameVersion, initialTalentData.talentInput);
	} else {
		talentController.orderToDisplay("as", 103);
	}
}

function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.setGrade(slot_name, ui.value);
	update_link();
}

function quality_change_handler(slot_name) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.updateSlotTooltip(slot_name);
	update_link();
}

function reset_slot(slot_name) {
	inventoryApp.resetInventorySlot(slot_name);
	update_link();
}
function versionUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	inventoryApp.version = 0+itemstring;
}
function tunableItemUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	var item = inventoryApp.getItemById(itemstring.split("_")[0]);
	inventoryApp.slots[target].color = itemstring.split("_")[1];
	inventoryApp.slots[target].quality = itemstring.split("_")[2];
	$("#" + target + "-slider").slider("value", inventoryApp.slots[target].quality);
	$("#" + target + "-quality-" + inventoryApp.slots[target].color).prop('checked', true);
	inventoryApp.equipItem(item, target);
}
function specialItemUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	var item = inventoryApp.getItemById(itemstring.split("_")[0]);
	inventoryApp.equipItem(item, target);
}
function autoEquipItem(itemId, fallback) {
	var item = inventoryApp.getItemById(itemId);
	var slots = inventoryApp.weapontype_map[item.category].slots;
	for (var i = 0; i < slots.length; i++) {
		if (isEmpty(inventoryApp.slots[slots[i]].item)) {
			inventoryApp.equipItem(item, slots[i], fallback);
			update_link();
			return;
		}
	}
	inventoryApp.equipItem(item, slots[slots.length - 1], fallback);
	update_link();
}

var clipboard = new Clipboard('[data-clipboard-target]');
var inventoryApp = new InventoryModel(getLocale());
var talentController = new TalentController();
toggleTalentTooltip();
var uriHandlers = {
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
	"hem": { fn: specialItemUriHandler, target: "head_mod" },
	"ham": { fn: specialItemUriHandler, target: "hand_mod" },
	"fm": { fn: specialItemUriHandler, target: "feet_mod" },
	"cm": { fn: specialItemUriHandler, target: "chest_mod" },
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
};
var initialLink = new ApplicationLink(location.search);
if (initialLink.linkString.length == 0) {
	// заходим по ссылке без данных
	talentController.orderToDisplay("as", 105);
}
$(document).ready(function(){
	$("#link-to-build").click(function(){
		window.prompt("ƒл¤ копировани¤ нажмите: Ctrl+C, Enter", $("#link-to-build").val());
	});
	$("#subscription-template").click(function(){
		window.prompt("ƒл¤ копировани¤ нажмите: Ctrl+C, Enter", $("#subscription-template").val());
	});
	$("#lblVersion").on("change","#special-talent-data", loadSpecialTalentData);
	$("#selVersion").change(function(){
		// переключаем версию
		var version = $("#selVersion").val();
		var prefix = talentController.currentPrefix;
		talentController.orderToDisplay(prefix, version);
		inventoryApp.version = version;
		orderToDisplayInventory(false);
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
    $( "#armor-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		quality_change_handler("armor");
      },
	  slide: function( event, ui ) {
		slider_slide_handler("armor", event, ui);
	  }
    });
	$( "#armor-value" ).html( "" );
	$("[name=\"armor-quality\"]").change(
		function(){
			quality_change_handler("armor");
		}
	);
	$("#armor-container").tooltip({
		show:{delay:200},
		content:""
	});
	
    $( "#primary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		  quality_change_handler("primary");
      },
	  slide: function(event, ui) {
		slider_slide_handler("primary", event, ui);
	  }
    });
    $( "#primary-value" ).html( "" );
	$("[name=\"primary-quality\"]").change(
		function(){
			quality_change_handler("primary");
		}
	);
	$("#primary-container").tooltip({
		show:{delay:200},
		content:""
	});
	
    $( "#secondary-slider" ).slider({
      value:0,
      min: 0,
      max: 15,
      step: 1,
      change: function( event, ui ) {
		  quality_change_handler("secondary");
      },
	  slide: function(event, ui) {
		slider_slide_handler("secondary", event, ui);
	  }
    });
    $( "#secondary-value" ).html( "" );
	$("[name=\"secondary-quality\"]").change(
		function(){
			quality_change_handler("secondary");
		}
	);
	$("#secondary-container").tooltip({
		show:{delay:200},
		content:""
	});
	
	$("#hat-container").tooltip({content:""});
	$("#consumable_1-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_2-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_3-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_4-container").tooltip({
		show:{delay:200},
		content:""
	});
	$("#consumable_5-container").tooltip({
		show:{delay:200},
		content:""
	});
	orderToDisplayInventory(true);
});