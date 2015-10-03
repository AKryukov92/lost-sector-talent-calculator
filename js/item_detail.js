
function InventoryModel(data) {
	this.slots = {
		primary: {short_name :"p", item:{} },
		secondary: { short_name :"s", item:{} },
		armor: { short_name :"a", item:{} },
		hat: { short_name :"h", item:{} },
		consumable_1: { short_name :"c1", item:{} },
		consumable_2: { short_name :"c2", item:{} },
		consumable_3: { short_name :"c3", item:{} },
		consumable_4: { short_name :"c4", item:{} },
		consumable_5: { short_name :"c5", item:{} },
	};
	this.possible_slots = {
		primary:"",
		secondary:"",
		armor:"",
		consumable_1:"",
		consumable_2:"",
		consumable_3:"",
		consumable_4:"",
		consumable_5:"",
		hat:""
	};
	this.weapontype_map = {
		armor: { slots:["armor"] },
		melee: { slots:["primary","secondary"] },
		pistol: { slots:["primary","secondary"] },
		smg: { slots:["primary","secondary"] },
		shotgun: { slots:["primary"] },
		assault_rifle: { slots:["primary"] },
		sniper_rifle: { slots:["primary"] },
		launcher: { slots:["primary"] },
		machinegun: { slots:["primary"] },
		shield: { slots:["primary"] },
		hat: { slots:["hat"] },
		consumable: { slots:["consumable_1", "consumable_2", "consumable_3", "consumable_4", "consumable_5"] }
	};
	this.UriHandlers = {
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
	this.setGrade = function(slot_name, value){
		var element = $("#" + slot_name + "-value");
		this.slots[slot_name].grade = value;
		if (value === 0) {
			element.html( "" );
		} else {
			element.html( " +" + value );
		}
	}
	this.addItem = function (slot_name, item){
		var slot = this.slots[slot_name];
		if (typeof(slot) == 'undefined')
			return;
		slot.item = item;
	};
	this.updateSlotTooltip = function(slot_name){
		var selected_color = $("input[name=" + slot_name +"-quality]:checked", "#" + slot_name).val();
		if (typeof selected_color == 'undefined') {
			selected_color = "white";
		}
		this.slots[slot_name].color = selected_color;
		var selected_quality = $("#" + slot_name + "-slider").slider("option", "value");
		var item = this.slots[slot_name].item;
		if (!$.isEmptyObject(item) && typeof item.id != 'undefined'){
			this.setGrade(slot_name, selected_quality);
			$("#" + slot_name + "-name").text(item.name);
			var link = "/item.php?id=" + item.id + "&color=" + selected_color + "&quality=" + selected_quality;
			$("#" + slot_name + "-link").attr("href", link);
			$("#" + slot_name + "-link").removeClass("grey-link white-link green-link blue-link").addClass(selected_color + "-link");
			$("#" + slot_name + "-iframe").attr("src", link + "&iframe=true");
		}
	};
	this.resetInventorySlot = function(slot_name) {
		this.addItem(slot_name, {});
		$("#" + slot_name + "-link").attr("href", "");
		$("#" + slot_name + "-container").html("<img src=\"itemspng/slot-" + slot_name + ".png\">");
		$("#" + slot_name + "-name").text("");
		$("#" + slot_name + "-value").text("");
		if (typeof update_link != 'undefined') {
			update_link();
		}
	};
	this.removeItem = function(item){
		for (slot in this.slots) {
			if(slot.item.id === item.id) {
				slot.item = null;
			}
		}
	};
	this.equipItem = function(item, slot_name) {
		var old_item = this.slots[slot_name].item;
		if (!$.isEmptyObject(old_item)) {
			this.resetInventorySlot(slot_name);
		}
		this.addItem(slot_name, item);
		$("#" + slot_name + "-container").empty();
		$("#" + slot_name + "-container").prop("title");
		var image_id;
		if (typeof item.imageid != 'undefined') {
			image_id = item.imageid;
		} else {
			image_id = item.id;
		}
		$("#" + slot_name + "-container").html("<img id='item_" + item.id + "' src='itemspng/item" + image_id + "00.png'/>");
		this.updateSlotTooltip(slot_name);
		if (typeof update_link != 'undefined') {
			update_link();
		}
	};
	this.getItemById = function(query_id){
		for (var i = 0; i < this.itemData.length; i++) {
			var current = this.itemData[i];
			if (typeof(current) == 'undefined') {
				continue;
			}
			if (typeof(current.id) == 'undefined') {
				continue;
			}
			if (typeof(current.category) == 'undefined') {
				continue;
			}
			if (current.id == query_id){
				return current;
			}
		}
	};
	this.addItemToPool = function(item){
		if (typeof item.imageid != 'undefined') {
			var item_image_id = item.imageid;
		} else {
			var item_image_id = item.id;
		}
		var diffy = (~~(item_image_id / 20)) * 64;
		var diffx = item_image_id % 20 * 64;
		$("#" + item.category + "-pool")
			.append("<div class=\"swimmer\">" +
				"<div id=\"item_" + item.id + "\" class=\"swimmer-image-container\">" +
					"<img src=\"items.png\" style=\"margin-left:-" + diffx + "px;margin-top:-" + diffy + "px;\"/>" +
				"</div>" +
				"<span class=\"fake-tooltip\">" + item.name + "</span>" +
			"</div>");
		$("#item_" + item.id).draggable({
			containment:"document",
			helper:"clone",
			appendTo: "body"
		});
	};
	this.fillAvailableItems = function(data){
		this.itemData = data;
		for (var i = 0; i < this.itemData.length; i++) {
			var current = this.itemData[i];
			if (typeof(current) == 'undefined') {
				continue;
			}
			if (typeof(current.id) == 'undefined') {
				continue;
			}
			if (typeof(current.category) == 'undefined') {
				continue;
			}
			//console.log("adding " + current.name + " to pool");
			this.addItemToPool(current);
			var slots_of_item = this.weapontype_map[current.category].slots;
			for (var j = 0; j < slots_of_item.length; j ++) {
				if (this.possible_slots[slots_of_item[j]] === "") {
					this.possible_slots[slots_of_item[j]] += "#item_" + current.id;
				} else {
					this.possible_slots[slots_of_item[j]] += ", #item_" + current.id;
				}
			}
		}
	};
}
