var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
function tunableItemUriHandler() {}
function specialItemUriHandler () {}
describe('testing InventoryModel class', function() {
	var item446, item432, item418, item467, item435;
	describe("test construction", function(){
		it("throws Exception without locale", function(){
			expect(function(){
				new InventoryModel()
			}).toThrow(new Error("Locale was not defined"));
		});
		
		it("throws Exception without version", function(){
			expect(function(){
				new InventoryModel("en")
			}).toThrow(new Error("Version was not defined"));
		});
		
		it("should define maps 'slots', 'possible_slots', 'weapontype_map'", function(){
			var model = new InventoryModel("en", defaultVersion);
			expect(typeof model.slots).not.toEqual("undefined");
			expect(typeof model.possible_slots).not.toEqual("undefined");
			expect(typeof model.weapontype_map).not.toEqual("undefined");
			expect(model.itemData.length).toEqual(0);
		});
	});
	
	describe("test consumeData", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
		});
		
		it("throws exception if any item have no id", function(){
			expect(function(){
				model.consumeData([{
					name:"no id item"
				}]);
			}).toThrow(new Error("Item id is not defined"));
		});
		
		it("throws exception if any item have no category", function(){
			expect(function(){
				model.consumeData([{
					id:0,
					name:"no category item"
				}]);
			}).toThrow(new Error("Item 0 category is not defined"));
		})
		
		it("throws exception if any item have illegal category", function(){
			expect(function(){
				model.consumeData([{
					id:0,
					category:"fake",
					name:"no category item"
				}]);
			}).toThrow(new Error("Unknown category: fake"));
		});
		
		it("fills possible_slots array with tokens #item_id of proper items", function(){
			model.consumeData([item446,item418, item432, item467, item435])
			expect(model.possible_slots.armor).toEqual("#item_467, #item_435")
		});
	});
	
	describe("test addItem", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
		});
		
		it("should add item to defined slot", function(){
			var item = { id: 1 };
			model.addItem("primary", item);
			expect(model.slots.primary.item.id).toEqual(1);
		});
		
		it("should update item in defined slot", function(){
			var item1 = { id: 1 }, item2 = { id: 2 };
			model.addItem("primary", item1);
			model.addItem("primary", item2);
			expect(model.slots.primary.item.id).toEqual(2);
		});
		
		it("throws exception if slot is not found", function(){
			var item = { id: 1 };
			expect(function() {model.addItem("fake", item); }).toThrow(new Error("Slot not found: fake"));
		});
	});
	
	describe("test autoequip", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.itemData.push(item446);
			model.itemData.push(item432);
			model.itemData.push(item418);
			model.itemData.push(item467);
			model.itemData.push(item435);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("attempts to equip machinegun to primary slot", function(){
			var updated_slot = model.autoEquipItem(432);
			expect(model.slots.primary.item.id).toEqual(432);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to replace machinegun with machinegun in primary slot", function(){
			model.slots.primary.item = item432;
			var updated_slot = model.autoEquipItem(432);
			expect(model.slots.primary.item.id).toEqual(432);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to equip pistol in primary slot if it is empty", function(){
			var updated_slot = model.autoEquipItem(446);
			expect(model.slots.primary.item.id).toEqual(446);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to replace pistol in secondary slot", function(){
			model.slots.primary.item = item432;
			model.slots.secondary.item = item418;
			var updated_slot = model.autoEquipItem(446);
			expect(model.slots.secondary.item.id).toEqual(446);
			expect(updated_slot).toEqual("secondary");
		});
		
		it("attemts to equip pistol in secondary slot if primary is not empty", function(){
			model.slots.primary.item = item432;
			var updated_slot = model.autoEquipItem(446);
			expect(model.slots.secondary.item.id).toEqual(446);
			expect(updated_slot).toEqual("secondary");
		});
		
		it("attemts to equip armor to armor slot", function(){
			var updated_slot = model.autoEquipItem(467);
			expect(model.slots.armor.item.id).toEqual(467);
			expect(updated_slot).toEqual("armor");
		});
		
		it("replaces equiped armor to armor slot", function(){
			model.slots.primary.item = item435;
			var updated_slot = model.autoEquipItem(467);
			expect(model.slots.armor.item.id).toEqual(467);
			expect(updated_slot).toEqual("armor");
		});
	});
	
	describe("test resetSlot", function(){
		var model;
		var item446, item432, item418, item467, item435;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.itemData.push(item446);
			model.itemData.push(item432);
			model.itemData.push(item418);
			model.itemData.push(item467);
			model.itemData.push(item435);
		});
		
		it("do nothing on empty slot", function(){
			var updated_slot = model.resetSlot("primary");
			expect(isEmpty(model.slots.primary.item)).toEqual(true);
		});
		
		it("removes item in non-empty slot", function(){
			model.slots.primary.item = item435;
			model.resetSlot("primary");
			expect(isEmpty(model.slots.primary.item)).toEqual(true);
		});
		
		it("throws exception on fake slot", function(){
			expect(function(){
				model.resetSlot("fake");
			}).toThrow(new Error("Slot not found: fake"));
		});
	});
	
	describe("test getLocalizedProperty", function(){
		var model = new InventoryModel("en", defaultVersion);
		var itemNotLocalized,
			itemLocalizedNoSuitableLocale,
			itemContainLocale;
		beforeEach(function() {
			itemNotLocalized = {
				id:1,
				name:"абвгд"
			};
			itemLocalizedNoSuitableLocale = {
				id:2,
				name:{"en":"bcdef"}
			};
			itemContainLocale = {
				id:3,
				name:{"ru":"вгдеж",
				"en":"cdefg"}
			}
			itemContainLocalizedSubitem = {
				id:4,
				specials: {
					effects:[
						{"ru":"эффект",
						"en":"effect"}
					]
				}
			}
		});
		it('should return plain value if it is not localized yet', function() {
			var value = model.getLocalizedProperty(itemNotLocalized, "name", "en");
			expect(value).toEqual("абвгд");
		});
		it('should return model locale if no suitable locale found', function() {
			var value = model.getLocalizedProperty(itemLocalizedNoSuitableLocale, "name", "ru");
			expect(value).toEqual("bcdef");
		});
		it('should return requested locale', function() {
			var value = model.getLocalizedProperty(itemContainLocale, "name", "ru");
			expect(value).toEqual("вгдеж");
		});
		it('should return requested locale of subitem', function(){
			var value = model.getLocalizedProperty(itemContainLocalizedSubitem.specials.effects, 0, "en");
			expect(value).toEqual("effect");
		});
		it('should use model locale if not specified otherwise', function() {
			var value = model.getLocalizedProperty(itemContainLocale,"name");
			expect(value).toEqual("cdefg");	
		});
	});
});