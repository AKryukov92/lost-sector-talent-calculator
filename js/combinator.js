function Action(id, cost, name, numberOfUses) {
	this.id = id;
	this.type = "generic";
	this.cost = cost;
	this.isActive = true;
	this.possibleRepeat = false;
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
	};
	this.getWeapon = function() {
		if (typeof this.source != 'undefined' && typeof this.source.category != 'undefined') {
			return this.source;
		} else {
			return null;
		}
	};
	this.getDamage = function(){
		
	};
	this.isSwap = function() {
		return this.cost == 10 && this.imageid == 1 && this.possibleRepeat == false;
	};
	this.setRange = function(min, max){
		
	};
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
	this.toString = function(){
		var row = this.actions.length + " ";
		for (var j = 0; j < this.actions.length; j++) {
			row += "(" + getLocalizedProperty(this.actions[j], "name") + ") ";
		}
		return row;
	}
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
			if (typeof talent.AP_cost != 'undefined') {
				this.actions.push(makeTalent(talent));
			}
		}
	};
	this.addFromItem = function(item) {
		if (typeof item == 'undefined') {
			return;
		}
		if (typeof item.attacks != 'undefined' && item.attacks.length > 0) {
			for (var i = 0; i < item.attacks.length; i++) {
				this.actions.push(makeAttack(item, item.attacks[i]));
			}
			if (typeof item.reload_cost != 'undefined') {
				this.actions.push(makeReload(item));
			}
		}
		if (typeof item.AP_cost != 'undefined') {
			this.actions.push(makeConsumable(item));
		}
	};
	this.addSwap = function() {
		this.actions.push(makeSwap());
	};
	this.addDuck = function() {
		this.actions.push(makeDuck());
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
	function makeTalent(talent){
		var action = new Action(this.actionIdSequence++);
		if (typeof talent.number_of_uses != 'undefined') {
			action.numberOfUses = talent.number_of_uses;
		}
		action.type = "talent";
		action.source = talent;
		action.cost = talent.AP_cost;
		action.imageid = getImageId(talent);
		action.name = talent.name;
		action.imagesrc = "talents";
		return action;
	};
	function makeAttack(item, attack){
		var action = new Action(this.actionIdSequence++);
		action.type = "attack";
		action.source = attack;
		action.item = item;
		action.cost = attack.cost;
		action.name = getLocalizedProperty(item, "name") + " " + getLocalizedProperty(attack, "name");
		action.minDist = attack.min_dist;
		action.maxDist = attack.max_dist;
		if (item.category == 'consumable'){
			//Активки типа гранат
			action.numberOfUses = 1;
		}
		action.possibleRepeat = true;
		action.imageid = getImageId(item);
		action.imagesrc = "items";
		return action;
	};
	function makeReload(item){
		var reload = new Action(this.actionIdSequence++);
		reload.type = "reload";
		reload.source = item;
		reload.cost = item.reload_cost;
		reload.name = getLocalizedProperty(item, "name") + " перезарядка"
		reload.imageid = getImageId(item);
		reload.imagesrc = "items";
		return reload;
	};
	function makeConsumable(item){
		var consumable = new Action(this.actionIdSequence++);
		//Активки типа Цереры
		consumable.type = "consumable";
		consumable.source = item;
		consumable.cost = item.AP_cost;
		consumable.imageid = getImageId(item);
		consumable.name = item.name;
		consumable.numberOfUses = 1;
		consumable.possibleRepeat = true;
		consumable.imagesrc = "items";
		return consumable;
	};
	function makeSwap (){
		var swap = new Action(this.actionIdSequence++);
		swap.type = "swap";
		swap.cost = 10;
		swap.name = 
		swap.name = "Сменить";
		swap.source = { name: "Действие" };
		swap.imageid = 2;
		swap.imagesrc = "special";
		return swap;
	};
	function makeDuck (){
		var duck = new Action(this.actionIdSequence++);
		duck.type = "duck";
		duck.cost = 15;
		duck.name = "Присесть";
		duck.source = { name: "Действие" };
		duck.imageid = 1;
		duck.imagesrc = "special";
		return duck;
	};
}