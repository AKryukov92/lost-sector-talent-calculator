var inventoryApp = new InventoryModel($("#selLang").val());
var localizationData = [
	{ id:"armor-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"primary-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"secondary-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"hat-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"consumable_1-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"consumable_2-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"consumable_3-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"consumable_4-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"consumable_5-reset", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"hat-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"consumable_1-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"consumable_2-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"consumable_3-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"consumable_4-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"consumable_5-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"hat-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"tab-name-armor", text:{ "ru":"Броня", "en":"Armor" } },
	{ id:"tab-name-melee", text:{ "ru":"Ближний бой", "en":"Melee" } },
	{ id:"tab-name-pistol", text:{ "ru":"Пистолеты", "en":"Pistols" } },
	{ id:"tab-name-smg", text:{ "ru":"ПП", "en":"SMG" } },
	{ id:"tab-name-shotgun", text:{ "ru":"Дробовики", "en":"Shotguns" } },
	{ id:"tab-name-assault-rifle", text:{ "ru":"Автоматы", "en":"Assault rifles" } },
	{ id:"tab-name-sniper-rifle", text:{ "ru":"Снайперское", "en":"Sniper rifles" } },
	{ id:"tab-name-machinegun", text:{ "ru":"Пулеметы", "en":"Machinegun" } },
	{ id:"tab-name-launcher", text:{ "ru":"Взрывное", "en":"Launchers" } },
	{ id:"tab-name-shield", text:{ "ru":"Щиты", "en":"Shields" } },
	{ id:"tab-name-hat", text:{ "ru":"Шапки", "en":"Hats" } },
	{ id:"tab-name-consumable", text:{ "ru":"Активки", "en":"Consumables" } }
];

function applyLocaleToInventory(locale) {
	for (item of localizationData){
		var id = item.id;
		$("#" + id).html(item.text[locale]);
	}
}

function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.setGrade(slot_name, ui.value);	
	if (typeof update_link != 'undefined') {
		update_link();
	}
}

function quality_change_handler(slot_name) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.updateSlotTooltip(slot_name);
	if (typeof update_link != 'undefined') {
		update_link();
	}
}

function reset_slot(slot_name) {
	inventoryApp.resetInventorySlot(slot_name);
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
function autoEquipItem(itemId) {
	var item = inventoryApp.getItemById(itemId);
	var slots = inventoryApp.weapontype_map[item.category].slots;
	for (var i = 0; i < slots.length; i++) {
		if (isEmpty(inventoryApp.slots[slots[i]].item)) {
			inventoryApp.equipItem(item, slots[i]);
			return;
		}
	}
	inventoryApp.equipItem(item, slots[slots.length - 1]);
}
$(document).ready(function(){
	document.oncontextmenu = function() {return false;};
	applyLocaleToInventory(inventoryApp.locale);
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
	$.get("/item_data.php", function(data) {
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
				}
			});
		}
		if (typeof initialLink != 'undefined') {
			if (typeof initialLink.parts != 'undefined') {
				initialLink.parts.forEach(function(item){
					if (typeof inventoryApp.UriHandlers[item.key] != 'undefined') {
						inventoryApp.UriHandlers[item.key].fn(item.key, item.value, inventoryApp.UriHandlers[item.key].target)
					}
				});
			}
		}
	});
});