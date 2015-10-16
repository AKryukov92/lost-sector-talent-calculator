describe('testing ActionSpec class', function() {
	var action30, action15, action200;
	var attack1_10, attack1_15, attack2_10, attack2_5;
	var swap, duck;
	var weapon1 = { name: "weapon1", category:"dummy" };
	var weapon2 = { name: "weapon2", category:"dummy" };
	beforeEach(function() {
		action30 = new Action(30, "action30" );
		action30.possibleRepeat = true;
		action30.imageid = 30;
		action30n1 = new Action (30, "action30n1", 1);
		action30n1.possibleRepeat = true;
		action30n1.imageid = 31;
		action30n2 = new Action (30, "action30n2", 2);
		action30n2.possibleRepeat = true;
		action30n2.imageid = 32;
		action15 = new Action (15, "action15");
		action15.possibleRepeat = true;
		action15.imageid = 15;
		action200 = new Action (200, "action200");
		action200.possibleRepeat = true;
		action200.imageid = 200;
		swap = new Action(10, "Сменить");
		swap.possibleRepeat = false;
		swap.imageid = 1;
		duck = new Action(15, "Присесть");
		duck.possibleRepeat = false;
		duck.imageid = 2;
		attack1_10 = new Action(10, "attack1_10");
		attack1_10.source = weapon1;
		attack1_15 = new Action(15, "attack1_15");
		attack1_15.source = weapon1;
		attack2_10 = new Action(10, "attack2_10");
		attack2_10.source = weapon2;
		attack2_5 = new Action(5, "attack2_5");
		attack2_5.source = weapon2;
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
	
	it('should be valid with actinos [action, action]', function() {
		var root = new ActionSet({actionPoints:100}, action30);
		var leaf = root.createLeaf(action30);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions [swap, swap]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(swap);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(false);
	});
	it('should be valid with actions [swap, talent]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(action30);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(true);
	});
	it('should be valid with actions [swap, talent, swap]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(action30);
		leaf = leaf.createLeaf(swap);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions[swap, talent, swap, swap]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(action30);
		leaf = root.createLeaf(swap);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(false);
	});
	it('should be valid with actions [swap, duck]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(duck);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions [swap, duck, swap]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(duck);
		leaf = leaf.createLeaf(swap);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(false);
	});
	it('should be valid with actions [swap, duck, action, duck]', function() {
		var root = new ActionSet({actionPoints:100}, swap);
		var leaf = root.createLeaf(duck);
		leaf = leaf.createLeaf(action15);
		leaf = leaf.createLeaf(duck);
		leaf.validateRepeatedActions();
		expect(leaf.valid).toEqual(true);
	});
	
	it('should be valid with actions [action, action]', function() {
		var root = new ActionSet({actionPoints:100}, action15);
		var leaf = root.createLeaf(action30);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(true);
	});
	it('should be valid with actions [weap1, weap1]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(attack1_15);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions [weap1, weap2]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(attack2_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(false);
	});
	it('should be valid with actions [action, weap1, weap1]', function() {
		var root = new ActionSet({actionPoints:100}, action15);
		var leaf = root.createLeaf(attack1_10);
		leaf = leaf.createLeaf(attack1_10);
		expect(leaf.valid).toEqual(true);
	});
	it('should be valid with actions [weap1, swap, weap2]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(swap);
		leaf = leaf.createLeaf(attack2_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(true);
	});
	it('should be valid with actions [weap2, swap, weap1]', function() {
		var root = new ActionSet({actionPoints:100}, attack2_10);
		var leaf = root.createLeaf(swap);
		leaf = leaf.createLeaf(attack1_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions [weap1, swap, weap1]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(swap);
		leaf = leaf.createLeaf(attack1_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(false);
	});
	it('should be valid with actions [weap1, action, swap, weap2]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(action15);
		leaf = leaf.createLeaf(swap);
		leaf = leaf.createLeaf(attack2_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(true);
	});
	it('should be invalid with actions [weap1, action, swap, weap1]', function() {
		var root = new ActionSet({actionPoints:100}, attack1_10);
		var leaf = root.createLeaf(action15);
		leaf = leaf.createLeaf(swap);
		leaf = leaf.createLeaf(attack1_10);
		leaf.validateSwapBeforeOtherWeapon();
		expect(leaf.valid).toEqual(false);
	});
});