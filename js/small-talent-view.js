function CompactClassTalentView(locale, classData, atlasActive, atlasInactive, calculator, getContextFunction, totalWidth) {
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
	var rows = [];
	var recentItem = null;
	var totalWidth = totalWidth;
	var totalHeight = 0;
	var rowHeaderWidth = 0;
	var forks = [];
	var margin = 5;
	var padding = 3;
	var rowHeaderWidth = 30;
	var itemSize = 35;
	var maxWidth = 0;//Quantity of talents
	
	function arrangeRows() {
		var talentSpace = totalWidth - padding * 4 - rowHeaderWidth;
		itemSize = talentSpace / (maxWidth + 1) - margin;
		totalHeight = (margin + padding + itemSize + padding) * forks.length + margin;
		
		rows = [];
		for (var i = 0; i < forks.length; i++) {
			var row = {
				x: margin,
				y: (margin + padding + itemSize + padding) * i + margin,
				width: totalWidth - margin * 2,
				height: itemSize + padding * 2,
				level: forks[i].refs[0].base().lvlreq,
				items: []
			};
			forks[i].x = margin + padding + rowHeaderWidth;
			forks[i].y = row.y + padding;
			var dx = forks[i].x + itemSize + padding;
			for (var j = 0; j < forks[i].refs.length; j++) {
				forks[i].refs[j].x = margin + padding + dx;
				forks[i].refs[j].y = row.y + padding;
				dx += itemSize + padding;
				row.items.push(forks[i].refs[j]);
			}
			rows.push(row);
		}
	};
	
	function findMaxWidth(forks) {
		var maxWidth = 0;
		for (var i = 0; i < forks.length; i++) {
			if (forks[i].refs.length > maxWidth) {
				maxWidth = forks[i].refs.length;
			}
		}
		return maxWidth;
	};
	
	function calculatePaintPosition(item, margin, padding, rowY, rowHeaderWidth) {
		item.x = margin + padding + rowHeaderWidth + (padding + DEST_BOX_SIZE) * (item.base().column) + padding;
		item.y = rowY + padding;
	};
	
	function getForkOptions(){
		var result = [];
		for (var i = 0; i < calculator.items.length; i++) {
			var current = calculator.items[i];
			if (current.refs.length > 1) {
				result.push(current);
			}
		}
		return result.sort(function(l,r) {
			return l.refs[0].base().lvlreq > r.refs[0].base().lvlreq;
		});
	}
	
	calculator.init(classData);
	forks = getForkOptions();
	maxWidth = findMaxWidth(forks);
	ctx = getContextFunction("as");
	arrangeRows();
	
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
		var rowHeaderText = row.level;
		if (bright) {
			ctx.fillStyle = "#e7a516";
			ctx.fillText(rowHeaderText, row.x, row.y + itemSize / 2);
		} else {
			ctx.fillStyle = "#939393";
			ctx.fillText(rowHeaderText, row.x, row.y + itemSize / 2);
		}
	};
	
	function markRows() {
		for (var i = 0; i < rows.length; i ++) {
			drawRowHeader(rows[i], false);
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
		ctx.fillRect(item.x - 1, item.y - 1, itemSize + 2, itemSize + 2);
		if (item.base().status == TALENT_LEARNED) {
			ctx.drawImage(atlasActive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, itemSize, itemSize);
		} else {
			ctx.drawImage(atlasInactive, item.imageBoundsX, item.imageBoundsY, SOURCE_BOX_SIZE, SOURCE_BOX_SIZE,
			item.x, item.y, itemSize, itemSize);
			if (!item.canLearn()) {
				ctx.fillStyle = "red";
				ctx.globalAlpha = 0.3;
				ctx.fillRect(item.x, item.y, itemSize, itemSize);
				ctx.globalAlpha = 1;
			}
		}
		if (item.ranks.length > 1) {
			ctx.fillStyle = "red";
			ctx.fillText(item.getLearnedCount() + "/" + item.ranks.length, item.x, item.y + itemSize);
		}
	};
	
	function drawTalents() {
		for (var i = 0; i < calculator.items.length; i ++) {
			blitItem(calculator.items[i], false);
		}
	};
	
	function isCoordsOfItem(item, x, y) {
		return x > item.x && x < item.x + itemSize &&
				y > item.y && y < item.y + itemSize;
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