var handlers = {
	talent: function(player, action, victim){
		console.log("talent");
		
	},
	attack: function(player, action, victim){
		console.log("attack");
		player.updateCurrentWeapon(action.item);
		var attack = action.source;
		victim.takeDamage(attack.min_damage, attack.max_damage);
	},
	reload: function(player, action, victim){
		console.log("reload");
		
	},
	consumable: function(player, action, victim){
		console.log("consumable");
		
	},
	swap: function(player, action, victim){
		console.log("swap");
		
	},
	duck: function(player, action, victim){
		console.log("duck");
		
	}
}
function Player(p,s,a,h,c1,c2,c3,c4,c5,i1,i2,i3,i4){
	this.current = null;
	this.updateCurrentWeapon = function(item){
		if (this.current == null){
			this.current = item;
		}
		if (this.current.id != item.id){
			this.current = item;
		}
	}
}
function Target(){
	this.damageTakenMin = 0;
	this.damageTakenMax = 0;
	this.takeDamage = function(min, max){
		this.damageTakenMax += max;
		this.damageTakenMin += min;
	}
}

function estimate(as){
	console.log(as.toString());
	var player = new Player();
	var target = new Target();
	for (var i = 0; i < as.actions.length; i++){
		var current = as.actions[i];
		handlers[current.type](player, current, target);
	}
	console.log(as);
}