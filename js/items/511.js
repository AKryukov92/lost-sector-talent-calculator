{
	"id":511,
	"name":{
		"ru":"Ребис граната Б (Инертный Ребис)",
		"en":"Rebis Grenade B (Inert Rebis)"
	},
	"category":"consumable",
	"consumable_type":3,
	"description":{
		"ru":"Создает облако инертного ребиса, которое существует в течении 2х раундов. Персонаж, завершивший ход внутри облака получает эффект:",
		"en":"Creates a cloud of inert rebis, which lasts for 2 rounds. A character who finished the turn inside the cloud receives an effect:"
	},
	"lvlreq":5,
	"talentreq":3,
	"classreq":["sc","su"],
	"attacks":[{
		"name":{"ru":"Бросок","en":"Throw"},
		"accuracy":50,
		"radius":5,
		"cost":40,
		"min_dist":0,
		"max_dist":15,
		"specials":[{
			"duration":0,
			"effects":[{
				"ru":"Дает иммунитет к: Горение",
				"en":"Gives immunity to: Burning"
			}]
		},{
			"duration":1,
			"effects":[{
				"ru":"Увеличивает текущее здоровье на 40",
				"en":"Increases current health for 40"
			}]
		}]
	}],
	"ingredients":{
		"light_metals":2,
		"mech_parts":1,
		"rebis":1
	}
}