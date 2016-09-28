function slider_slide_handler(slot_name, event, ui) {
	if ($.isEmptyObject(inventoryApp.slots[slot_name].item)) {
		return;
	}
	inventoryApp.setGrade(slot_name, ui.value);
	$("#" + slot_name + "-value")
		.html(inventoryApp.getGradeString(slot_name));
}

function quality_change_handler(slot_name) {
	if (!$.isEmptyObject(inventoryApp.slots[slot_name].item)) {
	inventoryApp.updateSlotTooltip(slot_name);
	}
}

function resetSlot(slot_name) {
	clearSlot(slot_name);
	inventoryApp.resetSlot(slot_name);
}
function versionUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	inventoryApp.version = 0+itemstring;
}
function autoEquipItem(itemId) {
	inventoryApp.autoEquipItem(itemId);
}
var inventoryApp = new InventoryModel(getLocale(), defaultVersion);
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
function clearPool(app) {
	for (type in app.weapontype_map) {
		$("#" + type + "-pool").empty();
	}
}
function clearSlot(slot){
	$("#" + slot + "-link").attr("href", "");
	$("#" + slot + "-container").html("<img src=\"images/slot-" + slot + ".png\">");
	$("#" + slot + "-name").text("");
	$("#" + slot + "-value").text("");
}
function orderToDisplayInventory() {
	clearPool(inventoryApp);
	for (slot in inventoryApp.possible_slots) {
		clearSlot(slot);
	}
	$.get("/item_data.php?version=" + inventoryApp.version, function(data) {
		inventoryApp.consumeData(data);
		for (var i = 0; i < inventoryApp.itemData.length; i++){
			var item =  inventoryApp.itemData[i];
			$("#" + item.category + "-pool")
				.append(inventoryApp.getSwimmerForPool(item));
			$("#item_" + item.id).draggable({
				containment:"document",
				helper:"clone",
				appendTo: "body"
			});
		}
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
		clearPool(inventoryApp);
	});
}