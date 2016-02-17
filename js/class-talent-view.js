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
	var thisLocale = locale;
	this.applyLocale = function(locale) {
		thisLocale = locale;
		this.displayLayout();
	};
	var atlasActive = atlasActive;
	var atlasInactive = atlasInactive;
	var calculator = calculator;
	var heightMap = [];
	var rows = [];
	var recentItem = null;
	var totalWidth = 0;
	var totalHeight = 0;
	var rowHeaderWidth = 0;
	
	function fillHeightMap() {
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
	
	function arrangeRows(margin, padding, itemSize, rowHeaderWidth) {
		this.padding = padding;
		this.rowHeaderWidth = rowHeaderWidth;
		totalHeight = (margin + padding + itemSize + padding) * heightMap.length + margin;
		totalWidth = margin + padding + rowHeaderWidth + (padding + itemSize) * (calculator.width + 1) + margin;
		
		rows = [];
		for (var i = 0; i < heightMap.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin,
				width: totalWidth - margin * 2,
				height: DEST_BOX_SIZE + padding * 2,
				level: heightMap[i],
				items: []
			};
			for (var j = 0; j < calculator.items.length; j++) {
				if (calculator.items[j].base().lvlreq == heightMap[i]) {
					calculatePaintPosition(calculator.items[j], margin, padding, row.y, rowHeaderWidth);
					row.items.push(calculator.items[j]);
				}
			}
			rows.push(row);
		}
	};
	
	function calculatePaintPosition(item, margin, padding, rowY, rowHeaderWidth) {
		item.x = margin + padding + rowHeaderWidth + (padding + DEST_BOX_SIZE) * (item.base().column) + padding;
		item.y = rowY + padding;
	};
	
	calculator.init(classData);
	heightMap = fillHeightMap();
	ctx = getContextFunction("as");
	arrangeRows(5,3,35,50);
	
	function drawBackground() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, totalWidth, totalHeight);
		ctx.fillStyle = "#1f1f1f";
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			ctx.fillRect(row.x, row.y, row.width, row.height);
		}
	};
	
	function drawRowHeader(row, bright) {
		ctx.fillStyle = "#1f1f1f";
		ctx.fillRect(row.x, row.y, rowHeaderWidth, row.height);
		ctx.font = "1.1em Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		var rowHeaderText = "";
		if (thisLocale == "en") {
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
	
	function markRows() {
		for (var i = 0; i < rows.length; i ++) {
			drawRowHeader(rows[i], false);
		}
	};
	
	function getReqToRefLinks(item) {
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
	
	function drawReqToRefLinks() {
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			var links = getReqToRefLinks(item);
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
	
	function blitItem(item, hover) {
		if (hover) {
			ctx.fillStyle = "#e7a516";
		} else if (item.base().AP_cost > 0) {
			ctx.fillStyle = "green";
		} else {
			ctx.fillStyle = "black";
		}
		ctx.fillRect(item.x - 1, item.y - 1, DEST_BOX_SIZE + 2, DEST_BOX_SIZE + 2);
		if (item.base().status == TALENT_LEARNED) {
			ctx.drawImage(atlasActive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, DEST_BOX_SIZE, DEST_BOX_SIZE);
		} else {
			ctx.drawImage(atlasInactive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
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
	
	function drawTalents() {
		for (var i = 0; i < calculator.items.length; i ++) {
			blitItem(calculator.items[i], false);
		}
	};
	
	function isCoordsOfItem(item, x, y) {
		return x > item.x && x < item.x + DEST_BOX_SIZE &&
				y > item.y && y < item.y + DEST_BOX_SIZE;
	};
	
	function getItem(x, y) {
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			if (isCoordsOfItem(item, x, y)) {
				return item;
			}
		}
		return {};
	};
	
	this.getCalculator = function() {
		return calculator;
	};
	this.getTotalWidth = function() {
		return totalWidth;
	};
	this.getTotalHeight = function() {
		return totalHeight;
	};
	
	this.displayLayout = function(){
		drawBackground();
		markRows();
		drawReqToRefLinks();
		drawTalents();
	};
	
	this.handleClick = function(x, y) {
		var item = getItem(x,y);
		if (!isEmpty(item)) {
			if (item.canLearn()){
				item.learn();
			} else {
				while (item.canUnlearn()) {
					item.unlearn();
				}
			}
			for (var i = 0; i < item.refs.length; i++) {
				blitItem(item.refs[i], false);
			}
			if (item.reqs.length > 0) {
				for (var i = 0; i < item.reqs[0].refs.length; i++) {
					blitItem(item.reqs[0].refs[i], false);
				}
			}
			blitItem(item, false);
		}
	};
	
	this.handleMouseMove = function(x, y) {
		for (var i = 0; i < calculator.items.length; i++) {
			var item = calculator.items[i];
			if (isCoordsOfItem(item, x, y)) {
				if (item != recentItem) {
					if (recentItem != null) {
						blitItem(recentItem, false);
					}
					blitItem(item, true);
					recentItem = item;
				}
			}
		}
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (x > row.x && x < row.x + row.width &&
				y > row.y && y < row.y + row.height) {
				drawRowHeader(row, true);
			} else {
				drawRowHeader(row, false);
			}
		}
	};
};