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
	this.valid = true;
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
	this.validateRepeatedActions = function() {
		var recent = false;
		var recentImageId = [];
		for (var i = 0; i < this.actions.length; i++) {
			var action = this.actions[i];
			if (!action.possibleRepeat) {
				var found = false;
				for (var j = 0; j < recentImageId.length; j++) {
					if (action.imageid == recentImageId[j]) {
						found = true;
					}
				}
				if (recent && found) {
					this.valid = false;
					return true;
				} else {
					recent = true;
					recentImageId.push(action.imageid);
				}
			} else {
				recent = false;
				recentImageId = [];
			}
		}
		return false;
	};
	this.validateSwapDividedWithPossibleAttack = function() {
		
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
			action.possibleRepeat = false;
			action.name = talent.name;
			action.imagesrc = "talents";
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
				action.name = item.attacks[i].name;
				action.possibleRepeat = true;
				action.imageid = getImageId(item);
				action.imagesrc = "items";
				this.actions.push(action);
			}
			if (typeof item.reload_cost != 'undefined') {
				var reload = new Action();
				reload.source = item;
				reload.cost = item.reload_cost;
				action.possibleRepeat = false;
				reload.name = "Пер-ка";
				reload.imageid = getImageId(item);
				reload.imagesrc = "items";
				this.actions.push(reload);
			}
		}
		if (typeof item.AP_cost != 'undefined') {
			var consumable = new Action();
			consumable.source = item;
			consumable.cost = item.AP_cost;
			consumable.imageid = getImageId(item);
			consumable.name = "расход";
			consumable.numberOfUses = 1;
			consumable.possibleRepeat = true;
			consumable.imagesrc = "items";
			this.actions.push(consumable);
		}
	};
	this.addSwap = function(item) {
		var swap = new Action();
		swap.cost = 10;
		swap.name = "Сменить";
		swap.source = { name: "Действие" };
		swap.imageid = 2;
		swap.imagesrc = "special";
		swap.possibleRepeat = false;
		this.actions.push(swap);
	};
	this.addDuck = function(item) {
		var duck = new Action();
		duck.cost = 15;
		duck.name = "Присесть";
		duck.source = { name: "Действие" };
		duck.possibleRepeat = false;
		duck.imageid = 1;
		duck.imagesrc = "special";
		this.actions.push(duck);
	};
	this.createRoots = function () {
		var ret = [];
		for (var i = 0; i < this.actions.length; i++) {
			var set = new ActionSet(100, this.actions[i]);
			ret.push(set);
		}
		return ret;
	};
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
	};
	this.createTree = function() {
		var totalSets = [];
		var temp = this.createRoots();
		while(temp.length > 0) {
			totalSets = totalSets.concat(temp);
			temp = this.produceLeaves(temp);
		}
		return totalSets;
	};
}