var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
var ITEM_BOX_SIZE = 35;

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
	this.reqs = [];
	this.refs = [];
	this.ranks = [];
	if (typeof talent.imageid != 'undefined') {
		this.imageBoundsX = (talent.imageid % 20) * ITEM_BOX_SIZE;
		this.imageBoundsY = (~~(talent.imageid / 20)) * ITEM_BOX_SIZE; 
	} else {
		this.imageBoundsX = (talent.id % 20) * ITEM_BOX_SIZE;
		this.imageBoundsY = (~~(talent.id / 20)) * ITEM_BOX_SIZE; 
	}
	this.addReq = function(talent) {
		this.reqs.push(talent);
	}
	this.addRef = function(talent) {
		this.refs.push(talent);
	}
	this.base = function() {
		return this.ranks[0];
	}
	this.addRank = function(talent) {
		if (this.ranks.length == 0) {
			talent.status = TALENT_NOT_LEARNED;
			this.ranks.push(talent);
		} else {
			var i = 0;
			var left = talent.id;
			while(i < this.ranks.length) {
			var right = this.ranks[i].id;
				if (talent.id < this.ranks[i].id) {
					break;
				} else {
					i++;
				}
			}
			talent.status = TALENT_NOT_LEARNED;
			this.ranks.splice(i,0,talent);
		}
	}
	this.canLearn = function() {
		for(var i = 0; i < this.reqs.length; i++) {
			if (this.reqs[i].ranks[0].status == TALENT_NOT_LEARNED) {
				return false;
			}
		}
		return true;
	}
	this.canUnlearn = function() {
		for(var i = 0; i < this.refs.length; i++) {
			if (this.refs[i].ranks[0].status == TALENT_LEARNED) {
				return false;
			}
		}
		return true;
	}
	this.learn = function() {
		if (this.canLearn()) {
			var i = 0;
			while(i < this.ranks.length) {
				if (this.ranks[i].status == TALENT_LEARNED) {
					i++;
				} else {
					break;
				}
			}
			this.ranks[i].status = TALENT_LEARNED;
		} else {
			throw new Error("Talent can not be learned.");
		}
	}
	this.unlearn = function() {
		if (this.canUnlearn()) {
			var i = 0;
			while(i < this.ranks.length) {
				if (this.ranks[i].status == TALENT_LEARNED) {
					i++;
				} else {
					break;
				}
			}
			this.ranks[i-1].status = TALENT_NOT_LEARNED;
		} else {
			throw new Error("Talent can not be unlearned.");
		}
	}
	this.calculatePaintPosition = function(margin, padding, rowY, rowHeaderWidth)  {
		this.x = margin + padding + rowHeaderWidth + (padding + ITEM_BOX_SIZE) * (this.base().column - 1) + padding;
		this.y = rowY + padding;
	};
	this.isUsable = function() {
		return typeof talent.AP_cost != 'undefined';
	};
	this.getReqToRefLinks = function() {
		if (typeof this.x == 'undefined' || typeof this.y == 'undefined') {
			throw new Error("Coordinates was not calculated");
		}
		var ret = [];
		for(var i = 0; i < this.refs.length; i++) {
			ret.push({
				x1:this.x + ~~(ITEM_BOX_SIZE / 2),
				y1:this.y + ITEM_BOX_SIZE,
				x2:this.refs[i].x + ~~(ITEM_BOX_SIZE / 2),
				y2:this.refs[i].y
			});
		}
		return ret;
	}
	this.addRank(talent);
}

function Calculator (input) {
	if (typeof input.prefix == 'undefined') {
		throw new Error("Illegal class data. Class prefix not defined");
	}
	if (typeof input.talents == 'undefined') {
		throw new Error("Illegal class data. Talents data not defined");
	}
	this.talents_data = input.talents;
	this.prefix = input.prefix;
	this.width = 0;
	this.items = [];
	this.rows = [];
	this.heightmap = [];
	
	for (var i = 0; i < this.talents_data.length; i++) {
		if (typeof this.talents_data[i].rankof != 'undefined') {
			continue;
		}
		this.items.push(new CalculatorItem(this.talents_data[i]));
	}
	
	this.calculateWidth = function() {
		var max_column = 0;
		for (var i = 0; i < this.talents_data.length; i++) {
			var current = this.talents_data[i];
			if (current.column > max_column) {
				max_column = current.column;
			}
		}
		this.width = max_column;
	}
	this.fillHeightMap = function() {
		var threshold = 0;
		if (this.items.length == 0) {
			throw new Error("Talent data is empty");
		}
		for (var j = 0; j < this.items.length; j++) {
			var min_level_req = 99;
			for (var i = 0; i < this.items.length; i++) {
				if (typeof this.items[i].base().lvlreq == 'undefined') {
					continue;
				}
				if (this.items[i].base().lvlreq < threshold) {
					continue;
				}
				if (min_level_req > this.items[i].base().lvlreq) {
					min_level_req = this.items[i].base().lvlreq;
				}
			}
			threshold = min_level_req;
			this.heightmap.push(min_level_req);
		}
	}
	this.mapRefsReqs = function() {
		for (var i = 0; i < this.items.length; i++) {
			var current = this.items[i];
			if (typeof current.base().talentreq != 'undefined') {
				var found = false;
				for (var j = 0; j < this.items.length; j++) {
					if (this.items[j].base().id == current.base().talentreq) {
						current.addReq(this.items[j]);
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
	}
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
	}
	this.arrangeRows = function(margin, padding, itemSize, rowHeaderWidth) {
		var totalHeight = (margin + padding + itemSize + padding) * this.heightmap.length + margin;
		
		for (var i = 0; i < this.heightmap.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin
			};
			for (var j = 0; j < this.items.length; j++) {
				if (this.items[j].talent.lvlreq == this.heightmap[i]) {
					this.items[j].calculatePaintPosition(margin, padding, row.y, rowHeaderWidth);
					row.items.push(this.items[j]);
				}
			}
			this.rows.push(row);
		}
	}
	this.assignPowerToTalents = function() {
		var power = 1;
		for (var i = 0; i < this.talents_data.length; i++) {
			this.talents_data[i].power = power;
			power *= 2;
		}
	}
	
	this.getPowerSum = function() {
		var powersum = 0;
		for (var i = 0; i < this.talents_data.length; i++) {
			if (this.talents_data[i].status == TALENT_LEARNED) {
				powersum += this.talents_data[i].power;
			}
		}
		return powersum;
	}
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
	}
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
	}
	this.learnTalentsFromString = function(input) {
		var powersum = parseTalentString(input);
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
	}
	this.getSpentTalentPoints = function() {
		var count = 0;
		for (var i = 0; i < this.talents_data; i++) {
			if (typeof this.talents_data[i].cost != 'undefined') {
				count += this.talents[i].cost;
			}
		}
		return count;
	}
	this.getRequiredLevel = function() {
		var maxLevel;
		var spentPoints = this.getSpentTalentPoints();
		if (spentPoints == 0) {
			maxLevel = 1;
		}
		if (spentPoints <= 4) {
			maxLevel = spentPoints;
		} else {
			maxLevel = Math.ceil((spentPoints - 4) / 3) + 4;
		}
		var i;
		for(var i = 0; i < this.talents.length; i++) {
			if (this.talents_data[i].lvlreq > maxLevel) {
				maxLevel = this.talents_data[i].lvlreq;
			}
		}
		return maxLevel;
	}
	this.getAvailableTalentPoints = function() {
		var expectedLevel = this.getRequiredLevel();
		var totalTalentPoints;
		if (expectedLevel < 5) {
			totalTalentPoints = expectedLevel;
		} else {
			totalTalentPoints = (expectedLevel - 4) * 3 + 4;
		}
		return totalTalentPoints - this.getSpentTalentPoints();
	}
};
