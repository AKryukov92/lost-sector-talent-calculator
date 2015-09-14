function CalculatorItem(talent, itemBoxSize) {
	this.talent = talent;
	this.status = 0;
	this.reqs = [];
	this.refs = [];
	if (typeof talent.imageid != 'undefined') {
		this.imageBoundsX = (talent.imageid % 20) * itemBoxSize;
		this.imageBoundsY = (~~(talent.imageid / 20)) * itemBoxSize; 
	} else {
		this.imageBoundsX = (talent.id % 20) * itemBoxSize;
		this.imageBoundsY = (~~(talent.id / 20)) * itemBoxSize; 
	}
	this.addReq = function(item) {
		this.reqs.push(item);
	}
	this.addRef = function(item) {
		this.refs.push(item);
	}
	this.canLearn = function() {
		for(var i = 0; i < required.length; i++) {
			if (required.status == 0) {
				return false;
			}
		}
		return true;
	}
	this.canUnlearn = function() {
		for(var i = 0; i < required.length; i++) {
			if (required.status == 1) {
				return false;
			}
		}
		return true;
	}
}

function Calculator (input) {
	this.talents_data = input;
	this.width = 0;
	this.itemBoxSize = 35;
	this.items = [];
	this.heightmap = [];
	
	for (var i = 0; i < this.talents_data.talents.length; i++) {
		this.items.push(new CalculatorItem(this.talents_data.talents[i]));
	}
	
	this.calculateWidth = function() {
		var max_column = 0;
		for (var i = 0; i < this.talents_data.talents.length; i++) {
			var current = this.talents_data.talents[i];
			if (current.column > max_column) {
				max_column = current.column;
			}
		}
		this.width = max_column;
	}
	this.fillHeightMap = function() {
		var threshold = 0;
		for (var j = 0; j < this.talents_data.talents.length; j++) {
			var min_level_req = 99;
			for (var i = 0; i < this.talents_data.talents.length; i++) {
				if (typeof this.talents_data.talents[i].lvlreq == 'undefined') {
					continue;
				}
				if (this.talents_data.talents[i].lvlreq > threshold) {
					continue;
				}
				if (min_level_req > this.talents_data.talents[i].lvlreq) {
					min_level_req = this.talents_data.talents[i].lvlreq;
				}
			}
			threshold = min_level_req;
			this.heightmap.push(min_level_req);
		}
	}
	this.mapRefsReqs = function() {
		for (var i = 0; i < this.items.length; i++) {
			var current = this.items[i];
			if (typeof current.talent.talentreq != 'undefined') {
				var found = false;
				for (var j = 0; j < this.items.length; j++) {
					if (this.items[j].talent.id == current.talent.talentreq) {
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
};
