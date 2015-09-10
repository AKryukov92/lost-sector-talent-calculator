{
	"id":474,
	"name":"Коктейль Молотова",
	"category":"consumable",
	"consumable_type":4,
	"description":"Воспламеняет область поражения, при вхождении в пламя персонаж получает эффект:",
	"lvlreq":8,
	"talentreq":17,
	"classreq":["as","sc","su"],
	"attacks":[{
		"name":"Бросок",
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
			"effects":["Наносит 14 ед. повреждения каждый раунд."," Уменьшает эффективность лечения на 30%"]
		}]
	}],
	"ingredients":{
		"light_metals":1,
		"chemicals":10
	}
}