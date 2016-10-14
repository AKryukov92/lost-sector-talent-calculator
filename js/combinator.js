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
	this.source = {};
	this.imagesrc = "";
	this.boxSize = 0;
	
	if (typeof numberOfUses == 'undefined') {
		this.numberOfUses = Number.MAX_VALUE;
	} else {
		this.numberOfUses = numberOfUses;
	}
	
	this.getGuid = function(){
		return "" + this.cost + this.imageid + this.numberOfUses;
	}
	this.isEqual = function(action) {
		return this.cost == action.cost &&
			this.imageid == action.imageid &&
			this.numberOfUses == action.numberOfUses;
	};
	this.getWeapon = function() {
		if (typeof this.item == 'undefined') {
			return null;
		} else {
			return this.item;
		}
	};
	this.isSwap = function() {
		return this.cost == 10 && this.imageid == 1 && this.possibleRepeat == false;
	};
	this.toString = function(){
		var dx = (this.imageid % 20) * this.boxSize;
		var dy = (~~(this.imageid / 20)) * this.boxSize;
		return "<div class='action' style='width:" + this.boxSize + "px;height:" + this.boxSize + "px;'>"
			+ "<img src='" + this.imagesrc + "' style='margin-left:-" + dx + "px;margin-top:-" + dy + "px'/>"
			+ "</div>"
			+ "<div>"
				+ this.name
			+ "</div>";
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
	this.validateRepeatedActions = function(){
		var prev = this.actions[0];
		for(var i = 1; i < this.actions.length;i++){
			var current = this.actions[i];
			if (current.possibleRepeat){
				prev = current;
				continue;
			}
			if(prev.getGuid() == current.getGuid()){
				this.valid = false;
				return;
			}
		}
	};
	this.validateSwapBeforeOtherWeapon = function() {
		var currentWeaponId = null;
		var requireNewWeapon = false;
		var attackActionIndex = 0;
		for (var i = 0; i < this.actions.length; i++) {
			if (this.actions[i].getWeapon() != null) {
				currentWeaponId = this.actions[i].getWeapon().id;
				attackActionIndex = i;
				break;
			}
		}
		if (currentWeaponId == null) {
			return;
		}
		for (var i = 0; i < this.actions.length; i++) {
			var tempWeapon = this.actions[i].getWeapon();
			if (tempWeapon == null) {
				if (this.actions[i].isSwap()) {
					requireNewWeapon = true;
				}
			} else if (requireNewWeapon){
				if (tempWeapon.id == currentWeaponId) {
					this.valid = false;
					return;
				}
			} else {
				if (tempWeapon.id != currentWeaponId) {
					this.valid = false;
					return;
				}
			}
		}
	};
	this.toString = function(){
		var row = this.actions.length + " ";
		for (var j = 0; j < this.actions.length; j++) {
			row += "<div class='action-block'>" + this.actions[j].toString() + "</div>";
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
				this.actions.push(makeTalent(this.actionIdSequence++, talent));
			}
		}
	};
	this.addFromItem = function(item) {
		if (typeof item == 'undefined') {
			return;
		}
		if (typeof item.attacks != 'undefined' && item.attacks.length > 0) {
			for (var i = 0; i < item.attacks.length; i++) {
				this.actions.push(makeAttack(this.actionIdSequence++, item, i));
			}
			if (typeof item.reload_cost != 'undefined') {
				this.actions.push(makeReload(this.actionIdSequence++, item));
			}
		}
		if (typeof item.AP_cost != 'undefined') {
			this.actions.push(makeConsumable(this.actionIdSequence++, item));
		}
	};
	this.addSwap = function() {
		this.actions.push(makeSwap(this.actionIdSequence++));
	};
	this.addDuck = function() {
		this.actions.push(makeDuck(this.actionIdSequence++));
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
function makeTalent(id, talent){
	if (typeof talent.AP_cost == 'undefined'){
		throw new Error("Can not make action for passive talent");
	}
	if (typeof talent.number_of_uses == 'undefined') {
		throw new Error("Number of uses is not defined");
	}
	var action = new Action(id);
	action.numberOfUses = talent.number_of_uses;
	action.cost = talent.AP_cost;
	action.name = "Использовать";
	action.type = "talent";
	action.source = talent;
	action.imageid = getImageId(talent);
	action.imagesrc = "/images/Skills" + talentsVersionFallback(initialTalentData.gameVersion) + ".png";
	action.boxSize = 48;
	return action;
};
function makeAttack(id, item, attackIndex){
	var attack = item.attacks[attackIndex];
	var name = getLocalizedProperty(attack, "name");
	var action = new Action(id, attack.cost, name);
	action.type = "attack";
	action.source = attack;
	action.item = item;
	action.minDist = attack.min_dist;
	action.maxDist = attack.max_dist;
	if (item.category == 'consumable'){
		//Активки типа гранат
		action.numberOfUses = 1;
	}
	action.possibleRepeat = true;
	action.imageid = getImageId(item);
	action.imagesrc = "/images/items.png";
	action.boxSize = 64;
	return action;
};
function makeReload(id, item){
	var name = "Перезарядка";
	var reload = new Action(id, item.reload_cost, name);
	reload.type = "reload";
	reload.source = item;
	reload.item = item;
	reload.imageid = getImageId(item);
	reload.imagesrc = "/images/items.png";
	reload.boxSize = 64;
	return reload;
};
function makeConsumable(id, item){
	var name = "Использовать";
	var consumable = new Action(id, item.AP_cost, name, 1);
	//Активки типа Цереры
	consumable.type = "consumable";
	consumable.item = null;
	consumable.source = item;
	consumable.imageid = getImageId(item);
	consumable.possibleRepeat = true;
	consumable.imagesrc = "/images/items.png";
	consumable.boxSize = 64;
	return consumable;
};
function makeSwap (id){
	var swap = new Action(id, 10, "Сменить");
	swap.type = "swap";
	swap.source = { name: "Действие" };
	swap.item = null;
	swap.imageid = 2;
	swap.imagesrc = "special";
	return swap;
};
function makeDuck (id){
	var duck = new Action(id, 15, "Присесть");
	duck.type = "duck";
	duck.source = { name: "Действие" };
	duck.item = null;
	duck.imageid = 1;
	duck.imagesrc = "special";
	return duck;
};