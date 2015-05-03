﻿patchdata.weapontype_map = [
	{
		category_id:0,
		category_name: "armor",
		slots:["armor"]
	},
	{
		category_id:1,
		category_name:"melee",
		slots:["primary","secondary"]
	},
	{
		category_id:2,
		category_name:"pistols",
		slots:["primary","secondary"]
	},
	{
		category_id:3,
		category_name:"smgs",
		slots:["primary","secondary"]
	},
	{
		category_id:4,
		category_name:"shotguns",
		slots:["primary"]
	},
	{
		category_id:5,
		category_name:"assault-rifles",
		slots:["primary"]
	},
	{
		category_id:6,
		category_name:"sniper-rifles",
		slots:["primary"]
	},
	{
		category_id:7,
		category_name:"machineguns",
		slots:["primary"]
	},
	{
		category_id:8,
		category_name:"launchers",
		slots:["primary"]
	},
	{
		category_id:9,
		category_name:"shields",
		slots:["primary"]
	},
	{
		category_id:10,
		category_name:"hats",
		slots:["primary"]
	},
	{
		category_id:11,
		category_name:"consumables",
		slots:["primary"]
	},
]
patchdata.item_data = [
/*Ближний бой*/
{
	name:"Разводной ключ",
	category:1,/*Ближний бой*/
	mobility:95,
	id:415,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:50,
		min_dist:0,
		max_dist:1.5
	}
	]
},
{
	name:"Бейсбольна¤ бита",
	category:1,
	mobility:90,
	lvlreq:2,
	id:413,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.9
	}]
},
{
	name:"Лом",
	category:1,
	mobility:85,
	lvlreq:3,
	id:414,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:50,
		min_dist:0,
		max_dist:2
	}
	]
},
{
	name:"Автоген",
	category:1,
	mobility:96,
	lvlreq:4,
	id:509,
	attacks:[
	{
		name:"Удар",
		type:7,/*Урон огнем*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.5,
		special_duration:3,
		special:"Наносит 14 ед. повреждения каждый раунд. Уменьшает эффективность лечения на 30%"
	}]
},
{
	name:"Боевой нож",
	category:1,
	mobility:100,
	lvlreq:5,
	id:417,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:30,
		min_dist:0,
		max_dist:1.5
	}
	]
},
{
	name:"Дубинка-шокер",
	category:1,
	mobility:95,
	lvlreq:6,
	talentreq:7,
	id:409,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.5,
		special_duration:1,
		special:"Делит мобильность на 2"
	}
	]
},
{
	name:"Мачете",
	category:1,
	mobility:90,
	lvlreq:6,
	talentreq:7,
	id:416,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:33,
		min_dist:0,
		max_dist:1.8
	}
	]
},
{
	name:"Полицейска¤ дубинка",
	category:1,
	mobility:100,
	lvlreq:7,
	id:412,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.5,
		special_duration:1,
		special:"Делит мобильность на 2"
	}
	]
},
{
	name:"Топор",
	category:1,
	type:1,/*Ближний бой*/
	mobility:80,
	lvlreq:7,
	talentreq:7,
	id:418,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:50,
		min_dist:0,
		max_dist:2.1
	}
	]
},
/*Пистолеты*/
{
	name:"Norinco 77b",
	category:2,/*Пистолеты*/
	mobility:100,
	clip:10,
	ammo:20,
	reload_cost:20,
	id:405,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:2,/*Мягкие пули*/
		accuracy:49,
		cost:20,
		min_dist:4,
		max_dist:14,
		bullets:1
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:57,
		cost:30,
		min_dist:4,
		max_dist:16,
		bullets:1
	}]
},
{
	name:"USP45",
	category:2,
	mobility:100,
	clip:12,
	ammo:24,
	reload_cost:20,
	lvlreq:2,
	id:446,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:2,/*Мягкие пули*/
		accuracy:49,
		cost:20,
		min_dist:4,
		max_dist:14,
		bullets:1
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:57,
		cost:30,
		min_dist:4,
		max_dist:16,
		bullets:1
	}]
},
{
	name:"M1911",
	category:2,
	mobility:100,
	clip:7,
	ammo:14,
	reload_cost:20,
	lvlreq:4,
	id:506,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:3,/*Пули*/
		accuracy:42,
		cost:32,
		min_dist:4,
		max_dist:16,
		bullets:1
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:62,
		cost:40,
		min_dist:6,
		max_dist:18,
		bullets:1
	}]
},
{
	name:"Беретта 93P",
	category:2,
	mobility:100,
	clip:16,
	ammo:32,
	reload_cost:20,
	lvlreq:5,
	id:448,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:31,
		cost:40,
		min_dist:4,
		max_dist:13,
		bullets:8
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:57,
		cost:25,
		min_dist:4,
		max_dist:15,
		bullets:1
	}]
},
{
	name:"Glock 17",
	category:2,
	mobility:100,
	clip:17,
	ammo:34,
	reload_cost:20,
	lvlreq:6,
	talentreq:6,
	id:485,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:2,/*Мягкие пули*/
		accuracy:49,
		cost:20,
		min_dist:4,
		max_dist:14,
		bullets:1
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:57,
		cost:30,
		min_dist:4,
		max_dist:16,
		bullets:1
	}]
},
{
	name:"Magnum",
	category:2,
	mobility:95,
	clip:6,
	ammo:14,
	reload_cost:35,
	lvlreq:7,
	talentreq:6,
	id:431,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:3,/*Пули*/
		accuracy:42,
		cost:32,
		min_dist:4,
		max_dist:16,
		bullets:1
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:62,
		cost:40,
		min_dist:6,
		max_dist:18,
		bullets:1
	}]
},
{
	name:"Mk23",
	category:2,
	mobility:100,
	clip:12,
	ammo:24,
	reload_cost:20,
	lvlreq:9,
	talentreq:19,
	id:519,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:2,/*Мягкие пули*/
		accuracy:51,
		cost:20,
		min_dist:3,
		max_dist:14,
		bullets:1
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:59,
		cost:30,
		min_dist:4,
		max_dist:16,
		bullets:1
	}]
},
{
	name:"Desert Eagle",
	category:2,
	mobility:95,
	clip:7,
	ammo:14,
	reload_cost:20,
	lvlreq:10,
	talentreq:19,
	id:447,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:3,/*Пули*/
		accuracy:42,
		cost:32,
		min_dist:4,
		max_dist:16,
		bullets:1
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:62,
		cost:40,
		min_dist:6,
		max_dist:18,
		bullets:1
	}]
},
{
	name:"Glock 18",
	category:2,
	mobility:97,
	clip:16,
	ammo:48,
	reload_cost:20,
	lvlreq:11,
	talentreq:19,
	id:546,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:35,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:31,
		cost:40,
		min_dist:4,
		max_dist:13,
		bullets:8
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:57,
		cost:25,
		min_dist:4,
		max_dist:15,
		bullets:1
	}]
},
/*ПП*/
{
	name:"MAC-11",
	category:3,/*ПП*/
	mobility:94,
	clip:45,
	ammo:135,
	reload_cost:25,
	id:493,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:41,
		cost:30,
		min_dist:6,
		max_dist:14,
		bullets:15
	}]
},
{
	name:"Uzi",
	category:3,
	mobility:92,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:2,
	id:426,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:51,
		cost:32,
		min_dist:8,
		max_dist:16,
		bullets:10
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:61,
		cost:40,
		min_dist:10,
		max_dist:22,
		bullets:5
	}]
},
{
	name:"TMP",
	category:3,
	mobility:96,
	clip:45,
	ammo:90,
	reload_cost:20,
	lvlreq:3,
	id:494,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:43,
		cost:30,
		min_dist:4,
		max_dist:15,
		bullets:15
	}]
},
{
	name:"P90",
	category:3,
	mobility:90,
	clip:50,
	ammo:100,
	reload_cost:20,
	lvlreq:6,
	talentreq:8,
	id:427,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:52,
		cost:33,
		min_dist:8,
		max_dist:22,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:69,
		cost:45,
		min_dist:12,
		max_dist:26,
		bullets:6
	}]
},
{
	name:"UMP45",
	category:3,
	mobility:92,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:7,
	talentreq:6,
	id:445,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:51,
		cost:32,
		min_dist:8,
		max_dist:16,
		bullets:10
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:61,
		cost:40,
		min_dist:10,
		max_dist:22,
		bullets:5
	}]
},
{
	name:"PP-2000",
	category:3,
	mobility:94,
	clip:45,
	ammo:135,
	reload_cost:25,
	lvlreq:9,
	talentreq:26,
	id:449,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:43,
		cost:30,
		min_dist:6,
		max_dist:15,
		bullets:15
	}]
},
{
	name:"KRISS Vector",
	category:3,
	mobility:90,
	clip:50,
	ammo:100,
	reload_cost:20,
	lvlreq:10,
	talentreq:26,
	id:461,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:52,
		cost:33,
		min_dist:8,
		max_dist:22,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:69,
		cost:45,
		min_dist:12,
		max_dist:26,
		bullets:6
	}]
},
{
	name:"Calico M950",
	category:3,
	mobility:93,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:12,
	talentreq:26,
	id:553,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:40,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:2,/*Мягкие пули*/
		accuracy:51,
		cost:32,
		min_dist:8,
		max_dist:16,
		bullets:10
	},
	{
		name:"Прицельно",
		type:2,/*Мягкие пули*/
		accuracy:61,
		cost:40,
		min_dist:10,
		max_dist:22,
		bullets:5
	}]
},
/*Дробовик*/
{
	name:"Дробовик Ремингтон M870",
	category:4,/*Дробовик*/
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:20,
	lvlreq:2,
	id:401,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:2,/*Мягкие пули*/
		accuracy:34,
		cost:40,
		min_dist:4,
		max_dist:9,
		bullets:1
	}]
},
{
	name:"Дробовик Шарк",
	category:4,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:4,
	id:423,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:34,
		cost:40,
		min_dist:4,
		max_dist:9,
		bullets:1
	}]
},
{
	name:"SPAS 12",
	category:4,
	mobility:78,
	clip:6,
	ammo:24,
	reload_cost:20,
	lvlreq:6,
	talentreq:14,
	id:459,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:43,
		cost:45,
		min_dist:4,
		max_dist:14,
		bullets:1
	}]
},
{
	name:"Protecta",
	category:4,
	mobility:77,
	clip:12,
	ammo:24,
	reload_cost:60,
	lvlreq:7,
	talentreq:14,
	id:544,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:38,
		cost:28,
		min_dist:4,
		max_dist:12,
		bullets:1
	}]
},
{
	name:"Pancor Jackhammer",
	short_name:"Панкор",
	category:4,
	mobility:80,
	clip:10,
	ammo:24,
	reload_cost:40,
	lvlreq:8,
	talentreq:20,
	id:452,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:38,
		cost:30,
		min_dist:4,
		max_dist:12,
		bullets:1
	}]
},
{
	name:"XM26LSS",
	category:4,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:8,
	talentreq:20,
	id:547,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:34,
		cost:40,
		min_dist:4,
		max_dist:9,
		bullets:1
	}]
},
{
	name:"Benelli M4",
	category:4,
	mobility:78,
	clip:6,
	ammo:24,
	reload_cost:20,
	lvlreq:9,
	talentreq:20,
	id:488,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:43,
		cost:45,
		min_dist:4,
		max_dist:14,
		bullets:1
	}]
},
{
	name:"AA-12",
	category:4,
	mobility:78,
	clip:12,
	ammo:24,
	reload_cost:40,
	lvlreq:10,
	talentreq:20,
	id:464,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:38,
		cost:30,
		min_dist:4,
		max_dist:12,
		bullets:1
	},
	{
		name:"Очередь",
		type:4,/*Дробь*/
		accuracy:25,
		cost:50,
		min_dist:4,
		max_dist:12,
		bullets:3
	}]
},
{
	name:"Дробовик Дозер",
	category:4,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:11,
	talentreq:20,
	id:550,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:37,
		cost:40,
		min_dist:4,
		max_dist:9,
		bullets:1
	}]
},
{
	name:"FN TPS",
	category:4,
	mobility:79,
	clip:7,
	ammo:21,
	reload_cost:20,
	lvlreq:12,
	talentreq:20,
	id:516,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:43,
		cost:45,
		min_dist:4,
		max_dist:14,
		bullets:1
	}]
},
{
	name:"USAS 12",
	category:4,
	mobility:78,
	clip:15,
	ammo:24,
	reload_cost:40,
	lvlreq:12,
	talentreq:20,
	id:542,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:4,/*Дробь*/
		accuracy:41,
		cost:30,
		min_dist:4,
		max_dist:12,
		bullets:1
	},
	{
		name:"Очередь",
		type:4,/*Дробь*/
		accuracy:28,
		cost:50,
		min_dist:4,
		max_dist:12,
		bullets:3
	}]
},
/*Штурмова¤ винтовка*/
{
	name:"Galil",
	category:5,/*ШВ*/
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:2,
	id:402,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:71,
		cost:55,
		min_dist:16,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"QBZ95B",
	category:5,
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:4,
	id:537,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:71,
		cost:55,
		min_dist:16,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"M4A1",
	category:5,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:5,
	talentreq:10,
	id:424,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:68,
		cost:45,
		min_dist:15,
		max_dist:32,
		bullets:6
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:75,
		cost:60,
		min_dist:18,
		max_dist:36,
		bullets:4
	}]
},
{
	name:"G36",
	category:5,
	mobility:82,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:5,
	talentreq:10,
	id:457,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:27,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:72,
		cost:55,
		min_dist:16,
		max_dist:32,
		bullets:4
	}]
},
{
	name:"Scar",
	category:5,
	mobility:78,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:6,
	talentreq:10,
	id:428,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:58,
		cost:40,
		min_dist:12,
		max_dist:24,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:65,
		cost:60,
		min_dist:14,
		max_dist:28,
		bullets:6
	}]
},
{
	name:"FAMAS",
	category:5,
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:7,
	talentreq:10,
	id:454,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:71,
		cost:55,
		min_dist:16,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"M16A2",
	category:5,
	mobility:77,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:7,
	talentreq:10,
	id:533,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:75,
		cost:60,
		min_dist:14,
		max_dist:32,
		bullets:6
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:75,
		cost:60,
		min_dist:17,
		max_dist:36,
		bullets:4
	}]
},
{
	name:"АК 47",
	category:5,
	mobility:77,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:8,
	talentreq:22,
	id:450,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:54,
		cost:40,
		min_dist:11,
		max_dist:24,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:62,
		cost:60,
		min_dist:13,
		max_dist:28,
		bullets:6
	}]
},
{
	name:"АС 'ВАЛ'",
	category:5,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:9,
	talentreq:22,
	id:441,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:68,
		cost:45,
		min_dist:15,
		max_dist:32,
		bullets:6
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:75,
		cost:60,
		min_dist:18,
		max_dist:36,
		bullets:4
	}]
},
{
	name:"АК 74М",
	category:5,
	mobility:82,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:9,
	talentreq:22,
	id:453,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:72,
		cost:55,
		min_dist:16,
		max_dist:32,
		bullets:4
	}]
},
{
	name:"Steyr AUG A1",
	category:5,
	mobility:78,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:10,
	talentreq:22,
	id:429,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:58,
		cost:40,
		min_dist:12,
		max_dist:24,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:65,
		cost:60,
		min_dist:14,
		max_dist:28,
		bullets:6
	}]
},
{
	name:"FN F2000",
	category:5,
	mobility:80,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:11,
	talentreq:22,
	id:456,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:64,
		cost:45,
		min_dist:14,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:73,
		cost:55,
		min_dist:16,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"Steyr AUG A3",
	category:5,
	mobility:80,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:12,
	talentreq:22,
	id:430,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:61,
		cost:40,
		min_dist:12,
		max_dist:25,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:66,
		cost:60,
		min_dist:14,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"TAR 21",
	category:5,
	mobility:81,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:12,
	talentreq:22,
	id:540,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:65,
		cost:45,
		min_dist:13,
		max_dist:26,
		bullets:8
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:73,
		cost:55,
		min_dist:15,
		max_dist:30,
		bullets:6
	}]
},
{
	name:"XM8",
	category:5,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:15,
	lvlreq:12,
	talentreq:22,
	id:551,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Очередь",
		type:3,/*Пули*/
		accuracy:68,
		cost:45,
		min_dist:15,
		max_dist:34,
		bullets:6
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:75,
		cost:60,
		min_dist:18,
		max_dist:38,
		bullets:4
	}]
},
/*Снайперска¤ винтовка*/
{
	name:"Steyr Scout",
	category:6,/*снайперские*/
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:3,
	id:403,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:3,/*Пули*/
		accuracy:59,
		cost:50,
		min_dist:14,
		max_dist:40,
		bullets:1
	},
	{
		name:"Прицельно",
		type:3,/*Пули*/
		accuracy:76,
		cost:60,
		min_dist:18,
		max_dist:45,
		bullets:1
	}]
},
{
	name:"M24",
	category:6,
	mobility:63,
	clip:1,
	ammo:5,
	reload_cost:10,
	lvlreq:5,
	talentreq:13,
	id:503,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:59,
		cost:50,
		min_dist:17,
		max_dist:40,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:76,
		cost:60,
		min_dist:18,
		max_dist:45,
		bullets:1
	}]
},
{
	name:"M40A5",
	category:6,
	mobility:61,
	clip:1,
	ammo:9,
	reload_cost:15,
	lvlreq:6,
	talentreq:13,
	id:502,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2.1
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:74,
		cost:55,
		min_dist:24,
		max_dist:52,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:79,
		cost:70,
		min_dist:30,
		max_dist:54,
		bullets:1
	}]
},
{
	name:"AWP",
	category:6,
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:7,
	talentreq:13,
	id:462,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:76,
		cost:60,
		min_dist:18,
		max_dist:45,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:76,
		cost:60,
		min_dist:18,
		max_dist:45,
		bullets:1
	}]
},
{
	name:"СВД",
	category:6,
	mobility:66,
	clip:5,
	ammo:10,
	reload_cost:30,
	lvlreq:8,
	talentreq:24,
	id:442,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:56,
		cost:50,
		min_dist:15,
		max_dist:35,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:73,
		cost:70,
		min_dist:25,
		max_dist:40,
		bullets:1
	}]
},
{
	name:"DSR50",
	category:6,
	mobility:60,
	clip:1,
	ammo:5,
	reload_cost:20,
	lvlreq:9,
	talentreq:24,
	id:434,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2.1
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:75,
		cost:55,
		min_dist:24,
		max_dist:52,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:81,
		cost:70,
		min_dist:32,
		max_dist:55,
		bullets:1
	}]
},
{
	name:"SR25",
	category:6,
	mobility:67,
	clip:10,
	ammo:10,
	reload_cost:30,
	lvlreq:10,
	talentreq:24,
	id:532,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:56,
		cost:50,
		min_dist:15,
		max_dist:35,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:75,
		cost:70,
		min_dist:20,
		max_dist:44,
		bullets:1
	}]
},
{
	name:"Barrett M82",
	category:6,
	mobility:62,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:11,
	talentreq:24,
	id:505,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:60,
		cost:50,
		min_dist:17,
		max_dist:42,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:77,
		cost:60,
		min_dist:22,
		max_dist:48,
		bullets:1
	}]
},
{
	name:"Barrett M99-1",
	category:6,
	mobility:60,
	clip:1,
	ammo:5,
	reload_cost:10,
	lvlreq:12,
	talentreq:24,
	id:458,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2.1
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:74,
		cost:55,
		min_dist:24,
		max_dist:52,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:80,
		cost:70,
		min_dist:32,
		max_dist:58,
		bullets:1
	}]
},
{
	name:"Walther WA2000",
	category:6,
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:25,
	lvlreq:12,
	talentreq:24,
	id:543,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:2
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:61,
		cost:50,
		min_dist:17,
		max_dist:42,
		bullets:1
	},
	{
		name:"Прицельно",
		type:5,/*Крупный калибр*/
		accuracy:77,
		cost:60,
		min_dist:22,
		max_dist:48,
		bullets:1
	}]
},
/*Взрывное*/
{
	name:"Гранатомет М79",
	category:7,/*взрывное*/
	mobility:69,
	clip:1,
	ammo:8,
	reload_cost:20,
	lvlreq:5,
	talentreq:12,
	id:465,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:28,
		radius:4,
		cost:35,
		min_dist:10,
		max_dist:26,
		bullets:1
	}]
},
{
	name:"M72 LAW",
	category:7,
	mobility:56,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:7,
	talentreq:12,
	id:466,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:45,
		radius:6,
		cost:60,
		min_dist:20,
		max_dist:70,
		bullets:1
	}]
},
{
	name:"Многозарядный Гранатомет Милкор",
	category:7,
	mobility:66,
	clip:6,
	ammo:6,
	reload_cost:50,
	lvlreq:8,
	talentreq:21,
	id:410,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:24,
		radius:3.5,
		cost:30,
		min_dist:8,
		max_dist:28,
		bullets:1
	}]
},
{
	name:"Арбалет",
	category:7,
	mobility:75,
	clip:1,
	ammo:5,
	reload_cost:30,
	lvlreq:8,
	talentreq:12,
	id:500,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:52,
		radius:2,
		cost:60,
		min_dist:10,
		max_dist:55,
		bullets:1
	}]
},
{
	name:"РПГ-7",
	category:7,
	mobility:54,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:9,
	talentreq:21,
	id:425,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:45,
		radius:6,
		cost:60,
		min_dist:20,
		max_dist:70,
		bullets:1
	}]
},
{
	name:"Рино",
	category:7,
	mobility:56,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:12,
	talentreq:21,
	id:549,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Запуск",
		type:6,/*Взрыв*/
		accuracy:47,
		radius:6,
		cost:60,
		min_dist:20,
		max_dist:70,
		bullets:1
	}]
},
/*Пулемет*/
{
	name:"M60",
	category:8,
	mobility:57,
	clip:75,
	ammo:150,
	reload_cost:50,
	lvlreq:5,
	talentreq:11,
	id:432,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:54,
		cost:55,
		min_dist:16,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:40,
		cost:70,
		min_dist:10,
		max_dist:25,
		bullets:25
	}]
},
{
	name:"ПКМ",
	category:8,
	mobility:60,
	clip:100,
	ammo:200,
	reload_cost:50,
	lvlreq:6,
	talentreq:11,
	id:536,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:57,
		cost:55,
		min_dist:16,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:42,
		cost:70,
		min_dist:10,
		max_dist:25,
		bullets:25
	}]
},
{
	name:"M249 SAW",
	category:8,
	mobility:62,
	clip:75,
	ammo:150,
	reload_cost:45,
	lvlreq:7,
	talentreq:23,
	id:463,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:58,
		cost:55,
		min_dist:17,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:32,
		cost:70,
		min_dist:12,
		max_dist:30,
		bullets:30
	}]
},
{
	name:"РПД",
	category:8,
	mobility:59,
	clip:75,
	ammo:150,
	reload_cost:50,
	lvlreq:8,
	talentreq:23,
	id:460,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.5
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:57,
		cost:55,
		min_dist:16,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:42,
		cost:70,
		min_dist:10,
		max_dist:25,
		bullets:25
	}]
},
{
	name:"RPK-74",
	category:8,
	mobility:62,
	clip:75,
	ammo:150,
	reload_cost:40,
	lvlreq:9,
	talentreq:23,
	id:560,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:61,
		cost:55,
		min_dist:17,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:30,
		cost:70,
		min_dist:12,
		max_dist:30,
		bullets:30
	}]
},
{
	name:"MG-36",
	category:8,
	mobility:64,
	clip:100,
	ammo:200,
	reload_cost:30,
	lvlreq:10,
	talentreq:23,
	id:497,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:64,
		cost:55,
		min_dist:18,
		max_dist:45,
		bullets:12
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:39,
		cost:70,
		min_dist:10,
		max_dist:25,
		bullets:30
	}]
},
{
	name:"MG4",
	category:8,
	mobility:63,
	clip:75,
	ammo:150,
	reload_cost:40,
	lvlreq:10,
	talentreq:23,
	id:562,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:90,
		cost:45,
		min_dist:0,
		max_dist:1.8
	},
	{
		name:"Навскидку",
		type:5,/*Крупный калибр*/
		accuracy:58,
		cost:55,
		min_dist:17,
		max_dist:45,
		bullets:15
	},
	{
		name:"Очередь",
		type:5,/*Крупный калибр*/
		accuracy:33,
		cost:70,
		min_dist:12,
		max_dist:30,
		bullets:30
	}]
},
/*Щит*/
{
	name:"Щит",
	category:9,
	mobility:72,
	protection:82,
	lvlreq:5,
	talentreq:9,
	id:408
},
{
	name:"Полицейский щит",
	category:9,
	mobility:80,
	protection:73,
	lvlreq:7,
	talentreq:9,
	id:411
},
/*Броня*/
{
	
}
]