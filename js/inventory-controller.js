var inventoryApp = new InventoryModel(getLocale());

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
			return;
		}
	}
	inventoryApp.equipItem(item, slots[slots.length - 1], fallback);
}
$(document).ready(function(){
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
	orderToDisplayInventory();
});
function orderToDisplayInventory() {
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
	}).fail(function() {
		inventoryApp.clearPool();
	});
}