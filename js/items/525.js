{
	"name":{
		"ru":"Сигнальная ракетница",
		"en":"Flare Gun"
	},
	"category":"pistol",
	"mobility":100,
	"clip":1,
	"ammo":3,
	"reload_cost":45,
	"id":525,
	"attacks":[{
		"name":{"ru":"Удар","en":"Hit"},
		"type":1,
		"accuracy":90,
		"cost":40,
		"min_dist":0,
		"max_dist":1.5,
		"min_damage":10,
		"max_damage":25
	},{
		"name":{"ru":"Навскидку","en":"Snap"},
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
			"effects":[{
				"ru":"Наносит 14 ед. повреждения каждый раунд.",
				"en":"Causes 14 damage each round"
			},{
				"ru":"Уменьшает эффективность лечения на 30%",
				"en":"Decreases healing effectiveness for 30%"
			}]
		}]
	}],
	"ingredients":0
}