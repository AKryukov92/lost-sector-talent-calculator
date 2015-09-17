{
	"name":"Сигнальная ракетница",
	"category":"pistol",
	"mobility":100,
	"clip":1,
	"ammo":3,
	"reload_cost":45,
	"id":525,
	"attacks":[{
		"name":"Удар",
		"type":1,
		"accuracy":90,
		"cost":40,
		"min_dist":0,
		"max_dist":1.5,
		"min_damage":10,
		"max_damage":25
	},{
		"name":"Навскидку",
		"type":2,
		"accuracy":52,
		"cost":50,
		"min_dist":8,
		"max_dist":30,
		"bullets":1,
		"min_damage":20,
		"max_damage":62,
		"specials":[{
			"duration":3,
			"effects":[
				"Наносит 14 ед. повреждения каждый раунд.",
				"Уменьшает эффективность лечения на 30%"
			]
		}]
	}],
	"ingredients":0
}