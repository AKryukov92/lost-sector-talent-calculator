
function InventoryModel(locale,data) {
	if (typeof locale == "undefined") {
		throw new Error("Locale was not defined");
	}
	this.locale = locale;
	this.slots = {
		primary: {short_name :"p", item:{}, grade: 0 },
		secondary: { short_name :"s", item:{}, grade: 0 },
		armor: { short_name :"a", item:{}, grade: 0 },
		hat: { short_name :"h", item:{}, grade: 0 },
		consumable_1: { short_name :"c1", item:{}, grade: 0 },
		consumable_2: { short_name :"c2", item:{}, grade: 0 },
		consumable_3: { short_name :"c3", item:{}, grade: 0 },
		consumable_4: { short_name :"c4", item:{}, grade: 0 },
		consumable_5: { short_name :"c5", item:{}, grade: 0 },
		head_mod: {short_name:"hem", item:{}, grade: 0 },
		hand_mod: {short_name:"ham", item:{}, grade: 0 },
		feet_mod: {short_name:"fm", item:{}, grade: 0 },
		chest_mod: {short_name:"cm", item:{}, grade: 0 }
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
		hat:"",
		head_mod:"",
		hand_mod:"",
		feet_mod:"",
		chest_mod:""
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
		consumable: { slots:["consumable_1", "consumable_2", "consumable_3", "consumable_4", "consumable_5"] },
		head_mod: { slots:["head_mod"] },
		hand_mod: { slots:["hand_mod"] },
		feet_mod: { slots:["feet_mod"] },
		chest_mod: { slots:["chest_mod"] }
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
		"hem": { fn: specialItemUriHandler, target: "head_mod" },
		"ham": { fn: specialItemUriHandler, target: "hand_mod" },
		"fm": { fn: specialItemUriHandler, target: "feet_mod" },
		"cm": { fn: specialItemUriHandler, target: "chest_mod" },
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
		if (value == 0) {
			element.html( "" );
		} else {
			element.html( " +" + value );
		}
	};
	this.getGrade = function(slot_name) {
		return this.slots[slot_name].grade;
	}
	this.getGrade = function(slot_name, value) {
		return this.slots[slot_name].grade;
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
		var selected_quality = this.getGrade(slot_name);
		var item = this.slots[slot_name].item;
		if (!$.isEmptyObject(item) && typeof item.id != 'undefined'){
			$("#" + slot_name + "-name").text(this.getLocalizedProperty(item, "name"));
			var link = "/item.php?"
				+ "id=" + item.id
				+ "&locale=" + this.locale;
			if (item.category != "consumable"
				&& item.category != "hat"
				&& item.category != "head_mod"
				&& item.category != "chest_mod"
				&& item.category != "feet_mod"
				&& item.category != "hand_mod"
			) {
				link += "&color=" + selected_color
					+ "&quality=" + selected_quality;
			}
			$("#" + slot_name + "-link").attr("href", link);
			$("#" + slot_name + "-link").removeClass("grey-link white-link green-link blue-link").addClass(selected_color + "-link");
			$.get(link + "&iframe=true", function(data) {
				$("#" + slot_name + "-fake-tooltip").html(data);
			});
		}
	};
	this.resetInventorySlot = function(slot_name) {
		this.addItem(slot_name, {});
		$("#" + slot_name + "-link").attr("href", "");
		$("#" + slot_name + "-container").html("<img src=\"images/slot-" + slot_name + ".png\">");
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
	this.equipItem = function(item, slot_name, fallback) {
		var slot = $("#" + slot_name + "-container");
		if (slot.length == 0) {
			slot = $("#" + fallback + "-container");
			slot_name = fallback;
		}
		var old_item = this.slots[slot_name].item;
		if (!$.isEmptyObject(old_item)) {
			this.resetInventorySlot(slot_name);
		}
		this.addItem(slot_name, item);
		slot.empty();
		slot.prop("title");
		slot.html(this.getImageForItem(item));
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
	this.getImageForItem = function (item) {
		if (typeof item.imageid != 'undefined') {
			var item_image_id = item.imageid;
		} else {
			var item_image_id = item.id;
		}
		var diffy = (~~(item_image_id / 20)) * 64;
		var diffx = item_image_id % 20 * 64;
		return "<img src=\"images/items.png\" style=\"margin-left:-" + diffx + "px;margin-top:-" + diffy + "px;\"/>";
	};
	this.addItemToPool = function(item){
		$("#" + item.category + "-pool")
			.append("<div class=\"swimmer\">" +
				"<div id=\"item_" + item.id + "\" class=\"swimmer-image-container\">" +
					this.getImageForItem(item) +
				"</div>" +
				"<a id=\"item" + item.id + "name\" href='javascript:autoEquipItem(" + item.id + ", \"primary\")'>" + this.getLocalizedProperty(item, "name") + "</a>" +
			"</div>");
		$("#item_" + item.id).draggable({
			containment:"document",
			helper:"clone",
			appendTo: "body"
		});
	};
	this.getLocalizedProperty = function(container, property, locale) {
		if (typeof container[property] == "undefined") {
			throw new Error("Свойство не существует");
		}
		if (typeof container[property] === "object" && container[property] !== null) {
			if (typeof container[property][locale] != 'undefined') {
				return container[property][locale];
			} else {
				return container[property][this.locale];
			}
		} else {
			return container[property];
		}
	};
	this.applyLocale = function(locale) {
		this.locale = locale;
		for (var i = 0; i < this.itemData.length; i++) {
			var current = this.itemData[i];
			$("#item" + current.id + "name").html(this.getLocalizedProperty(current, "name"));
		}
		for (slot in this.possible_slots){
			this.updateSlotTooltip(slot);
		}
	};
	this.clearPool = function() {
		for (type in this.weapontype_map) {
			$("#" + type + "-pool").empty();
		}
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
			if (typeof this.weapontype_map[current.category] == 'undefined') {
				throw new Error("Unknown category:" + current.category);
			}				
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
