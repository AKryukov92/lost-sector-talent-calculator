var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
var DEST_BOX_SIZE = 35;
var SOURCE_BOX_SIZE = 48;
function talentsVersionFallback(v){
	if (v == 100 || v == 99){
		return 98;
	}
	if (v == 104 || v == 105){
		return 103;
	}
	return v;
}
function CalculatorItem(talent) {
	if (typeof talent.id == 'undefined') {
		throw new Error("Illegal talent data. 'id' not defined");
	}
	if (typeof talent.lvlreq == 'undefined') {
		throw new Error("Illegal talent data. 'lvlreq' not defined");
	}
	if (typeof talent.column == 'undefined') {
		throw new Error("Illegal talent data. 'column' not defined");
	}
	this.req = false;
	this.refs = [];
	this.ranks = [];
	if (typeof talent.imageid != 'undefined') {
		this.imageBoundsX = (talent.imageid % 20) * SOURCE_BOX_SIZE;
		this.imageBoundsY = (~~(talent.imageid / 20)) * SOURCE_BOX_SIZE; 
	} else {
		this.imageBoundsX = (talent.id % 20) * SOURCE_BOX_SIZE;
		this.imageBoundsY = (~~(talent.id / 20)) * SOURCE_BOX_SIZE;
	}
	this.setReq = function(talent) {
		this.req = talent;
	};
	this.addRef = function(talent) {
		this.refs.push(talent);
	};
	this.base = function() {
		return this.ranks[0];
	};
	this.addRank = function(talent) {
		var i = 0;
		while(i < this.ranks.length) {
			if (talent.id < this.ranks[i].id) {
				break;
			}
			i++;
		}
		talent.status = TALENT_NOT_LEARNED;
		this.ranks.splice(i,0,talent);
	};
	this.anyRefLearned = function() {
		for (var i = 0; i < this.refs.length; i++){
			if (this.refs[i].base().status == TALENT_LEARNED){
				return true;
			}
		}
		return false;
	}
	this.canLearn = function() {
		if (this.req){
			if (this.req.base().status == TALENT_NOT_LEARNED){
				return false;
			}
			if (this.req.anyRefLearned()){
				return false;
			}
		}
		return this.getLearnedCount() < this.ranks.length;
	};
	this.canUnlearn = function() {
		var i = this.getLearnedCount();
		if (i > 1){
			return true;
		} else if (i == 1){
			return !this.anyRefLearned();
		}
		return false;
	};
	this.getLearnedCount = function() {
		var i = 0;
		while (i < this.ranks.length) {
			if (this.ranks[i].status != TALENT_LEARNED) {
				break;
			}
			i++;
		}
		return i;
	};
	this.learn = function() {
		if (this.canLearn()) {
			var i = this.getLearnedCount();
			this.ranks[i].status = TALENT_LEARNED;
		} else {
			throw new Error("Talent can not be learned.");
		}
	};
	this.unlearn = function() {
		if (this.canUnlearn()) {
			var i = this.getLearnedCount() - 1;
			this.ranks[i].status = TALENT_NOT_LEARNED;
		} else {
			throw new Error("Talent can not be unlearned.");
		}
	};
	this.isUsable = function() {
		return typeof talent.AP_cost != 'undefined';
	};
	this.addRank(talent);
}

function Calculator () {
	this.talents_data = [];
	this.prefix = "";
	this.width = 0;
	this.items = [];
	
	this.init = function(input) {
		this.consumeInput(input);
		this.calculateWidth();
		this.assignPowerToTalents();
		this.mapRefsReqs();
		this.mapRanks();
	};
	
	this.consumeInput = function(input) {
		if (typeof input.prefix == 'undefined') {
			throw new Error("Illegal class data. Class prefix not defined");
		}
		if (typeof input.talents == 'undefined') {
			throw new Error("Illegal class data. Talents data not defined");
		}
		this.talents_data = input.talents;
		this.prefix = input.prefix;
		this.items = [];
		for (var i = 0; i < this.talents_data.length; i++) {
			if (typeof this.talents_data[i].rankof == 'undefined') {
				this.items.push(new CalculatorItem(this.talents_data[i]));
			}
		}
	};
	
	this.calculateWidth = function() {
		var max_column = 0;
		for (var i = 0; i < this.talents_data.length; i++) {
			var current = this.talents_data[i];
			if (current.column > max_column) {
				max_column = current.column;
			}
		}
		this.width = max_column;
	};
	this.mapRefsReqs = function() {
		for (var i = 0; i < this.items.length; i++) {
			var current = this.items[i];
			if (typeof current.base().talentreq != 'undefined') {
				var found = false;
				for (var j = 0; j < this.items.length; j++) {
					if (this.items[j].base().id == current.base().talentreq) {
						current.setReq(this.items[j]);
						this.items[j].addRef(current);
						found = true;
						break;
					}
				}
				if (!found) {
					throw new Error("Illegal talents data");
				}
			}
		}
	};
	this.mapRanks = function() {
		for (var i = 0; i < this.talents_data.length; i++) {
			var current = this.talents_data[i];
			if (typeof current.rankof != 'undefined') {
				var found = false;
				for(var j = 0; j < this.items.length; j++) {
					if (this.items[j].base().id == current.rankof) {
						this.items[j].addRank(current);
						found = true;
						break;
					}
				}
				if (!found) {
					throw new Error("Illegal talents data");
				}
			}
		}
	};
	this.assignPowerToTalents = function() {
		var power = 1;
		for (var i = 0; i < this.talents_data.length; i++) {
			this.talents_data[i].power = power;
			power *= 2;
		}
	};
	this.getPowerSum = function() {
		if (typeof this.talents_data[0].power == 'undefined') {
			throw new Error("Assign power to talents first");
		}
		var powersum = 0;
		for (var i = 0; i < this.talents_data.length; i++) {
			if (this.talents_data[i].status == TALENT_LEARNED) {
				powersum += this.talents_data[i].power;
			}
		}
		return powersum;
	};
	this.getTalentString = function() {
		var powersum = this.getPowerSum();
		var modulo;
		var code = "";
		do {
			modulo = powersum % 33;
			powersum = (powersum - modulo) / 33;
			if (modulo >= 10) {
				code += String.fromCharCode(modulo+87);
			} else {
				code += modulo;
			}
		} while(powersum > 0);
		return code;
	};
	this.parseTalentString = function(input) {
		var powersum = 0;
		var power = 1;
		var chr;
		var i = 0;
		while (i < input.length) {
			chr = input.charCodeAt(i);
			if (chr >= 97 && chr <= 122) {
				powersum += (chr - 87) * power;
			} else if (chr >= 48 && chr <= 57) {
				powersum += (chr - 48) * power;
			} else {
				console.log("unexpected character: " + chr);
			}
			power *= 33;
			i ++;
		}
		return powersum;
	};
	this.learnTalentsFromString = function(input) {
		var powersum = this.parseTalentString(input);
		var i;
		if (powersum >= this.talents_data[this.talents_data.length-1].power * 2) {
			powersum = 0;
		}
		for (i = this.talents_data.length - 1; i >= 0; i--) {
			var talent = this.talents_data[i];
			if (talent.power <= powersum) {
				talent.status = TALENT_LEARNED;
				powersum -= talent.power;
			}
		}
	};
	this.getSpentTalentPoints = function() {
		var count = 0;
		for (var i = 0; i < this.talents_data.length; i++) {
			if (typeof this.talents_data[i].cost != 'undefined') {
				if (this.talents_data[i].status == TALENT_LEARNED) {
					count += this.talents_data[i].cost;
				}
			}
		}
		return count;
	};
	this.getRequiredLevel = function() {
		var maxLevel;
		var spentPoints = this.getSpentTalentPoints();
		if (spentPoints == 0) {
			maxLevel = 1;
		} else if (spentPoints <= 4) {
			maxLevel = spentPoints;
		} else {
			maxLevel = Math.ceil((spentPoints - 4) / 3) + 4;
		}
		var i;
		for(var i = 0; i < this.talents_data.length; i++) {
			if (this.talents_data[i].lvlreq > maxLevel) {
				if (this.talents_data[i].status == TALENT_LEARNED) {
					maxLevel = this.talents_data[i].lvlreq;
				}
			}
		}
		return maxLevel;
	};
	this.getAvailableTalentPoints = function() {
		var expectedLevel = this.getRequiredLevel();
		var totalTalentPoints;
		if (expectedLevel < 5) {
			totalTalentPoints = expectedLevel;
		} else {
			totalTalentPoints = (expectedLevel - 4) * 3 + 4;
		}
		return totalTalentPoints - this.getSpentTalentPoints();
	};
};