function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.setGrade(slot_name, ui.value);
}

function quality_change_handler(slot_name) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.updateSlotTooltip(slot_name);
}

function reset_slot(slot_name) {
	inventoryApp.resetInventorySlot(slot_name);
}
function versionUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	inventoryApp.version = 0+itemstring;
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
var inventoryApp = new InventoryModel(getLocale());
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
	}).fail(function() {
		inventoryApp.clearPool();
	});
}