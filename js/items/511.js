{
	"id":511,
	"name":"Ребис граната Б (Инертный Ребис)",
	"category":"consumable",
	"consumable_type":4,
	"description":"Создает облако инертного ребиса, которое существует в течении 2х раундов. Персонаж, завершивший ход внутри облака получает эффект:",
	"lvlreq":5,
	"skillreq":3,
	"attacks":[
	{
		"name":"Бросок",
		"accuracy":50,
		"radius":5,
		"cost":40,
		"min_dist":0,
		"max_dist":15,
		"specials":[
		{
			"duration":1,
			"description":"Увеличивает текущее здоровье на 40"
		},
		{
			"duration":0,
			"description":"Дает иммунитет к: Горение"
		}]
	}]
}