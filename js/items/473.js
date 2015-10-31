{
	"id":473,
	"name":{
		"ru":"ЭМ граната",
		"en":"EMP Grenade"
	},
	"category":"consumable",
	"consumable_type":3,
	"description":{
		"ru":"Уничтожает оборудование, попавшее в зону поражения. ЭМ излучение игнорирует стены и препятствия.",
		"en":"Destroyes equipment in affected area. Electromagnetic radiation passes through walls and obstacles"
	},
	"lvlreq":6,
	"talentreq":3,
	"classreq":["sc","su"],
	"attacks":[{
		"name":{"ru":"Бросок","en":"Throw"},
		"type":7,
		"accuracy":50,
		"radius":15,
		"cost":40,
		"min_dist":0,
		"max_dist":30,
		"specials":[{
			"duration":2,
			"effects":[{
				"ru":"Уменьшает мобильность на 17%",
				"en":"Decreases mobility for 17%"
			}]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"electronics":2,
		"mech_parts":3
	}
}