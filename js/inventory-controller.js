var inventoryApp = new InventoryModel();

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
});