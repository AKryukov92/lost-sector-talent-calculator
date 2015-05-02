﻿patchdata.item_data = [
/*Ближний бой*/
{
	name:"Разводной ключ",
	category:1,/*"Легкое оружие"*/
	mobility:95,
	imageid:415,
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
	short_name:"Бита",
	category:1,
	mobility:90,
	lvlreq:2,
	imageid:413,
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
	imageid:414,
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
	imageid:509,
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
	imageid:417,
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
	imageid:409,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.5,
		special_duration:1
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
	imageid:416,
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
	short_name:"Полис батон",
	category:1,
	mobility:100,
	lvlreq:7,
	imageid:412,
	attacks:[
	{
		name:"Удар",
		type:1,/*Удар в ближнем бою*/
		accuracy:100,
		cost:45,
		min_dist:0,
		max_dist:1.5
		special_duration:1
		special:"Делит мобильность на 2"
	}
	]
},
{
	name:"Топор",
	category:1,
	mobility:80,
	lvlreq:7,
	talentreq:7,
	imageid:418,
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
	category:1,
	mobility:100,
	clip:10,
	ammo:20,
	reload_cost:20,
	imageid:405,
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
	category:1,
	mobility:100,
	clip:12,
	ammo:24,
	reload_cost:20,
	lvlreq:2,
	imageid:446,
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
	category:1,
	mobility:100,
	clip:7,
	ammo:14,
	reload_cost:20,
	lvlreq:4,
	imageid:506,
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
	category:1,
	mobility:100,
	clip:16,
	ammo:32,
	reload_cost:20,
	lvlreq:5,
	imageid:448,
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
	category:1,
	mobility:100,
	clip:17,
	ammo:34,
	reload_cost:20,
	lvlreq:6,
	talentreq:6,
	imageid:485,
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
	category:1,
	mobility:95,
	clip:6,
	ammo:14,
	reload_cost:35,
	lvlreq:7,
	talentreq:6,
	imageid:431,
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
	category:1,
	mobility:100,
	clip:12,
	ammo:24,
	reload_cost:20,
	lvlreq:9,
	talentreq:19,
	imageid:519,
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
	category:1,
	mobility:95,
	clip:7,
	ammo:14,
	reload_cost:20,
	lvlreq:10,
	talentreq:19,
	imageid:447,
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
	category:1,
	mobility:97,
	clip:16,
	ammo:48,
	reload_cost:20,
	lvlreq:11,
	talentreq:19,
	imageid:546,
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
	category:1,
	mobility:94,
	clip:45,
	ammo:135,
	reload_cost:25,
	imageid:493,
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
	category:1,
	mobility:92,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:2,
	imageid:426,
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
	}
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
	category:1,
	mobility:96,
	clip:45,
	ammo:90,
	reload_cost:20,
	lvlreq:3,
	imageid:494,
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
	category:1,
	mobility:90,
	clip:50,
	ammo:100,
	reload_cost:20,
	lvlreq:6,
	talentreq:8,
	imageid:427,
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
	category:1,
	mobility:92,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:7,
	talentreq:6,
	imageid:445,
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
	category:1,
	mobility:94,
	clip:45,
	ammo:135,
	reload_cost:25,
	lvlreq:9,
	talentreq:26,
	imageid:449,
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
	category:1,
	mobility:90,
	clip:50,
	ammo:100,
	reload_cost:20,
	lvlreq:10,
	talentreq:26,
	imageid:461,
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
	category:1,
	mobility:93,
	clip:60,
	ammo:120,
	reload_cost:20,
	lvlreq:12,
	talentreq:26,
	imageid:553,
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
	short_name:"Ремингтон M870",
	category:2,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:20,
	lvlreq:2,
	imageid:401,
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
	category:2,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:4,
	imageid:423,
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
	category:2,
	mobility:78,
	clip:6,
	ammo:24,
	reload_cost:20,
	lvlreq:6,
	talentreq:14,
	imageid:459,
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
	category:2,
	mobility:77,
	clip:12,
	ammo:24,
	reload_cost:60,
	lvlreq:7,
	talentreq:14,
	imageid:544,
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
	category:2,
	mobility:80,
	clip:10,
	ammo:24,
	reload_cost:40,
	lvlreq:8,
	talentreq:20,
	imageid:452,
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
	category:2,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:8,
	talentreq:20,
	imageid:547,
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
	category:2,
	mobility:78,
	clip:6,
	ammo:24,
	reload_cost:20,
	lvlreq:9,
	talentreq:20,
	imageid:488,
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
	category:2,
	mobility:78,
	clip:12,
	ammo:24,
	reload_cost:40,
	lvlreq:10,
	talentreq:20,
	imageid:464,
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
	category:2,
	mobility:85,
	clip:3,
	ammo:12,
	reload_cost:30,
	lvlreq:11,
	talentreq:20,
	imageid:550,
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
	category:2,
	mobility:79,
	clip:7,
	ammo:21,
	reload_cost:20,
	lvlreq:12,
	talentreq:20,
	imageid:516,
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
	category:2,
	mobility:78,
	clip:15,
	ammo:24,
	reload_cost:40,
	lvlreq:12,
	talentreq:20,
	imageid:542,
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
	category:2,
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:2,
	imageid:402,
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
		accuracy:,64
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
	category:2,
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:4,
	imageid:537,
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
	category:2,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:5,
	talentreq:10,
	imageid:424,
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
	category:2,
	mobility:82,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:5,
	talentreq:10,
	imageid:457,
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
	category:2,
	mobility:78,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:6,
	talentreq:10,
	imageid:428,
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
	category:2,
	mobility:80,
	clip:28,
	ammo:56,
	reload_cost:20,
	lvlreq:7,
	talentreq:10,
	imageid:454,
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
	category:2,
	mobility:77,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:7,
	talentreq:10,
	imageid:533,
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
	category:2,
	mobility:77,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:8,
	talentreq:22,
	imageid:450,
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
	category:2,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:20,
	lvlreq:9,
	talentreq:22,
	imageid:441,
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
	category:2,
	mobility:82,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:9,
	talentreq:22,
	imageid:453,
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
	category:2,
	mobility:78,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:10,
	talentreq:22,
	imageid:429,
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
	category:2,
	mobility:80,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:11,
	talentreq:22,
	imageid:456,
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
	category:2,
	mobility:80,
	clip:30,
	ammo:60,
	reload_cost:25,
	lvlreq:12,
	talentreq:22,
	imageid:430,
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
	category:2,
	mobility:81,
	clip:30,
	ammo:60,
	reload_cost:20,
	lvlreq:12,
	talentreq:22,
	imageid:540,
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
	category:2,
	mobility:78,
	clip:24,
	ammo:48,
	reload_cost:15,
	lvlreq:12,
	talentreq:22,
	imageid:551,
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
	category:2,
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:3,
	imageid:403,
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
	category:2,
	mobility:63,
	clip:1,
	ammo:5,
	reload_cost:10,
	lvlreq:5,
	talentreq:13,
	imageid:503,
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
	category:2,
	mobility:61,
	clip:1,
	ammo:9,
	reload_cost:15,
	lvlreq:6,
	talentreq:13,
	imageid:502,
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
	category:2,
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:7,
	talentreq:13,
	imageid:462,
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
	category:2,
	mobility:66,
	clip:5,
	ammo:10,
	reload_cost:30,
	lvlreq:8,
	talentreq:24,
	imageid:442,
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
	category:2,
	mobility:60,
	clip:1,
	ammo:5,
	reload_cost:20,
	lvlreq:9,
	talentreq:24,
	imageid:434,
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
	category:2,
	mobility:67,
	clip:10,
	ammo:10,
	reload_cost:30,
	lvlreq:10,
	talentreq:24,
	imageid:532,
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
	category:2,
	mobility:62,
	clip:4,
	ammo:8,
	reload_cost:30,
	lvlreq:11,
	talentreq:24,
	imageid:505,
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
	category:2,
	mobility:60,
	clip:1,
	ammo:5,
	reload_cost:10,
	lvlreq:12,
	talentreq:24,
	imageid:458,
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
	category:2,
	mobility:63,
	clip:4,
	ammo:8,
	reload_cost:25,
	lvlreq:12,
	talentreq:24,
	imageid:543,
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
	category:2,
	mobility:69,
	clip:1,
	ammo:8,
	reload_cost:20,
	lvlreq:5,
	talentreq:12,
	imageid:465,
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
	category:2,
	mobility:56,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:7,
	talentreq:12,
	imageid:466,
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
	short_name:"Милкор",
	category:2,
	mobility:66,
	clip:6,
	ammo:6,
	reload_cost:50,
	lvlreq:8,
	talentreq:21,
	imageid:410,
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
	category:2,
	mobility:75,
	clip:1,
	ammo:5,
	reload_cost:30,
	lvlreq:8,
	talentreq:12,
	imageid:500,
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
	category:2,
	mobility:54,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:9,
	talentreq:21,
	imageid:425,
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
	category:2,
	mobility:56,
	clip:1,
	ammo:2,
	reload_cost:45,
	lvlreq:12,
	talentreq:21,
	imageid:549,
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
	category:2,
	mobility:57,
	clip:75,
	ammo:150,
	reload_cost:50,
	lvlreq:5,
	talentreq:11,
	imageid:432,
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
	category:2,
	mobility:60,
	clip:100,
	ammo:200,
	reload_cost:50,
	lvlreq:6,
	talentreq:11,
	imageid:536,
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
	category:2,
	mobility:62,
	clip:75,
	ammo:150,
	reload_cost:45,
	lvlreq:7,
	talentreq:23,
	imageid:463,
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
	category:2,
	mobility:59,
	clip:75,
	ammo:150,
	reload_cost:50,
	lvlreq:8,
	talentreq:23,
	imageid:460,
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
	category:2,
	mobility:62,
	clip:75,
	ammo:150,
	reload_cost:40,
	lvlreq:9,
	talentreq:23,
	imageid:560,
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
	category:2,
	mobility:64,
	clip:100,
	ammo:200,
	reload_cost:30,
	lvlreq:10,
	talentreq:23,
	imageid:497,
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
	category:2,
	mobility:63,
	clip:75,
	ammo:150,
	reload_cost:40,
	lvlreq:10,
	talentreq:23,
	imageid:526,
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
	category:2,
	mobility:72,
	protection:82,
	lvlreq:5,
	talentreq:9,
	imageid:408,
},
{
	name:"Полицейский щит",
	category:2,
	mobility:80,
	protection:73,
	lvlreq:7,
	talentreq:9,
}
]