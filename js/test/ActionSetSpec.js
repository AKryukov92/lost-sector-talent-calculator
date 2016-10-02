function talentsVersionFallback(v){
	if (v == 100 || v == 99){
		return 98;
	}
	if (v == 104 || v == 105){
		return 103;
	}
	return v;
}
var initialTalentData = {
	gameVersion : defaultVersion,
	classPrefix : "as",
	talentInput : ""
};

describe('testing ActionSpec class', function() {
	var weapon1, weapon2;
	var talent55;
	var actionIdSequence = 0;
	beforeEach(function() {
		weapon1 = {id:1,name: "weapon1",category:"dummy",attacks:[{name:"10",cost:10,min_dist:0,max_dist:1.5},{name:"15",cost:15,min_dist:4,max_dist:9}]};
		
		weapon2 = {id:2,name: "weapon2",category:"dummy",attacks:[{name:"10",cost:10,min_dist:10,max_dist:26},{name:"5",cost:5,min_dist:0,max_dist:1.5}]};
		
		talent55 = {id:55,imageid:55,name:"Sprint",description:"Increases mercenary's mobility by 40% until the end of the turn.",cost:1,lvlreq:6,talentreq:431,number_of_uses:2,AP_cost:20,column:8};
		
		reload1 = makeReload(actionIdSequence++, weapon1);
		reload2 = makeReload(actionIdSequence++, weapon2);
	});
	describe("test construction", function(){
		var action30, action15, action200;
		var actionInactive;
		var attack1_10, attack2_10;
		beforeEach(function(){
			action30 = new Action(actionIdSequence++, 30, "action30" );
			action30.possibleRepeat = true;
			action30.imageid = 30;
			action30n1 = new Action (actionIdSequence++, 30, "action30n1", 1);
			action30n1.possibleRepeat = true;
			action30n1.imageid = 31;
			action30n2 = new Action (actionIdSequence++, 30, "action30n2", 2);
			action30n2.possibleRepeat = true;
			action30n2.imageid = 32;
			action15 = new Action (actionIdSequence++, 15, "action15");
			action15.possibleRepeat = true;
			action15.imageid = 15;
			action200 = new Action (actionIdSequence++, 200, "action200");
			action200.possibleRepeat = true;
			action200.imageid = 200;
			actionInactive = new Action(actionIdSequence++, 7, "actionInactive");
			actionInactive.isActive = false;
			actionInactive.possibleRepeat = true;
			actionInactive.imageid = 7;
			attack1_10 = new Action(actionIdSequence++, 10, "attack1_10");
			attack1_10.source = weapon1;
			attack1_10.minDist = 0;
			attack1_10.maxDist = 1.5;
			attack2_10 = new Action(actionIdSequence++, 10, "attack2_10");
			attack2_10.source = weapon2;
			attack2_10.minDist = 10;
			attack2_10.maxDist = 26;
		});
		it('should create ActionSet', function() {
			var set = new ActionSet({actionPoints:100});
			expect(set.actions.length).toEqual(0);
		});
		it('should not create ActionSet if action cost is more than max', function() {
			expect(function() {var set = new ActionSet({actionPoints:29}, action30); }).toThrow(new Error("overflow"));
		});
		it('should add single action to set', function() {
			var set = new ActionSet({actionPoints:100}, action30);
			expect(set.actions.length).toEqual(1);
			expect(set.actions).toContain(action30);
			expect(set.getCost()).toEqual(30);
		});
		it('should append actions from other set', function() {
			var set1 = new ActionSet({actionPoints:100}, action30);
			var set2 = new ActionSet({actionPoints:100}, action15);
			set1.appendFrom(set2);
			expect(set1.actions).toContain(action15);
			expect(set1.actions).toContain(action30);
			expect(set1.getCost()).toEqual(45);
		});
		it('should create leaf with inheritance of actions', function() {
			var set = new ActionSet({actionPoints:100}, action30);
			var leaf = set.createLeaf(action15);
			expect(leaf.actions.length).toEqual(2);
			expect(leaf.actions).toContain(action30);
			expect(leaf.actions).toContain(action15);
			expect(leaf.getCost()).toEqual(45);
			expect(leaf.maxCost).toEqual(set.maxCost);
		});
		it('should not create leaf if cost is unaffordable', function() {
			var set = new ActionSet({actionPoints:30}, action30);
			var leaf = set.createLeaf(action15);
			expect(leaf).toEqual(null);
		});
		it('should not create leaf if action cost is more than max', function() {
			var set = new ActionSet({actionPoints:100}, action30);
			var leaf = set.createLeaf(action200);
			expect(leaf).toEqual(null);
		});
		it('should not create leaf for used action', function() {
			var set = new ActionSet({actionPoints:100}, action30n1);
			var leaf = set.createLeaf(action30n1);
			expect(leaf).toEqual(null);
		});
		it('should not create level 2 leaf for used action', function() {
			var set = new ActionSet({actionPoints:100}, action30n2);
			var leaf1 = set.createLeaf(action30n2);
			var leaf2 = leaf1.createLeaf(action30n2);
			expect(leaf2).toEqual(null);
		});
		it('should create leaf if cost will be equal', function() {
			var set = new ActionSet({actionPoints:30}, action15);
			var leaf1 = set.createLeaf(action15);
			expect(leaf1.actions.length).toEqual(2);
		});
		it('should create leaf if sight range is more than minimal attack distance', function() {
			var root = new ActionSet({actionPoints:100, sightRange:99}, action30);
			var leaf = root.createLeaf(attack1_10);
			expect(leaf.actions.length).toEqual(2);
		});
		it('should not create leaf if sight range is less than minimal attack distance', function() {
			var root = new ActionSet({actionPoints:100, sightRange:5}, action30);
			var leaf = root.createLeaf(attack2_10);
			expect(leaf).toEqual(null);
		});
		it('should not create leaf if action is inactive', function() {
			var root = new ActionSet({actionPoints:100, sightRange:99}, action30);
			var leaf = root.createLeaf(actionInactive);
			expect(leaf).toEqual(null);
		});
	});
	
	describe("test makers", function(){
		var talent1, talent55, talentFake;
		var item103, item446, item420;
		beforeEach(function(){
			talent1 = {
				id:1,
				name:"Пассивная регенерация",
				description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
				effect:"Умножает регенерацию здоровья на 3",
				cost:1,
				lvlreq:1,
				column:0
			};
			talent55 = {id:55,imageid:55,name:"Sprint",description:"Increases mercenary's mobility by 40% until the end of the turn.",cost:1,lvlreq:6,talentreq:431,number_of_uses:2,AP_cost:20,column:8};
			talentFake = {id:0,imageid:0,name:"Fake",description:"Just for testing",cost:1,lvlreq:6,talentreq:431,AP_cost:20,column:8};
			item103 = {id:103,name:"Rebis injection large",consumable_type:1,category:"consumable",description:"Восстанавливает 55 очков здоровья",lvlreq:10,talentreq:2,AP_cost:20};
			item446 = {name:"USP45",category:"pistol",mobility:100,clip:12,ammo:24,reload_cost:20,lvlreq:2,id:446,attacks:[{name:"Snap",type:2,accuracy:49,cost:20,min_dist:4,max_dist:14,bullets:1,min_damage:17,max_damage:26}]};
			item420 = {id:420,name:"Frag Grenade",category:"consumable",consumable_type:4,lvlreq:3,talentreq:4,attacks:[{name:"Throw",type:6,accuracy:50,radius:4,cost:40,min_dist:0,max_dist:15,min_damage:45,max_damage:70}]}
		});
		
		it("should make talent action", function(){
			var action = makeTalent(1, talent55);
			expect(action.cost).toEqual(20);
		});
		
		it("throws exception on making action for passive talent", function(){
			expect(function(){
				makeTalent(1,talent1);
			}).toThrow(new Error("Can not make action for passive talent"));
		});
		
		it("throws exception on making action for talent without number_of_uses property", function(){
			expect(function(){
				makeTalent(1, talentFake);
			}).toThrow(new Error("Number of uses is not defined"));
		});
		
		it("should make attack action", function(){
			var action = makeAttack(1, item446, 0);
			expect(action.item.id).toEqual(446);
			expect(action.getWeapon().id).toEqual(446);
			expect(action.isSwap()).toEqual(false);
			expect(action.cost).toEqual(20);
		});
		
		it("should make reload action", function(){
			var action = makeReload(1, item446, 0);
			expect(action.item.id).toEqual(446);
			expect(action.getWeapon().id).toEqual(446);
			expect(action.isSwap()).toEqual(false);
			expect(action.cost).toEqual(20);
		});
		
		it("should make attack action from grenade", function(){
			var action = makeAttack(1, item420, 0);
			expect(action.item.id).toEqual(420);
			expect(action.getWeapon().id).toEqual(420);
			expect(action.isSwap()).toEqual(false);
			expect(action.cost).toEqual(40);
			expect(action.numberOfUses).toEqual(1);
		});
		
		it("should make consume action from injection", function(){
			var action = makeConsumable(1, item103);
			expect(action.source.id).toEqual(103);
			expect(action.getWeapon()).toEqual(null);
			expect(action.isSwap()).toEqual(false);
			expect(action.cost).toEqual(20);
			expect(action.numberOfUses).toEqual(1);
		});
	});
	
	describe("test validateRepeatedActions", function(){
		it('should be valid with actions [weap1, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0,weapon1, 0));
			var leaf = root.createLeaf(makeAttack(1, weapon1, 0));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions [swap, swap]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeSwap(1));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(false);
		});
		it('should be valid with actions [swap, talent]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeAttack(1, weapon1, 0));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(true);
		});
		it('should be valid with actions [swap, talent, swap]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeAttack(1,weapon1, 0));
			leaf = leaf.createLeaf(makeSwap(2));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions[swap, talent, swap, swap]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeAttack(1, weapon1, 0));
			leaf = root.createLeaf(makeSwap(2));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(false);
		});
		it('should be valid with actions [swap, duck]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeDuck(1));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions [swap, duck, swap]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeDuck(1));
			leaf = leaf.createLeaf(makeSwap(2));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(false);
		});
		it('should be valid with actions [swap, duck, weap1, duck]', function() {
			var root = new ActionSet({actionPoints:100}, makeSwap(0));
			var leaf = root.createLeaf(makeDuck(1));
			leaf = leaf.createLeaf(makeAttack(2, weapon1, 0));
			leaf = leaf.createLeaf(makeDuck(3));
			leaf.validateRepeatedActions();
			expect(leaf.valid).toEqual(true);
		});
		
	});
	
	describe("test validateSwapBeforeOtherWeapon", function(){
		it('should be valid with actions [weap1, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeAttack(1, weapon1, 1));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions [weap1, weap2]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeAttack(1, weapon2, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(false);
		});
		it('should be valid with actions [action, weap1, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeTalent(0, talent55));
			var leaf = root.createLeaf(makeAttack(1, weapon1, 0));
			leaf = leaf.createLeaf(makeAttack(2, weapon1, 0));
			expect(leaf.valid).toEqual(true);
		});
		it('should be valid with actions [weap1, swap, weap2]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeSwap(1));
			leaf = leaf.createLeaf(makeAttack(2, weapon2, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(true);
		});
		it('should be valid with actions [weap2, swap, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon2, 0));
			var leaf = root.createLeaf(makeSwap(1));
			leaf = leaf.createLeaf(makeAttack(2, weapon1, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions [weap1, swap, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeSwap(1));
			leaf = leaf.createLeaf(makeAttack(2, weapon1, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(false);
		});
		it('should be valid with actions [weap1, action, swap, weap2]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeTalent(1, talent55));
			leaf = leaf.createLeaf(makeSwap(2));
			leaf = leaf.createLeaf(makeAttack(3, weapon2, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(true);
		});
		it('should be invalid with actions [weap1, action, swap, weap1]', function() {
			var root = new ActionSet({actionPoints:100}, makeAttack(0, weapon1, 0));
			var leaf = root.createLeaf(makeTalent(1, talent55));
			leaf = leaf.createLeaf(makeSwap(2));
			leaf = leaf.createLeaf(makeAttack(3, weapon1, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(false);
		});
		it("should be invalid with actions [rld1, weap2]", function(){
			var root = new ActionSet({actionPoints:100}, makeReload(0, weapon2));
			var leaf = root.createLeaf(makeAttack(1, weapon2, 0));
			leaf.validateSwapBeforeOtherWeapon();
			expect(leaf.valid).toEqual(false);
		});
	});
});