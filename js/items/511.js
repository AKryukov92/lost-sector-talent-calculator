{
	"id":511,
	"name":"Ребис граната Б (Инертный Ребис)",
	"category":"consumable",
	"consumable_type":4,
	"description":"Создает облако инертного ребиса, которое существует в течении 2х раундов. Персонаж, завершивший ход внутри облака получает эффект:",
	"lvlreq":5,
	"talentreq":3,
	"classreq":["sc","su"],
	"attacks":[{
		"name":"Бросок",
		"accuracy":50,
		"radius":5,
		"cost":40,
		"min_dist":0,
		"max_dist":15,
		"specials":[{
			"duration":0,
			"effects":["Дает иммунитет к: Горение"]
		},{
			"duration":1,
			"effects":["Увеличивает текущее здоровье на 40"]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"mech_parts":1,
		"rebis":1
	}
}