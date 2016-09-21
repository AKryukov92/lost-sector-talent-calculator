function Action(id, cost, name, numberOfUses) {
	this.id = id;
	this.cost = cost;
	this.isActive = true;
	this.imageid = 0;
	this.name = name;
	this.maxDist = 99;
	this.minDist = 0;
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
	this.getWeapon = function() {
		if (typeof this.source != 'undefined' && typeof this.source.category != 'undefined') {
			return this.source;
		} else {
			return null;
		}
	}
	this.isSwap = function() {
		return this.cost == 10 && this.imageid == 1 && this.possibleRepeat == false;
	}
}

function AttributeModifier() {
	this.duration = 99;
	this.attribute = "";
	this.operation = function(value) {
		var newValue = 0;
		return newValue;
	}
}

function ActionSet(unitState, action) {
	this.actions = [];
	this.valid = true;
	this.unitState = unitState;
	if (isEmpty(unitState)) {
		throw new Error("Unit state is empty");
	}
	if (typeof unitState.actionPoints == 'undefined') {
		unitState.actionPoints = 100;
	}
	if (typeof action != 'undefined') {
		if (action.cost > this.unitState.actionPoints) {
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
		if (typeof action.isActive == "undefined" || !action.isActive) {
			return null;
		}
		var countOfEqual = 0;
		for (var i = 0; i < this.actions.length; i++) {
			if (action.isEqual(this.actions[i])) {
				countOfEqual++;
			}
		}
		if (countOfEqual >= action.numberOfUses) {
			return null;
		}
		if (this.unitState.sightRange < action.minDist) {
			return null;
		}
		if (this.getCost() + action.cost <= this.unitState.actionPoints) {
			var leaf = new ActionSet(this.unitState, action);
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
					return;
				} else {
					recent = true;
					recentImageId.push(action.imageid);
				}
			} else {
				recent = false;
				recentImageId = [];
			}
		}
		return;
	};
	this.validateSwapBeforeOtherWeapon = function() {
		var currentWeapon = null;
		var requireNewWeapon = false;
		var attackActionIndex = 0;
		for (var i = 0; i < this.actions.length; i++) {
			if (this.actions[i].getWeapon() != null) {
				currentWeapon = this.actions[i].getWeapon();
				attackActionIndex = i;
				break;
			}
		}
		if (currentWeapon == null) {
			return;
		}
		for (var i = 0; i < this.actions.length; i++) {
			var tempWeapon = this.actions[i].getWeapon();
			if (tempWeapon == null) {
				if (this.actions[i].isSwap()) {
					requireNewWeapon = true;
				}
			} else if (requireNewWeapon){
				if (tempWeapon == currentWeapon) {
					this.valid = false;
					return;
				}
			} else {
				if (tempWeapon != currentWeapon) {
					this.valid = false;
					return;
				}
			}
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
	this.actionIdSequence = 0;
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
			var action = new Action(this.actionIdSequence++);
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
				var action = new Action(this.actionIdSequence++);
				action.source = item;
				action.cost = item.attacks[i].cost;
				action.name = getLocalizedProperty(item, "name") + " " + getLocalizedProperty(item.attacks[i], "name");
				action.minDist = item.attacks[i].min_dist;
				action.maxDist = item.attacks[i].max_dist;
				if (item.category == 'consumable') {
					//Активки
					action.numberOfUses = 1;
				}
				action.possibleRepeat = true;
				action.imageid = getImageId(item);
				action.imagesrc = "items";
				this.actions.push(action);
			}
			if (typeof item.reload_cost != 'undefined') {
				var reload = new Action(this.actionIdSequence++);
				reload.source = item;
				reload.cost = item.reload_cost;
				action.possibleRepeat = false;
				reload.name = getLocalizedProperty(item, "name") + " перезарядка";
				reload.imageid = getImageId(item);
				reload.imagesrc = "items";
				this.actions.push(reload);
			}
		}
		if (typeof item.AP_cost != 'undefined') {
			var consumable = new Action(this.actionIdSequence++);
			consumable.source = item;
			consumable.cost = item.AP_cost;
			consumable.imageid = getImageId(item);
			consumable.name = item.name;
			consumable.numberOfUses = 1;
			consumable.possibleRepeat = true;
			consumable.imagesrc = "items";
			this.actions.push(consumable);
		}
	};
	this.addSwap = function(item) {
		var swap = new Action(this.actionIdSequence++);
		swap.cost = 10;
		swap.name = "Сменить";
		swap.source = { name: "Действие" };
		swap.imageid = 2;
		swap.imagesrc = "special";
		swap.possibleRepeat = false;
		this.actions.push(swap);
	};
	this.addDuck = function(item) {
		var duck = new Action(this.actionIdSequence++);
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
			var set = new ActionSet({actionPoints:100}, this.actions[i]);
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
function calculateBaseAttributes(calculator, items){
	var PperM = 
}
function performActions(calculator){
	
}