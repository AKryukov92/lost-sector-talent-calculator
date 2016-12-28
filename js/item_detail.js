function InventoryModel(locale, version, data) {
	if (typeof locale == "undefined") {
		throw new Error("Locale was not defined");
	}
	if (typeof version == "undefined"){
		throw new Error("Version was not defined");
	}
	this.locale = locale;
	this.version = version;
	this.itemData = [];
	var slots = {
		primary: {short_name :"p", item:null, grade: 0, color:"white", tunable:true },
		secondary: { short_name :"s", item:null, grade: 0, color:"white", tunable:true },
		armor: { short_name :"a", item:null, grade: 0, color:"white", tunable:true },
		hat: { short_name :"h", item:null, grade: 0, color:"white", tunable:false },
		consumable_1: { short_name :"c1", item:null, grade: 0, color:"white", tunable:false },
		consumable_2: { short_name :"c2", item:null, grade: 0, color:"white", tunable:false },
		consumable_3: { short_name :"c3", item:null, grade: 0, color:"white", tunable:false },
		consumable_4: { short_name :"c4", item:null, grade: 0, color:"white", tunable:false },
		consumable_5: { short_name :"c5", item:null, grade: 0, color:"white", tunable:false },
		head_mod: {short_name:"hem", item:null, grade: 0, color:"white", tunable:false },
		hand_mod: {short_name:"ham", item:null, grade: 0, color:"white", tunable:false },
		feet_mod: {short_name:"fm", item:null, grade: 0, color:"white", tunable:false },
		chest_mod: {short_name:"cm", item:null, grade: 0, color:"white", tunable:false }
	};
	var colors = Object.freeze({
		gray: 0,
		white: 1,
		green: 2,
		blue: 3
	});
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
	this.consumeData = function(data){
		if (typeof data == "undefined"){
			throw new Error("Data is not defined");
		}
		this.itemData = data;
		for (var i = 0; i < this.itemData.length; i++) {
			var current = this.itemData[i];
			if (typeof(current.id) == 'undefined') {
				throw new Error("Item id is not defined");
			}
			if (typeof(current.category) == 'undefined') {
				throw new Error("Item " + current.id + " category is not defined");
			}
			if (typeof this.weapontype_map[current.category] == 'undefined') {
				throw new Error("Unknown category: " + current.category);
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
	this.getItemById = function(itemId){
		for (var i = 0; i < this.itemData.length; i++) {
			if (this.itemData[i].id == itemId){
				return this.itemData[i];
			}
		}
		throw new Error("Id " + itemId + " is not found");
	};
	this.getItemBySlot = function(slot_name){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		return slots[slot_name].item;
	}
	this.autoEquipItem = function(itemId){
		var item = this.getItemById(itemId);
		var itemSlots = this.weapontype_map[item.category].slots;
		var targetSlot = itemSlots[itemSlots.length - 1];
		for (var i = 0; i < itemSlots.length; i++) {
			if (isEmpty(slots[itemSlots[i]].item)) {
				targetSlot = itemSlots[i];
				break;
			}
		}
		this.resetSlot(targetSlot);
		addItem(targetSlot, item);
		return targetSlot;
	};
	function getRawCost(){
		var cost = 4.5;
		for (slot in slots){
			if (!isEmpty(slots[slot].item) && typeof slots[slot].item.mobility != "undefined"){
				cost /= (slots[slot].item.mobility/100);
			}
		}
		return cost;
	};
	this.getMobility = function(){
		return Math.round(100 * 4.5 / getRawCost());
	};
	this.getMoveCost = function(){
		return Math.round(getRawCost()*10)/10;
	};
	this.equipItem = function(itemId, targetSlot){
		var item = this.getItemById(itemId);
		var slots = this.weapontype_map[item.category].slots;
		for (var i = 0; i < slots.length; i++){
			if (targetSlot == slots[i]){
				this.resetSlot(targetSlot);
				addItem(targetSlot, item);
				return targetSlot;
			}
		}
		throw new Error("Item " + itemId + " can not be equipped in slot " + targetSlot);
	};
	this.resetSlot = function(slot_name) {
		if (typeof(slots[slot_name]) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		slots[slot_name].item = null;
	};
	this.setGrade = function(slot_name, value){
		if (typeof(slots[slot_name]) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		if (value < 0 || value > 15){
			throw new Error("Grade should be between 0 and 15");
		}
		if (!slots[slot_name].tunable){
			throw new Error("Item in slot " + slot_name + " can not be upgraded");
		}
		slots[slot_name].grade = value;
	};
	this.getItemTitle = function(slot_name){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		if (isEmpty(slot.item))
			return "";
		var name = getLocalizedProperty(slot.item, "name");
		if (slot.grade == 0) {
			return name;
		} else {
			return name + " +" + slots[slot_name].grade;
		}
	};
	this.setColor = function(slot_name, color){
		if (typeof colors[color] == "undefined"){
			throw new Error("Invalid color: " + color);
		}
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		if (!slot.tunable){
			throw new Error("Item in slot " + slot_name + " can not be upgraded");
		}
		slots[slot_name].color = color;
	};
	this.getColor = function(slot_name){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		return slots[slot_name].color;
	};
	function addItem(slot_name, item){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		slot.item = item;
	};
	this.getItemUrlBySlot = function(slot_name){
		var item = this.getItemBySlot(slot_name);
		if (isEmpty(item)){
			return "";
		}
		var link = "/item.php?"
			+ "id=" + item.id
			+ "&locale=" + this.locale
			+ "&version=" + this.version;
		if (slots[slot_name].tunable){
			link += "&color=" + slots[slot_name].color
				+ "&quality=" + slots[slot_name].grade;
		}
		return link;
	};
	this.getImageForId = function (itemId) {
		var diffy = (~~(itemId / 20)) * 64;
		var diffx = itemId % 20 * 64;
		return "<img src='/images/items.png' style='margin-left:-" + diffx + "px;margin-top:-" + diffy + "px;'/>";
	};
	this.getImageForSlot = function(slot_name){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		if (isEmpty(slot.item)){
			return "<img src='/images/slot-" + slot_name + ".png'>";
		}
		return this.getImageForId(slot.item.id);
	};
	this.getSwimmerForPool = function(item){
		if (typeof item == "undefined"){
			throw new Error("Item is not defined");
		}
		return "<div class='swimmer'>" +
			"<div id='item_" + item.id + "' class='swimmer-image-container'>" +
				this.getImageForId(item.id) +
			"</div>" +
			"<a id='item" + item.id + "name' href='javascript:equipItem(" + item.id + ")'>" + getLocalizedProperty(item, "name") + "</a>" +
		"</div>";
	};
	this.applyLocale = function(locale) {
		this.locale = locale;
		for (var i = 0; i < this.itemData.length; i++) {
			var current = this.itemData[i];
			$("#item" + current.id + "name").html(getLocalizedProperty(current, "name"));
		}
		for (slot in this.possible_slots){
			this.updateSlotTooltip(slot);
		}
	};
	this.clearEquipped = function() {
		for (slot in this.possible_slots) {
			this.resetSlot(slot);
		}
	};
	this.makeLinkPart = function(slot_name){
		var slot = slots[slot_name];
		if (typeof(slot) == 'undefined')
			throw new Error("Slot not found: " + slot_name);
		if (!isEmpty(slot.item)) {
			return "&" + slot.short_name + "=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}else {
			return "";
		}
	};
}
