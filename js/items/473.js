{
	"id":473,
	"name":"ЭМ граната",
	"category":"consumable",
	"consumable_type":4,
	"description":"Уничтожает оборудование, попавшее в зону поражения. ЭМ излучение игнорирует стены и препятствия.",
	"lvlreq":6,
	"talentreq":3,
	"classreq":["sc","su"],
	"attacks":[{
		"name":"Бросок",
		"type":7,
		"accuracy":50,
		"radius":15,
		"cost":40,
		"min_dist":0,
		"max_dist":30,
		"specials":[{
			"duration":2,
			"effects":["Уменьшает мобильность на 10%"]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"electronics":2,
		"mech_parts":3
	}
}