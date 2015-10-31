{
	"id":474,
	"name":{
		"ru":"Коктейль Молотова",
		"en":"Molotov Cocktail"
	},
	"category":"consumable",
	"consumable_type":4,
	"description":{
		"ru":"Воспламеняет область поражения, при вхождении в пламя персонаж получает эффект:",
		"en":"Inflames affected area. When entering the flame character gets effect"
	},
	"lvlreq":8,
	"talentreq":17,
	"classreq":["as","sc","su"],
	"attacks":[{
		"name":{"ru":"Бросок","en":"Throw"},
		"type":9,
		"accuracy":50,
		"radius":3.5,
		"cost":40,
		"min_dist":0,
		"max_dist":15,
		"min_damage":20,
		"max_damage":30,
		"specials":[{
			"duration":3,
			"effects":[{
				"ru":"Наносит 14 ед. повреждения каждый раунд.",
				"en":"causes 14 damage each round"
			},{
				"ru":"Уменьшает эффективность лечения на 30%",
				"en":"Decreases healing effectiveness for 30%"
			}]
		}]
	}],
	"ingredients":{
		"light_metals":1,
		"chemicals":10
	}
}