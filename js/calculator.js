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
			if (this.reqs[i].base().status == TALENT_NOT_LEARNED) {
				return false;
			}
		}
		if (this.reqs.length > 0) {
			for (var i = 0; i < this.reqs[0].refs.length; i++) {
				if (this.reqs[0].refs[i].base().status == TALENT_LEARNED) {
					return false;
				}
			}
		}
		var i = 0;
		while(i < this.ranks.length) {
			if (this.ranks[i].status == TALENT_NOT_LEARNED) {
				return true;
			}
			i++;
		}
		return false;
	}
	this.canUnlearn = function() {
		if (this.ranks.length > 1) {
			var i = this.ranks.length - 1;
			while (i >= 1) {
				if (this.ranks[i].status == TALENT_LEARNED) {
					return true;
				}
				i--;
			}
		}
		if (this.ranks[0].status == TALENT_NOT_LEARNED) {
			return false;
		}
		for(var i = 0; i < this.refs.length; i++) {
			if (this.refs[i].base().status == TALENT_LEARNED) {
				return false;
			}
		}
		return true;
	}
	this.getLearnedCount = function() {
		var i = 0;
		while (i < this.ranks.length) {
			if (this.ranks[i].status == TALENT_LEARNED) {
				i++;
			} else {
				break;
			}
		}
		return i;
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
		this.x = margin + padding + rowHeaderWidth + (padding + ITEM_BOX_SIZE) * (this.base().column) + padding;
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
		var IMPOSSIBLE_LEVEL = 99;
		var threshold = 0;
		if (this.items.length == 0) {
			throw new Error("Talent data is empty");
		}
		var found = true;
		while(found) {
			found = false;
			var min_level_req = IMPOSSIBLE_LEVEL;
			for (var i = 0; i < this.items.length; i++) {
				if (typeof this.items[i].base().lvlreq == 'undefined') {
					continue;
				}
				var currentLvlReq = this.items[i].base().lvlreq;
				if (currentLvlReq > threshold) {
					if (min_level_req > this.items[i].base().lvlreq) {
						min_level_req = this.items[i].base().lvlreq;
						found = true;
					}
				}
			}
			if (found) {
				threshold = min_level_req;
				this.heightmap.push(min_level_req);
			}
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
		this.rowHeaderWidth = rowHeaderWidth;
		this.totalHeight = (margin + padding + itemSize + padding) * this.heightmap.length + margin;
		this.totalWidth = margin + padding + rowHeaderWidth + (padding + itemSize) * (this.width + 1) + margin;
		
		for (var i = 0; i < this.heightmap.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin,
				width: this.totalWidth - margin * 2,
				height: ITEM_BOX_SIZE + padding * 2,
				level: this.heightmap[i],
				items: []
			};
			for (var j = 0; j < this.items.length; j++) {
				if (this.items[j].base().lvlreq == this.heightmap[i]) {
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
		for(var i = 0; i < this.talents_data.length; i++) {
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

function Controller(calculator, ctx, atlasActive, atlasInactive) {
	this.ctx = ctx;
	
	this.drawBackground = function() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, calculator.totalWidth, calculator.totalHeight);
		ctx.fillStyle = "#1f1f1f";
		for (var i = 0; i < calculator.rows.length; i++) {
			var row = calculator.rows[i];
			ctx.fillRect(row.x, row.y, row.width, row.height);
		}
	}
	this.drawRowHeader = function(row, bright) {
		ctx.fillStyle = "#1f1f1f";
		ctx.fillRect(row.x, row.y, calculator.rowHeaderWidth, row.height);
		ctx.font = "1.1em Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		if (bright) {
			ctx.fillStyle = "#e7a516";
			ctx.fillText("Ур." + row.level, row.x, row.y + ITEM_BOX_SIZE);
		} else {
			ctx.fillStyle = "#939393";
			ctx.fillText("Ур." + row.level, row.x, row.y + ITEM_BOX_SIZE);
		}
	}
	this.markRows = function() {
		for (var i = 0; i < calculator.rows.length; i ++) {
			this.drawRowHeader(calculator.rows[i], false);
		}
	}
	this.drawReqToRefLinks = function() {
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			var links = item.getReqToRefLinks();
			ctx.strokeStyle = "white";
			for (var j = 0; j < links.length; j++) {
				ctx.beginPath();
				ctx.moveTo(links[j].x1,links[j].y1);
				ctx.lineTo(links[j].x2,links[j].y2);
				ctx.stroke();
			}
		}
	}
	this.drawTalents = function() {
		for (var i = 0; i < calculator.items.length; i ++) {
			this.blitItem(calculator.items[i]);
		}
	}
	this.blitItem = function(item) {
		ctx.fillStyle="red";
		if (item.base().status == TALENT_LEARNED) {
			ctx.drawImage(atlasActive, item.imageBoundsX, item.imageBoundsY, ITEM_BOX_SIZE, ITEM_BOX_SIZE,
			item.x, item.y, ITEM_BOX_SIZE, ITEM_BOX_SIZE);
		} else {
			ctx.drawImage(atlasInactive, item.imageBoundsX, item.imageBoundsY, ITEM_BOX_SIZE, ITEM_BOX_SIZE,
			item.x, item.y, ITEM_BOX_SIZE, ITEM_BOX_SIZE);
			if (!item.canLearn()) {
				ctx.globalAlpha = 0.3;
				ctx.fillRect(item.x, item.y, ITEM_BOX_SIZE, ITEM_BOX_SIZE);
				ctx.globalAlpha = 1;
			}
		}
		if (item.ranks.length > 1) {
			ctx.fillText(item.getLearnedCount() + "/" + item.ranks.length, item.x, item.y + ITEM_BOX_SIZE);
		}
	}
	this.getItem = function(x, y) {
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			if (x > item.x && x < item.x + ITEM_BOX_SIZE &&
				y > item.y && y < item.y + ITEM_BOX_SIZE) {
				return item;
			}
		}
		return {};
	}
	this.handleClick = function(x, y) {
		var item = this.getItem(x,y);
		if (!isEmpty(item)) {
			if (item.canLearn()){
				item.learn();
			} else {
				while (item.canUnlearn()) {
					item.unlearn();
				}
			}
			for (var i = 0; i < item.refs.length; i++) {
				this.blitItem(item.refs[i]);
			}
			if (item.reqs.length > 0) {
				for (var i = 0; i < item.reqs[0].refs.length; i++) {
					this.blitItem(item.reqs[0].refs[i]);
				}
			}
			this.blitItem(item);
		}
	}
	this.handleMouseMove = function(x, y) {
		for (var i = 0; i < calculator.rows.length; i++) {
			var row = calculator.rows[i];
			if (x > row.x && x < row.x + row.width &&
				y > row.y && y < row.y + row.height) {
				this.drawRowHeader(row, true);
			} else {
				this.drawRowHeader(row, false);
			}
		}
	}
}

function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}
// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}