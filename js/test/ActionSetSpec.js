describe('testing ActionSpec class', function() {
	var action30, action15, action200;
	beforeEach(function() {
		action30 = new Action(30, "action30" );
		action30n1 = new Action (30, "action30n1", 1);
		action30n2 = new Action (30, "action30n2", 2);
		action15 = new Action (15, "action15");
		action200 = new Action (200, "action200");
	});
	it('should create ActionSet', function() {
		var set = new ActionSet(100);
		expect(set.actions.length).toEqual(0);
	});
	it('should not create ActionSet if action cost is more than max', function() {
		expect(function() {var set = new ActionSet(29, action30); }).toThrow(new Error("overflow"));
	});
	it('should add single action to set', function() {
		var set = new ActionSet(100, action30);
		expect(set.actions.length).toEqual(1);
		expect(set.actions).toContain(action30);
		expect(set.getCost()).toEqual(30);
	});
	it('should append actions from other set', function() {
		var set1 = new ActionSet(100, action30);
		var set2 = new ActionSet(100, action15);
		set1.appendFrom(set2);
		expect(set1.actions).toContain(action15);
		expect(set1.actions).toContain(action30);
		expect(set1.getCost()).toEqual(45);
	});
	it('should create leaf with inheritance of actions', function() {
		var set = new ActionSet(100, action30);
		var leaf = set.createLeaf(action15);
		expect(leaf.actions.length).toEqual(2);
		expect(leaf.actions).toContain(action30);
		expect(leaf.actions).toContain(action15);
		expect(leaf.getCost()).toEqual(45);
		expect(leaf.maxCost).toEqual(set.maxCost);
	});
	it('should not create leaf if cost is unaffordable', function() {
		var set = new ActionSet(30, action30);
		var leaf = set.createLeaf(action15);
		expect(leaf).toEqual(null);
	});
	it('should not create leaf if action cost is more than max', function() {
		var set = new ActionSet(100, action30);
		var leaf = set.createLeaf(action200);
		expect(leaf).toEqual(null);
	});
	it('should not create leaf for used action', function() {
		var set = new ActionSet(100, action30n1);
		var leaf = set.createLeaf(action30n1);
		expect(leaf).toEqual(null);
	});
	it('should not create level 2 leaf for used action', function() {
		var set = new ActionSet(100, action30n2);
		var leaf1 = set.createLeaf(action30n2);
		var leaf2 = leaf1.createLeaf(action30n2);
		expect(leaf2).toEqual(null);
	});
	it('should create leaf if cost will be equal', function() {
		var set = new ActionSet(30, action15);
		var leaf1 = set.createLeaf(action15);
		expect(leaf1.actions.length).toEqual(2);
	});
});