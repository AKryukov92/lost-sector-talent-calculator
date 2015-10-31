{
	"name":{"ru":"Реактивный Огнемет М202А2",
		"en":"M202A2 Flame Rockets Launcher"},
	"category":"launcher",
	"mobility":62,
	"clip":4,
	"ammo":4,
	"reload_cost":65,
	"lvlreq":10,
	"talentreq":21,
	"description":{
		"ru":"Поджигает землю в месте взрыва. Понижает сопротивление огню для следующих атак.",
		"en":"Ignites the ground at the explosion area. Decreases fire resistance for next attacks."
	},
	"classreq":["su"],
	"id":527,
	"attacks":[{
		"name":{"ru":"Удар","en":"Hit"},
		"type":1,
		"min_damage":25,
		"max_damage":40,
		"accuracy":90,
		"cost":45,
		"min_dist":0,
		"max_dist":1.8
	},{
		"name":{"ru":"Навскидку","en":"Snap"},
		"type":9,
		"min_damage":18,
		"max_damage":36,
		"radius":2,
		"accuracy":55,
		"bullets":1,
		"cost":45,
		"min_dist":15,
		"max_dist":60
	}],
	"ingredients":0
}