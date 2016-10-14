var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
function tunableItemUriHandler() {}
function specialItemUriHandler () {}
describe('testing InventoryModel class', function() {
	var item446, item432, item418, item467, item435, item103;
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
			item103 = {id:103,name:"Rebis injection large",consumable_type:1,category:"consumable",description:"Восстанавливает 55 очков здоровья",lvlreq:10,talentreq:2,AP_cost:20};
		});
		
		it("throws exception if data is not defined", function(){
			expect(function(){
				model.consumeData()
			}).toThrow(new Error("Data is not defined"));
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
		});
		
		it("throws exception if any item have illegal category", function(){
			expect(function(){
				model.consumeData([{
					id:0,
					category:"fake",
					name:"no category item"
				}]);
			}).toThrow(new Error("Unknown category: fake"));
		});
		
		describe("check possible_slots", function(){
			it("places armor in armor slot", function(){
				model.consumeData([item467, item435]);
				expect(model.possible_slots.armor).toEqual("#item_467, #item_435");
				expect(model.possible_slots.primary).toEqual("");
			});
			
			it("places medium weapon only in main slot", function(){
				model.consumeData([item432]);
				expect(model.possible_slots.armor).toEqual("");
				expect(model.possible_slots.primary).toEqual("#item_432");
				expect(model.possible_slots.secondary).toEqual("");
			});
			
			it ("places light weapons in main and secondary slots", function(){
				model.consumeData([item446,item418]);
				expect(model.possible_slots.primary).toEqual("#item_446, #item_418");
				expect(model.possible_slots.secondary).toEqual("#item_446, #item_418");
				expect(model.possible_slots.armor).toEqual("");
			});
			
			it("properly combines medium and light weapons", function(){
				model.consumeData([item432,item446,item418]);
				expect(model.possible_slots.armor).toEqual("");
				expect(model.possible_slots.primary).toEqual("#item_432, #item_446, #item_418");
				expect(model.possible_slots.secondary).toEqual("#item_446, #item_418");
			});
			
			it("places consumables in each consumable slot", function(){
				model.consumeData([item103]);
				expect(model.possible_slots.consumable_1).toEqual("#item_103");
				expect(model.possible_slots.consumable_2).toEqual("#item_103");
				expect(model.possible_slots.consumable_3).toEqual("#item_103");
				expect(model.possible_slots.consumable_4).toEqual("#item_103");
			});
		});
	});
	
	describe("test getItemById", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item435]);
		});
		
		it("should return item by its id", function(){
			expect(model.getItemById(435).id).toEqual(435);
		});
		
		it("throws exception if id is not present in model", function(){
			expect(function(){
				model.getItemById("fake");
			}).toThrow(new Error("Id fake is not found"));
		});
	});
	
	describe("test autoEquip", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item446, item432, item418, item467, item435]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("attempts to equip machinegun to primary slot", function(){
			var updated_slot = model.autoEquipItem(432);
			expect(model.getItemBySlot("primary").id).toEqual(432);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to replace machinegun with machinegun in primary slot", function(){
			model.autoEquipItem(432);
			var updated_slot = model.autoEquipItem(432);
			expect(model.getItemBySlot("primary").id).toEqual(432);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to equip pistol in primary slot if it is empty", function(){
			var updated_slot = model.autoEquipItem(446);
			expect(model.getItemBySlot("primary").id).toEqual(446);
			expect(updated_slot).toEqual("primary");
		});
		
		it("attempts to replace pistol in secondary slot", function(){
			model.autoEquipItem(432);
			model.autoEquipItem(418);
			var updated_slot = model.autoEquipItem(446);
			expect(model.getItemBySlot("secondary").id).toEqual(446);
			expect(updated_slot).toEqual("secondary");
		});
		
		it("attemts to equip pistol in secondary slot if primary is not empty", function(){
			model.autoEquipItem(432);
			var updated_slot = model.autoEquipItem(446);
			expect(model.getItemBySlot("secondary").id).toEqual(446);
			expect(updated_slot).toEqual("secondary");
		});
		
		it("attemts to equip armor to armor slot", function(){
			var updated_slot = model.autoEquipItem(467);
			expect(model.getItemBySlot("armor").id).toEqual(467);
			expect(updated_slot).toEqual("armor");
		});
		
		it("replaces equiped armor to armor slot", function(){
			model.autoEquipItem(435);
			var updated_slot = model.autoEquipItem(467);
			expect(model.getItemBySlot("armor").id).toEqual(467);
			expect(updated_slot).toEqual("armor");
		});
	});
	
	describe("test equipItem", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item446, item432, item418, item467, item435]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should equip medium item to primary slot", function(){
			model.equipItem(432, "primary");
			expect(model.getItemBySlot("primary").id).toEqual(432);
		});
		
		it("should equip light item to primary slot", function(){
			model.equipItem(446, "primary");
			expect(model.getItemBySlot("primary").id).toEqual(446);
		});
		
		it("should equip light item to secondary slot", function(){
			model.equipItem(446, "secondary");
			expect(model.getItemBySlot("secondary").id).toEqual(446);
		});
		
		it("should equip light item to primary slot even it is not empty", function(){
			model.equipItem(432, "primary");
			model.equipItem(446, "primary");
			expect(model.getItemBySlot("primary").id).toEqual(446);
		});
		
		it("throws exception if medium item is equipped to secondary slot", function(){
			expect(function(){
				model.equipItem(432, "secondary");
			}).toThrow(new Error("Item 432 can not be equipped in slot secondary"));
		});
		
		it("throws expection if item is equipped to fake slot", function(){
			expect(function(){
				model.equipItem(432, "fake");
			}).toThrow(new Error("Item 432 can not be equipped in slot fake"));
		});
	});
	
	describe("test resetSlot", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.itemData.push(item446, item446, item432, item418, item467, item435);
		});
		
		it("do nothing on empty slot", function(){
			var updated_slot = model.resetSlot("primary");
			expect(isEmpty(model.getItemBySlot("primary"))).toEqual(true);
		});
		
		it("removes item in non-empty slot", function(){
			model.equipItem(432, "primary");
			model.resetSlot("primary");
			expect(isEmpty(model.getItemBySlot("primary"))).toEqual(true);
		});
		
		it("throws exception on fake slot", function(){
			expect(function(){
				model.resetSlot("fake");
			}).toThrow(new Error("Slot not found: fake"));
		});
	});
	
	describe("test setGrade", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item103 = {id:103,name:"Rebis injection large",consumable_type:1,category:"consumable",description:"Восстанавливает 55 очков здоровья",lvlreq:10,talentreq:2,AP_cost:20};
			model.consumeData([item418, item103]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should set grade of primary item to blue", function(){
			model.equipItem(418, "primary");
			model.setGrade("primary", 1);
			expect(model.getItemTitle("primary")).toEqual("Axe +1");
		});
		
		it("throws exception if value is below 0", function(){
			model.equipItem(418,"primary");
			expect(function(){
				model.setGrade("primary", -1);
			}).toThrow(new Error("Grade should be between 0 and 15"));
		});
		
		it("throws exception if value is above 15", function(){
			model.equipItem(418,"primary");
			expect(function(){
				model.setGrade("primary", 16);
			}).toThrow(new Error("Grade should be between 0 and 15"));
		});
		
		it("throws exception if slot can not be tuned", function(){
			model.equipItem(103, "consumable_1");
			expect(function(){
				model.setGrade("consumable_1", 3);
			}).toThrow(new Error("Item in slot consumable_1 can not be upgraded"));
		});
	});
	
	describe("test getItemTitle", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item435]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should get grade string of unmodified item", function(){
			model.autoEquipItem(435);
			expect(model.getItemTitle("armor")).toEqual("Vanguard Light Armor");
		});
		
		it("should get grade of modified item", function(){
			model.autoEquipItem(435);
			model.setGrade("armor", 5);
			expect(model.getItemTitle("armor")).toEqual("Vanguard Light Armor +5");
		});
		
		it("throws exception if slot is illegal", function(){
			expect(function(){
				model.getItemTitle("fake");
			}).toThrow(new Error("Slot not found: fake"));
		});
		
		it("should get empty string if slot is empty", function(){
			expect(model.getItemTitle("primary")).toEqual("");
		});
	});
	
	describe("test setColor", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item103 = {id:103,name:"Rebis injection large",consumable_type:1,category:"consumable",description:"Восстанавливает 55 очков здоровья",lvlreq:10,talentreq:2,AP_cost:20};
			model.consumeData([item418, item103]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should set color of slot", function(){
			model.equipItem(418, "primary");
			model.setColor("primary", "blue");
			expect(model.getColor("primary")).toEqual("blue");
		});
		
		it("throws exception if color is unknown", function(){
			model.equipItem(418, "primary");
			expect(function(){
				model.setColor("primary", "fake");
			}).toThrow(new Error("Invalid color: fake"));
		});
		
		it("throws exception if slot can not be tuned", function(){
			model.equipItem(103, "consumable_1");
			expect(function(){
				model.setColor("consumable_1", "blue");
			}).toThrow(new Error("Item in slot consumable_1 can not be upgraded"));
		});
	});
	
	describe("test getImageForId", function(){
		var model = new InventoryModel("en", defaultVersion);
		
		it("should return 0 dx 0 dy for 0 id", function(){
			expect(model.getImageForId(0)).toEqual("<img src='/images/items.png' style='margin-left:-0px;margin-top:-0px;'/>");
		});
		
		it("should return 64 dx 0 dy for 1 id", function(){
			expect(model.getImageForId(1)).toEqual("<img src='/images/items.png' style='margin-left:-64px;margin-top:-0px;'/>");
		});
		
		it("should return 1216 dx 0 dy for 19 id",function(){
			expect(model.getImageForId(19)).toEqual("<img src='/images/items.png' style='margin-left:-1216px;margin-top:-0px;'/>");
		});
		
		it("should return 1216 dx 0 dy for 19 id",function(){
			expect(model.getImageForId(19)).toEqual("<img src='/images/items.png' style='margin-left:-1216px;margin-top:-0px;'/>");
		});
		
		it("should return 0 dx 64 dy for 20 id", function(){
			expect(model.getImageForId(20)).toEqual("<img src='/images/items.png' style='margin-left:-0px;margin-top:-64px;'/>");
		});
		
		it("should return 1216 dx 64 dy for 39 id", function(){
			expect(model.getImageForId(39)).toEqual("<img src='/images/items.png' style='margin-left:-1216px;margin-top:-64px;'/>");
		});
		
		it("should return 960 dx 6208 dy for 1955", function(){
			expect(model.getImageForId(1955)).toEqual("<img src='/images/items.png' style='margin-left:-960px;margin-top:-6208px;'/>");
		});
		
		it("should return 960 dx 6208 dy for 1955", function(){
			expect(model.getImageForId(435)).toEqual("<img src='/images/items.png' style='margin-left:-960px;margin-top:-1344px;'/>");
		});
	});
	
	describe("test getImageForSlot", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item418, item435]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should return slot-specific image for empty slots", function(){
			expect(model.getImageForSlot("armor")).toEqual("<img src='/images/slot-armor.png'>");
			expect(model.getImageForSlot("primary")).toEqual("<img src='/images/slot-primary.png'>");
			expect(model.getImageForSlot("secondary")).toEqual("<img src='/images/slot-secondary.png'>");
			expect(model.getImageForSlot("hat")).toEqual("<img src='/images/slot-hat.png'>");
			expect(model.getImageForSlot("consumable_1")).toEqual("<img src='/images/slot-consumable_1.png'>");
			expect(model.getImageForSlot("consumable_2")).toEqual("<img src='/images/slot-consumable_2.png'>");
			expect(model.getImageForSlot("consumable_3")).toEqual("<img src='/images/slot-consumable_3.png'>");
			expect(model.getImageForSlot("consumable_4")).toEqual("<img src='/images/slot-consumable_4.png'>");
			expect(model.getImageForSlot("consumable_5")).toEqual("<img src='/images/slot-consumable_5.png'>");
			expect(model.getImageForSlot("head_mod")).toEqual("<img src='/images/slot-head_mod.png'>");
			expect(model.getImageForSlot("feet_mod")).toEqual("<img src='/images/slot-feet_mod.png'>");
			expect(model.getImageForSlot("chest_mod")).toEqual("<img src='/images/slot-chest_mod.png'>");
			expect(model.getImageForSlot("hand_mod")).toEqual("<img src='/images/slot-hand_mod.png'>");
		});
		
		it("should return image of item for filled slot",function(){
			model.autoEquipItem(435);
			expect(model.getImageForSlot("armor")).toEqual("<img src='/images/items.png' style='margin-left:-960px;margin-top:-1344px;'/>");
		});
		
		it("throws exception if slot do not exists", function(){
			expect(function(){
				model.getImageForSlot("fake");
			}).toThrow(new Error("Slot not found: fake"));
		});
	});
	
	describe("test getSwimmerForPool", function(){
		var model = new InventoryModel("en", defaultVersion);
		beforeEach(function(){
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
		});
		
		it("should return swimmer for id", function(){
			expect(model.getSwimmerForPool(item418)).toEqual("<div class='swimmer'><div id='item_418' class='swimmer-image-container'><img src='/images/items.png' style='margin-left:-1152px;margin-top:-1280px;'/></div><a id='item418name' href='javascript:equipItem(418)'>Axe</a></div>");
		});
		
		it("throws exception if item is undefined", function(){
			expect(function(){
				model.getSwimmerForPool()
			}).toThrow(new Error("Item is not defined"));
		});
	});
	
	describe("test makeLinkPart", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", defaultVersion);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			model.consumeData([item446, item432, item418, item467, item435]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should return empty string if slot is empty", function(){
			expect(model.makeLinkPart("primary")).toEqual("");
			expect(model.makeLinkPart("secondary")).toEqual("");
			expect(model.makeLinkPart("armor")).toEqual("");
			expect(model.makeLinkPart("consumable_1")).toEqual("");
			expect(model.makeLinkPart("consumable_2")).toEqual("");
			expect(model.makeLinkPart("consumable_3")).toEqual("");
			expect(model.makeLinkPart("consumable_4")).toEqual("");
			expect(model.makeLinkPart("consumable_5")).toEqual("");
			expect(model.makeLinkPart("hat")).toEqual("");
			expect(model.makeLinkPart("head_mod")).toEqual("");
			expect(model.makeLinkPart("hand_mod")).toEqual("");
			expect(model.makeLinkPart("feet_mod")).toEqual("");
			expect(model.makeLinkPart("chest_mod")).toEqual("");
		});
		
		it("should return part of link for white equipped item with 0 grade", function(){
			model.equipItem(446, "primary");
			expect(model.makeLinkPart("primary")).toEqual("&p=446_white_0");
		});
		
		it("should return part of link for blue item with 0 grade", function(){
			model.equipItem(446, "primary");
			model.setColor("primary", "blue");
			expect(model.makeLinkPart("primary")).toEqual("&p=446_blue_0");
		});
		
		it("should return part of link for green item with 5 grade", function(){
			model.equipItem(446, "primary");
			model.setColor("primary", "green");
			model.setGrade("primary", 5);
			expect(model.makeLinkPart("primary")).toEqual("&p=446_green_5");
		});
	});
	
	describe("test getItemUrlBySlot", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", 105);
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item467 = {name:"Vanguard Medium Armor",category:"armor",id:467,protection:60,lvlreq:6};
			item435 = {name:"Vanguard Light Armor",category:"armor",id:435,protection:35};
			item103 = {id:103,name:"Rebis injection large",consumable_type:1,category:"consumable",description:"Восстанавливает 55 очков здоровья",lvlreq:10,talentreq:2,AP_cost:20};
			model.consumeData([item446, item432, item418, item467, item435, item103]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should make empty string if slot is empty", function(){
			expect(model.getItemUrlBySlot("primary")).toEqual("");
		});
		
		it("should make link for tunable item", function(){
			model.equipItem(446, "primary");
			expect(model.getItemUrlBySlot("primary")).toEqual("/item.php?id=446&locale=en&version=105&color=white&quality=0");
		});
		
		it("should make link for blue tunable item", function(){
			model.equipItem(446, "primary");
			model.setColor("primary", "blue");
			expect(model.getItemUrlBySlot("primary")).toEqual("/item.php?id=446&locale=en&version=105&color=blue&quality=0");
		});
		
		it("should make link for upgraded tunable item", function(){
			model.equipItem(446, "primary");
			model.setGrade("primary", 7);
			expect(model.getItemUrlBySlot("primary")).toEqual("/item.php?id=446&locale=en&version=105&color=white&quality=7");
		});
		
		it("should make link for green upgraded tunable item", function(){
			model.equipItem(446, "primary");
			model.setColor("primary", "green");
			model.setGrade("primary", 9);
			expect(model.getItemUrlBySlot("primary")).toEqual("/item.php?id=446&locale=en&version=105&color=green&quality=9");
		});
		
		it("should make link for gray upgraded secondary item", function(){
			model.equipItem(418, "secondary");
			model.setColor("secondary","gray");
			model.setGrade("secondary", 3);
			expect(model.getItemUrlBySlot("secondary")).toEqual("/item.php?id=418&locale=en&version=105&color=gray&quality=3");
		});
		
		it("should make link for blue updaged armor", function(){
			model.equipItem(467, "armor");
			model.setColor("armor","blue");
			model.setGrade("armor", 4);
			expect(model.getItemUrlBySlot("armor")).toEqual("/item.php?id=467&locale=en&version=105&color=blue&quality=4");
		});
		
		it("should make link for consumable", function(){
			model.equipItem(103,"consumable_1");
			expect(model.getItemUrlBySlot("consumable_1")).toEqual("/item.php?id=103&locale=en&version=105");
		});
	});
	
	describe("test getMoveCost and getMobility", function(){
		var model;
		beforeEach(function(){
			model = new InventoryModel("en", 105);
			item418 = {name:"Axe",category:"melee",type:1,mobility:82,lvlreq:7,talentreq:7,classreq:["ju","sc"],id:418,attacks:[{name:"Hit",type:1,accuracy:100,cost:45,min_dist:0,max_dist:2.1,min_damage:70,max_damage:105}]};
			item432 = {name:"M60",category:"machinegun",mobility:57,clip:75,ammo:150,reload_cost:50,lvlreq:5,id:432,attacks:[{name:"Snap",type:5,min_damage:94,max_damage:122,bullets:15,accuracy:54,cost:55,min_dist:15,max_dist:45}]};
			item401 = {name:"Remington M870 Shotgun",category:"shotgun",mobility:85,id:401};
			item447 = {name:"Desert Eagle",category:"pistol",mobility:94,id:447};
			item441 = {name:"AS VAL", category:"assault_rifle", mobility:78,id:441};
			item332 = {name:"Ju armor 1", category:"armor", mobility:90, id:332};
			item426 = {name:"Uzi", category:"smg", mobility:90, id:426};
			model.consumeData([item332, item432, item401, item418, item426, item441, item447]);
			model.updateSlotTooltip = function( slot ){}
		});
		
		it("should return base values if nothing equipped", function(){
			expect(model.getMoveCost()).toEqual(4.5);
			expect(model.getMobility()).toEqual(100);
		});
		
		it("should take into account primary weapon", function(){
			model.autoEquipItem(432);
			expect(model.getMoveCost()).toEqual(7.9);
			expect(model.getMobility()).toEqual(57);
		});
		
		it("should take into account primary and secondary weapons", function(){
			model.autoEquipItem(432);
			model.autoEquipItem(418);
			expect(model.getMoveCost()).toEqual(9.6);
			expect(model.getMobility()).toEqual(47);
		});
		
		it("should take into account armor and weapons", function(){
			model.autoEquipItem(401);
			model.autoEquipItem(426);
			model.autoEquipItem(332);
			expect(model.getMoveCost()).toEqual(6.5);
			expect(model.getMobility()).toEqual(69);
		});
		
		it("should check Remington + Desert Eagle", function(){
			model.autoEquipItem(401);
			model.autoEquipItem(447);
			expect(model.getMoveCost()).toEqual(5.6);
			expect(model.getMobility()).toEqual(80);
		});
		
		it("should check AS VAL + Desert Eagle", function(){
			model.autoEquipItem(441);
			model.autoEquipItem(447);
			expect(model.getMoveCost()).toEqual(6.1);
			expect(model.getMobility()).toEqual(73);
		});
	});
});