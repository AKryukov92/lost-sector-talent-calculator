{
	"id":484,
	"name":{
		"ru":"Грязный Ребис",
		"en":"Dirty Rebis"
	},
	"category":"consumable",
	"description":{
		"ru":"Концентрированные отходы производтсва лекарственного ребиса, имеющие прямо противоположное действие",
		"en":"Concentrated wastes from manufacturing medical Rebis, that have just the opposite effect."
	},
	"consumable_type":3,
	"lvlreq":10,
	"talentreq":17,
	"classreq":["as","sc","su"],
	"attacks":[{
		"name":{"ru":"Бросок","en":"Throw"},
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
			"effects":[{
				"ru":"Уменьшает текущее здоровье на 5",
				"en":"Decreases current health for 5"
			},{
			"ru":"Уменьшает общую стойкость к урону на 0.15",
			"en":"Decreases total resist for 0.15"
			},{
				"ru":"Уменьшает эффективность лечения на 50%",
				"en":"Decreases healing effectiveness for 50%"
			}]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"mech_parts":2,
		"chemicals":1,
		"rebis":2
	}
}