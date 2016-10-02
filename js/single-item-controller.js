function slider_slide_handler(slot_name, event, ui) {
	if (isEmpty(inventoryApp.getItemBySlot(slot_name))) {
		return;
	}
	inventoryApp.setGrade(slot_name, ui.value);
	$("#" + slot_name + "-link")
		.html(inventoryApp.getItemTitle(slot_name));
}

function quality_change_handler(slot_name) {
	if (isEmpty(inventoryApp.getItemBySlot(slot_name))) {
		return;
	}
	var selected_color = $("input[name=" + slot_name +"-quality]:checked", "#" + slot_name).val();
	inventoryApp.setColor(slot_name, selected_color);
	updateSlotTooltip(slot_name);
}
function updateSlotTooltip(slotName){
	if (isEmpty(inventoryApp.getItemBySlot(slotName))) {
		return;
	}
	var link = inventoryApp.getItemUrlBySlot(slotName);
	$("#" + slotName + "-link")
		.attr("href", link)
		.text(inventoryApp.getItemTitle(slotName));
	$("#" + slotName + "-link")
		.removeClass("grey-link white-link green-link blue-link")
		.addClass(inventoryApp.getColor(slotName) + "-link");
	$("#" + slotName + "-container")
		.html(inventoryApp.getImageForSlot(slotName));
	$.get(link + "&iframe=true", function(data) {
		$("#" + slotName + "-fake-tooltip")
			.html(data);
	});
}

function resetSlot(slot_name) {
	clearSlot(slot_name);
	inventoryApp.resetSlot(slot_name);
}
function versionUriHandler(key, value, target) {
	itemstring = decodeURIComponent(value);
	inventoryApp.version = 0+itemstring;
}
function equipItem(itemId) {
	inventoryApp.equipItem(itemId, activeSlot);
	updateSlotTooltip(activeSlot);
	var slot = $("#" + activeSlot + "-container");
	slot.empty();
	slot.prop("title");
	slot.html(inventoryApp.getImageForSlot(activeSlot));
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
	$("#" + slot + "-link")
		.attr("href", "")
		.text("");
	$("#" + slot + "-container")
		.html("<img src=\"images/slot-" + slot + ".png\">");
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
					inventoryApp.autoEquipItem(item_id);
				}
			});
		}
	}).fail(function() {
		clearPool(inventoryApp);
	});
}