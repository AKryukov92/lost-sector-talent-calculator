{
	"name":"MG-36",
	"category":"machinegun",
	"mobility":64,
	"clip":100,
	"ammo":200,
	"reload_cost":30,
	"lvlreq":10,
	"talentreq":23,
	"classreq":["ju"],
	"id":497,
	"attacks":[{
		"name":{"ru":"Удар","en":"Hit"},
		"type":1,
		"accuracy":90,
		"cost":45,
		"min_dist":0,
		"max_dist":1.8,
		"min_damage":30,
		"max_damage":40
	},{
		"name":{"ru":"Навскидку","en":"Snap"},
		"type":5,
		"min_damage":95,
		"max_damage":108,
		"accuracy":64,
		"bullets":12,
		"cost":55,
		"min_dist":18,
		"max_dist":45
	},{
		"name":{"ru":"Очередь","en":"Burst"},
		"type":5,
		"min_damage":188,
		"max_damage":209,
		"accuracy":39,
		"bullets":30,
		"cost":70,
		"min_dist":10,
		"max_dist":25
	}],
	"ingredients":{
		"light_metals":52,
		"heavy_metals":72,
		"mech_parts":43
	}
}