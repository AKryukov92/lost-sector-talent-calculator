{
	"id":484,
	"name":"Грязный Ребис",
	"category":"consumable",
	"description":"Концентрированные отходы производтсва лекарственного ребиса, имеющие прямо противоположное действие",
	"consumable_type":4,
	"lvlreq":10,
	"talentreq":17,
	"classreq":["as","sc","su"],
	"attacks":[{
		"name":"Бросок",
		"type":8,
		"accuracy":50,
		"radius":3,
		"cost":40,
		"min_dist":0,
		"max_dist":15,
		"min_damage":2,
		"max_damage":6,
		"specials":[{
			"duration":2,
			"effects":[
			"Уменьшает текущее здоровье на 5",
			"Уменьшает общую стойкость к урону на 0.15",
			"Уменьшает эффективность лечения на 50%"
			]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"mech_parts":2,
		"chemicals":1,
		"rebis":2
	}
}