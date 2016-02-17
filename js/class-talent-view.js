function ClassTalentView(locale, classData, atlasActive, atlasInactive, calculator, getContextFunction) {
	if (typeof locale == "undefined") {
		throw new Error("Locale was not defined");
	}
	if (typeof classData == "undefined") {
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
	this.calculator = calculator;
	this.heightMap = [];
	this.recentItem;//= 'undefined'
	this.totalWidth = 0;
	this.totalHeight = 0;
	this.resizeTo = function(width) {
		//Do nothing since this is fullscreen mode
	}
	this.fillHeightMap = function() {
		var result = [];
		var IMPOSSIBLE_LEVEL = 99;
		var threshold = 0;
		if (this.calculator.items.length == 0) {
			throw new Error("Talent data is empty");
		}
		var found = true;
		while(found) {
			found = false;
			var min_level_req = IMPOSSIBLE_LEVEL;
			for (var i = 0; i < this.calculator.items.length; i++) {
				if (typeof this.calculator.items[i].base().lvlreq == 'undefined') {
					continue;
				}
				var currentLvlReq = this.calculator.items[i].base().lvlreq;
				if (currentLvlReq > threshold) {
					if (min_level_req > this.calculator.items[i].base().lvlreq) {
						min_level_req = this.calculator.items[i].base().lvlreq;
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
	this.arrangeRows = function(margin, padding, itemSize, rowHeaderWidth) {
		this.padding = padding;
		this.rowHeaderWidth = rowHeaderWidth;
		this.totalHeight = (margin + padding + itemSize + padding) * this.heightMap.length + margin;
		this.totalWidth = margin + padding + rowHeaderWidth + (padding + itemSize) * (this.calculator.width + 1) + margin;
		
		this.rows = [];
		for (var i = 0; i < this.heightMap.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin,
				width: this.totalWidth - margin * 2,
				height: DEST_BOX_SIZE + padding * 2,
				level: this.heightMap[i],
				items: []
			};
			for (var j = 0; j < this.calculator.items.length; j++) {
				if (this.calculator.items[j].base().lvlreq == this.heightMap[i]) {
					this.calculatePaintPosition(this.calculator.items[j], margin, padding, row.y, rowHeaderWidth);
					row.items.push(this.calculator.items[j]);
				}
			}
			this.rows.push(row);
		}
	};
	this.calculatePaintPosition = function(item, margin, padding, rowY, rowHeaderWidth) {
		item.x = margin + padding + rowHeaderWidth + (padding + DEST_BOX_SIZE) * (item.base().column) + padding;
		item.y = rowY + padding;
	};
	this.calculator.init(classData);
	this.heightMap = this.fillHeightMap();
	this.ctx = getContextFunction("as");
	this.arrangeRows(5,3,35,50);
	
	this.displayLayout = function(){
		this.drawBackground();
		this.markRows();
		this.drawReqToRefLinks();
		this.drawTalents();
	};
	this.drawBackground = function() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0, 0, this.totalWidth, this.totalHeight);
		this.ctx.fillStyle = "#1f1f1f";
		for (var i = 0; i < this.rows.length; i++) {
			var row = this.rows[i];
			this.ctx.fillRect(row.x, row.y, row.width, row.height);
		}
	};
	this.drawRowHeader = function(row, bright) {
		this.ctx.fillStyle = "#1f1f1f";
		this.ctx.fillRect(row.x, row.y, this.rowHeaderWidth, row.height);
		this.ctx.font = "1.1em Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		var rowHeaderText = "";
		if (this.locale == "en") {
			rowHeaderText = "Lvl" + row.level;
		} else {
			rowHeaderText = "Ур." + row.level;
		}
		if (bright) {
			this.ctx.fillStyle = "#e7a516";
			this.ctx.fillText(rowHeaderText, row.x, row.y + DEST_BOX_SIZE);
		} else {
			this.ctx.fillStyle = "#939393";
			this.ctx.fillText(rowHeaderText, row.x, row.y + DEST_BOX_SIZE);
		}
	};
	this.markRows = function() {
		for (var i = 0; i < this.rows.length; i ++) {
			this.drawRowHeader(this.rows[i], false);
		}
	};
	this.drawReqToRefLinks = function() {
		for (var i = 0; i < this.calculator.items.length; i++) {
			var item = this.calculator.items[i];
			var links = this.getReqToRefLinks(item);
			this.ctx.strokeStyle = "white";
			for (var j = 0; j < links.length; j++) {
				this.ctx.beginPath();
				this.ctx.moveTo(links[j].x1,links[j].y1);
				this.ctx.lineTo(links[j].x2,links[j].y2);
				this.ctx.stroke();
				this.ctx.closePath();
			}
		}
	};
	this.getReqToRefLinks = function(item) {
		if (typeof item.x == 'undefined' || typeof item.y == 'undefined') {
			throw new Error("Coordinates was not calculated");
		}
		var ret = [];
		for(var i = 0; i < item.refs.length; i++) {
			ret.push({
				x1:item.x + ~~(DEST_BOX_SIZE / 2),
				y1:item.y + DEST_BOX_SIZE,
				x2:item.refs[i].x + ~~(DEST_BOX_SIZE / 2),
				y2:item.refs[i].y
			});
		}
		return ret;
	}
	this.drawTalents = function() {
		for (var i = 0; i < this.calculator.items.length; i ++) {
			this.blitItem(this.calculator.items[i], false);
		}
	};
	this.blitItem = function(item, hover) {
		if (hover) {
			this.ctx.fillStyle = "#e7a516";
		} else if (item.base().AP_cost > 0) {
			this.ctx.fillStyle = "green";
		} else {
			this.ctx.fillStyle = "black";
		}
		this.ctx.fillRect(item.x - 1, item.y - 1, DEST_BOX_SIZE + 2, DEST_BOX_SIZE + 2);
		if (item.base().status == TALENT_LEARNED) {
			this.ctx.drawImage(this.atlasActive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
		} else {
			this.ctx.drawImage(this.atlasInactive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
			if (!item.canLearn()) {
				this.ctx.fillStyle = "red";
				this.ctx.globalAlpha = 0.3;
				this.ctx.fillRect(item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
				this.ctx.globalAlpha = 1;
			}
		}
		if (item.ranks.length > 1) {
			this.ctx.fillStyle = "red";
			this.ctx.fillText(item.getLearnedCount() + "/" + item.ranks.length, item.x, item.y + DEST_BOX_SIZE);
		}
	};
	this.getItem = function(x, y) {
		for (var i = 0; i < this.calculator.items.length; i++) {
			var item = this.calculator.items[i];
			if (this.isCoordsOfItem(item, x, y)) {
				return item;
			}
		}
		return {};
	};
	this.isCoordsOfItem = function (item, x, y) {
		return x > item.x && x < item.x + DEST_BOX_SIZE &&
				y > item.y && y < item.y + DEST_BOX_SIZE;
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
		for (var i = 0; i < this.calculator.items.length; i++) {
			var item = this.calculator.items[i];
			if (this.isCoordsOfItem(item, x, y)) {
				if (item != this.recentItem) {
					if (typeof this.recentItem != 'undefined') {
						this.blitItem(this.recentItem, false);
					}
					this.blitItem(item, true);
					this.recentItem = item;
				}
			}
		}
		for (var i = 0; i < this.rows.length; i++) {
			var row = this.rows[i];
			if (x > row.x && x < row.x + row.width &&
				y > row.y && y < row.y + row.height) {
				this.drawRowHeader(row, true);
			} else {
				this.drawRowHeader(row, false);
			}
		}
	};
};