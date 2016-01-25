var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
var DEST_BOX_SIZE = 35;
var SOURCE_BOX_SIZE = 48;

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
		this.imageBoundsX = (talent.imageid % 20) * SOURCE_BOX_SIZE;
		this.imageBoundsY = (~~(talent.imageid / 20)) * SOURCE_BOX_SIZE; 
	} else {
		this.imageBoundsX = (talent.id % 20) * SOURCE_BOX_SIZE;
		this.imageBoundsY = (~~(talent.id / 20)) * SOURCE_BOX_SIZE; 
	}
	this.addReq = function(talent) {
		this.reqs.push(talent);
	};
	this.addRef = function(talent) {
		this.refs.push(talent);
	};
	this.base = function() {
		return this.ranks[0];
	};
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
	};
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
	};
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
	};
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
	};
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
	};
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
	};
	this.calculatePaintPosition = function(margin, padding, rowY, rowHeaderWidth)  {
		this.x = margin + padding + rowHeaderWidth + (padding + DEST_BOX_SIZE) * (this.base().column) + padding;
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
				x1:this.x + ~~(DEST_BOX_SIZE / 2),
				y1:this.y + DEST_BOX_SIZE,
				x2:this.refs[i].x + ~~(DEST_BOX_SIZE / 2),
				y2:this.refs[i].y
			});
		}
		return ret;
	};
	this.isInBox = function(x, y) {
		return x > this.x && x < this.x + DEST_BOX_SIZE &&
				y > this.y && y < this.y + DEST_BOX_SIZE;
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
			if (typeof this.talents_data[i].rankof != 'undefined') {
				continue;
			}
			this.items.push(new CalculatorItem(this.talents_data[i]));
		}
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
	};
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
function TalentView(locale, data, atlasActive, atlasInactive, getContextFunction) {
	if (typeof locale == "undefined") {
		throw new Error("Locale was not defined");
	}
	if (typeof data == "undefined") {
		throw new Error("Talent data was not defined");
	}
	if (typeof atlasActive == "undefined") {
		throw new Error("Atlas of active talents was not defined");
	}
	if (typeof atlasInactive == "undefined") {
		throw new Error("Atlas of active talents was not defined");
	}
	if (typeof getContextFunction == "undefined") {
		throw new Error("Get context function was not defined");
	}
	this.locale = locale;
	this.applyLocale = function(locale) {
		this.locale = locale;
		this.displayLayout();
	};
	this.atlasActive = atlasActive;
	this.atlasInactive = atlasInactive;
	this.patchdata = data;
	this.atlasActive;
	this.atlasInactive;
	this.recentItem;
	this.activeClassPrefix = "as";
	this.classes = {
		"as": {
			calculator: new Calculator(),
			heightMap: [],
			ctx: {}
		},
		"ju": {
			calculator: new Calculator(),
			heightMap: [],
			ctx: {}
		},
		"sc": {
			calculator: new Calculator(),
			heightMap: [],
			ctx: {}
		},
		"su": {
			calculator: new Calculator(),
			heightMap: [],
			ctx: {}
		}
	};
	this.fillHeightMap = function(calculator) {
		var result = [];
		var IMPOSSIBLE_LEVEL = 99;
		var threshold = 0;
		if (calculator.items.length == 0) {
			throw new Error("Talent data is empty");
		}
		var found = true;
		while(found) {
			found = false;
			var min_level_req = IMPOSSIBLE_LEVEL;
			for (var i = 0; i < calculator.items.length; i++) {
				if (typeof calculator.items[i].base().lvlreq == 'undefined') {
					continue;
				}
				var currentLvlReq = calculator.items[i].base().lvlreq;
				if (currentLvlReq > threshold) {
					if (min_level_req > calculator.items[i].base().lvlreq) {
						min_level_req = calculator.items[i].base().lvlreq;
						found = true;
					}
				}
			}
			if (found) {
				threshold = min_level_req;
				result.push(min_level_req);
			}
		}
		return result;
	};
	this.setActiveClass = function(classPrefix) {
		this.activeClass = this.classes[classPrefix];
	};
	this.arrangeRows = function(margin, padding, itemSize, rowHeaderWidth, playerClass) {
		playerClass.padding = padding;
		playerClass.rowHeaderWidth = rowHeaderWidth;
		playerClass.totalHeight = (margin + padding + itemSize + padding) * playerClass.heightMap.length + margin;
		playerClass.totalWidth = margin + padding + rowHeaderWidth + (padding + itemSize) * (playerClass.calculator.width + 1) + margin;
		
		playerClass.rows = [];
		for (var i = 0; i < playerClass.heightMap.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin,
				width: playerClass.totalWidth - margin * 2,
				height: DEST_BOX_SIZE + padding * 2,
				level: playerClass.heightMap[i],
				items: []
			};
			for (var j = 0; j < playerClass.calculator.items.length; j++) {
				if (playerClass.calculator.items[j].base().lvlreq == playerClass.heightMap[i]) {
					playerClass.calculator.items[j].calculatePaintPosition(margin, padding, row.y, rowHeaderWidth);
					row.items.push(playerClass.calculator.items[j]);
				}
			}
			playerClass.rows.push(row);
		}
	};
	this.classes["as"].calculator.init(this.patchdata.assault_data);
	this.classes["as"].heightMap = this.fillHeightMap(this.classes["as"].calculator);
	this.classes["as"].ctx = getContextFunction("as");
	this.arrangeRows(5,3,35,50, this.classes["as"]);
	this.classes["ju"].calculator.init(this.patchdata.juggernaut_data);
	this.classes["ju"].heightMap = this.fillHeightMap(this.classes["ju"].calculator);
	this.classes["ju"].ctx = getContextFunction("ju");
	this.arrangeRows(5,3,35,50, this.classes["ju"]);
	this.classes["sc"].calculator.init(this.patchdata.scout_data);
	this.classes["sc"].heightMap = this.fillHeightMap(this.classes["sc"].calculator);
	this.classes["sc"].ctx = getContextFunction("sc");
	this.arrangeRows(5,3,35,50, this.classes["sc"]);
	this.classes["su"].calculator.init(this.patchdata.support_data);
	this.classes["su"].heightMap = this.fillHeightMap(this.classes["su"].calculator);
	this.classes["su"].ctx = getContextFunction("su");
	this.arrangeRows(5,3,35,50, this.classes["su"]);
	this.getActiveClass = function() {
		return this.classes[this.activeClassPrefix];
	}
	this.UriHandlers = {
		"t": {fn: talentUriHandler },
		/*legacy links handler: */
		"talent": { fn: talentUriHandler }
	};
	this.displayLayout = function(){
		this.drawBackground();
		this.markRows();
		this.drawReqToRefLinks();
		this.drawTalents();
	};
	this.drawBackground = function() {
		var ctx = this.classes[this.activeClassPrefix].ctx;
		var rows = this.classes[this.activeClassPrefix].rows;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.classes[this.activeClassPrefix].totalWidth, this.classes[this.activeClassPrefix].totalHeight);
		ctx.fillStyle = "#1f1f1f";
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			ctx.fillRect(row.x, row.y, row.width, row.height);
		}
	};
	this.drawRowHeader = function(row, bright) {
		var ctx = this.classes[this.activeClassPrefix].ctx;
		var calculator = this.classes[this.activeClassPrefix].calculator;
		ctx.fillStyle = "#1f1f1f";
		ctx.fillRect(row.x, row.y, this.rowHeaderWidth, row.height);
		ctx.font = "1.1em Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		var rowHeaderText = "";
		if (this.locale == "en") {
			rowHeaderText = "Lvl" + row.level;
		} else {
			rowHeaderText = "Ур." + row.level;
		}
		if (bright) {
			ctx.fillStyle = "#e7a516";
			ctx.fillText(rowHeaderText, row.x, row.y + DEST_BOX_SIZE);
		} else {
			ctx.fillStyle = "#939393";
			ctx.fillText(rowHeaderText, row.x, row.y + DEST_BOX_SIZE);
		}
	};
	this.markRows = function() {
		var rows = this.classes[this.activeClassPrefix].rows;
		for (var i = 0; i < rows.length; i ++) {
			this.drawRowHeader(rows[i], false);
		}
	};
	this.drawReqToRefLinks = function() {
		var ctx = this.classes[this.activeClassPrefix].ctx;
		var calculator = this.classes[this.activeClassPrefix].calculator;
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			var links = item.getReqToRefLinks();
			ctx.strokeStyle = "white";
			for (var j = 0; j < links.length; j++) {
				ctx.beginPath();
				ctx.moveTo(links[j].x1,links[j].y1);
				ctx.lineTo(links[j].x2,links[j].y2);
				ctx.stroke();
				ctx.closePath();
			}
		}
	};
	this.drawTalents = function() {
		var calculator = this.classes[this.activeClassPrefix].calculator;
		for (var i = 0; i < calculator.items.length; i ++) {
			this.blitItem(calculator.items[i], false);
		}
	};
	this.blitItem = function(item, hover) {
		var ctx = this.classes[this.activeClassPrefix].ctx;
		if (hover) {
			ctx.fillStyle = "#e7a516";
		} else if (item.base().AP_cost > 0) {
			ctx.fillStyle = "green";
		} else {
			ctx.fillStyle = "black";
		}
		ctx.fillRect(item.x - 1, item.y - 1, DEST_BOX_SIZE + 2, DEST_BOX_SIZE + 2);
		if (item.base().status == TALENT_LEARNED) {
			ctx.drawImage(this.atlasActive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
		} else {
			ctx.drawImage(this.atlasInactive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
			if (!item.canLearn()) {
				ctx.fillStyle = "red";
				ctx.globalAlpha = 0.3;
				ctx.fillRect(item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
				ctx.globalAlpha = 1;
			}
		}
		if (item.ranks.length > 1) {
			ctx.fillStyle = "red";
			ctx.fillText(item.getLearnedCount() + "/" + item.ranks.length, item.x, item.y + DEST_BOX_SIZE);
		}
	};
	this.getItem = function(x, y) {
		var calculator = this.classes[this.activeClassPrefix].calculator;
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			if (item.isInBox(x, y)) {
				return item;
			}
		}
		return {};
	};
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
				this.blitItem(item.refs[i], false);
			}
			if (item.reqs.length > 0) {
				for (var i = 0; i < item.reqs[0].refs.length; i++) {
					this.blitItem(item.reqs[0].refs[i], false);
				}
			}
			this.blitItem(item, false);
		}
	};
	this.handleMouseMove = function(x, y) {
		var calculator = this.classes[this.activeClassPrefix].calculator;
		var rows = this.classes[this.activeClassPrefix].rows;
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			if (item.isInBox(x,y)) {
				if (item != this.recentItem) {
					if (typeof this.recentItem != 'undefined') {
						this.blitItem(this.recentItem, false);
					}
					this.blitItem(item, true);
					this.recentItem = item;
				}
			}
		}
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (x > row.x && x < row.x + row.width &&
				y > row.y && y < row.y + row.height) {
				this.drawRowHeader(row, true);
			} else {
				this.drawRowHeader(row, false);
			}
		}
	};
}
// function TalentSmallView(locale) {
	// if (typeof locale == "undefined") {
		// throw new Error("Locale was not defined");
	// }
	// this.locale = locale;
	// this.applyLocale = function(locale) {
		// this.locale = locale;
		// this.displayLayout();
	// };
	// this.atlasActive;
	// this.atlasInactive;
	// this.recentItem;
	// this.patchdata = {};
	// this.activeClass = {
		// graphicContext:{}
	// };
	// this.classes = {
		// "as": new Calculator(),
		// "ju": new Calculator(),
		// "sc": new Calculator(),
		// "su": new Calculator()
	// };
	// this.handleImages = function (atlasActive, atlasInactive) {
		// this.atlasActive = atlasActive;
		// this.atlasInactive = atlasInactive;
	// };
	// this.init = function(data) {
		// this.patchdata = data;
		// this.classes["as"].init(this.patchdata.assault_data);
		// this.classes["ju"].init(this.patchdata.juggernaut_data);
		// this.classes["sc"].init(this.patchdata.scout_data);
		// this.classes["su"].init(this.patchdata.support_data);
		// this.activeClass.calculator = this.classes[this.activeClass.prefix];
	// };
	// this.UriHandlers = {
		// "t": {fn: talentUriHandler },
		// /*legacy links handler: */
		// "talent": { fn: talentUriHandler }
	// };
	// this.setActiveClass = function(ctx, classPrefix) {
		// this.activeClass = {
			// prefix : classPrefix,
			// graphicContext : ctx,
			// calculator : this.classes[classPrefix]
		// }
	// };
	// this.displayLayout = function() {
		// this.drawBackground();
		// this.markRows();
		// this.drawTalents();
	// };
	// this.arrangeRows = function(margin, padding, itemSize, rowHeaderWidth) {
		// var calculator = this.activeClass.calculator;
		// this.padding = padding;
		// this.rowHeaderWidth = rowHeaderWidth;
		// this.totalHeight = (margin + padding + itemSize + padding) * calculator.heightMap.length + margin;
		// this.totalWidth = margin + padding + rowHeaderWidth + (padding + itemSize) * (calculator.width + 1) + margin;
		
		
	// }
	// this.drawBackground = function() {
		// var ctx = this.activeClass.graphicContext;
		// var calculator = this.activeClass.calculator;
		// ctx.fillStyle = "black";
		// ctx.fillRect(0, 0, calculator.totalWidth, calculator.totalHeight);
		// ctx.fillStyle = "#1f1f1f"
		// for (var i = 0; i < this.rows.length; i++) {
			// var row = this.rows[i];
			// ctx.fillRect(row.x, row.y, row.width, row.height);
		// }
	// };
// }