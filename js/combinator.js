function Action(cost, name, numberOfUses) {
	this.cost = cost;
	this.imageid = 0;
	this.name = name;
	if (typeof numberOfUses == 'undefined') {
		this.numberOfUses = Number.MAX_VALUE;
	} else {
		this.numberOfUses = numberOfUses;
	}
	this.source = {};
	this.isEqual = function(action) {
		return this.cost == action.cost &&
			this.imageid == action.imageid &&
			this.numberOfUses == action.numberOfUses;
	}
}

function ActionSet(maxCost, action) {
	this.actions = [];
	this.maxCost = maxCost;
	if (typeof action != 'undefined') {
		if (action.cost > this.maxCost) {
			throw new Error("overflow");
		}
		this.actions.push(action);
	}
	this.appendFrom = function(actionSet) {
		for (var i = 0; i < actionSet.actions.length; i++) {
			this.actions.push(actionSet.actions[i]);
		}
	};
	this.getCost = function() {
		var cost = 0;
		for (var i = 0; i < this.actions.length; i++) {
			cost += this.actions[i].cost;
		}
		return cost;
	}
	this.createLeaf = function(action) {
		var countOfEqual = 0;
		for (var i = 0; i < this.actions.length; i++) {
			if (action.isEqual(this.actions[i])) {
				countOfEqual++;
			}
		}
		if (countOfEqual >= action.numberOfUses) {
			return null;
		}
		if (this.getCost() + action.cost <= this.maxCost) {
			var leaf = new ActionSet(this.maxCost, action);
			leaf.appendFrom(this);
			return leaf;
		} else {
			return null;
		}
	};
}

function getImageId(talentOrItem) {
	if (typeof talentOrItem.imageid != 'undefined') {
		return talentOrItem.imageid;
	} else {
		return talentOrItem.id;
	}
}

function Combinator() {
	this.actions = [];
	this.addFromCalculator = function(calculator) {
		if (typeof calculator.items == 'undefined') {
			return;
		}
		for (var i = 0; i < calculator.items.length; i ++) {
			var talent = calculator.items[i].base();
			if (typeof talent.status == 'undefined' ||
					talent.status == TALENT_NOT_LEARNED) {
				continue;
			}
			if (typeof talent.AP_cost == 'undefined') {
				continue;
			}
			var action = new Action();
			if (typeof talent.number_of_uses != 'undefined') {
				action.numberOfUses = talent.number_of_uses;
			}
			action.source = talent;
			action.cost = talent.AP_cost;
			action.imageid = getImageId(talent);
			action.name = talent.name;
			this.actions.push(action);
		}
	};
	this.addFromItem = function(item) {
		if (typeof item == 'undefined') {
			return;
		}
		if (typeof item.attacks != 'undefined' && item.attacks.length > 0) {
			for (var i = 0; i < item.attacks.length; i++) {
				var action = new Action();
				action.source = item;
				action.cost = item.attacks[i].cost;
				action.name = item.name + " " + item.attacks[i].name;
				action.imageid = getImageId(item);
				this.actions.push(action);
			}
			if (typeof item.reload_cost != 'undefined') {
				var reload = new Action();
				reload.source = item;
				reload.cost = item.reload_cost;
				reload.name = "Перезарядка";
				reload.imageid = getImageId(item);
				this.actions.push(reload);
			}
		}
		if (typeof item.AP_cost != 'undefined') {
			var consumable = new Action();
			consumable.source = item;
			consumable.cost = item.AP_cost;
			consumable.name = item.name;
			consumable.imageid = getImageId(item);
			consumable.numberOfUses = 1;
			this.actions.push(consumable);
		}
	};
	this.addDuck = function(item) {
		var duck = new Action();
		duck.cost = 15;
		duck.name = "Присесть";
		this.actions.push(duck);
	}
	this.createRoots = function () {
		var ret = [];
		for (var i = 0; i < this.actions.length; i++) {
			var set = new ActionSet(100, this.actions[i]);
			ret.push(set);
		}
		return ret;
	}
	this.produceLeaves = function(roots) {
		var ret = [];
		for (var i = 0; i < this.actions.length; i++) {
			for (var j = 0; j < roots.length; j++) {
				var temp = roots[j].createLeaf(this.actions[i]);
				if (temp != null) {
					ret.push(temp);
				}
			}
		}
		return ret;
	}
}