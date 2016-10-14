var handlers = {
	talent: function(player, action, victim){
		//console.log("talent");
		
	},
	attack: function(player, action, victim){
		//console.log("attack");
		player.updateCurrentWeapon(action.item);
		var attack = action.source;
		victim.takeDamage(player.dealDamage(attack));
	},
	reload: function(player, action, victim){
		//console.log("reload");
		
	},
	consumable: function(player, action, victim){
		//console.log("consumable");
		
	},
	swap: function(player, action, victim){
		//console.log("swap");
		
	},
	duck: function(player, action, victim){
		//console.log("duck");
		
	}
};
function Player(calc,items){
	this.current = null;
	this.calculator = calc;
	this.items = items;
	this.updateCurrentWeapon = function(item){
		if (this.current == null){
			this.current = item;
		}
		if (this.current.id != item.id){
			this.current = item;
		}
	};
	this.dealDamage = function(attack){
		return {
			min:attack.min_damage,
			max:attack.max_damage
		};
	};
	this.getBaseMoveCost = function(){
		if (typeof p.mobility == "undefined"){
			throw new Error("Mobility of primary weapon is not defined");
		}
		return p.mobility
	};
}
function Target(as){
	this.totalMax = 0;
	this.totalMin = 0;
	this.actionSet = as;
	this.takeDamage = function(range){
		this.totalMax += range.max;
		this.totalMin += range.min;
	};
}

function estimate(as, calc, items){
	var player = new Player(calc);
	var target = new Target(as);
	for (var i = 0; i < as.actions.length; i++){
		var current = as.actions[i];
		handlers[current.type](player, current, target);
	}
	return target;
}