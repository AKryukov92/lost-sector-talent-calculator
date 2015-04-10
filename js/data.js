var patchdata = {
	game_version: 98,
	data_version: 1,
	assault_data:{
		prefix:"as",
		grid_height:11,
		rows:[
			{ level:1 },
			{ level:3 },
			{ level:4 },
			{ level:5 },
			{ level:6 },
			{ level:7 },
			{ level:8 },
			{ level:9 },
			{ level:10 },
			{ level:12 },
			{ level:14 }
		],
		talents:[
		{
			id:1,
			imageid:1,
			name:"Passive regeneration",
			description:"Slow health regeneration in peaceful locations (Factory and etc.).",
			effect:"Multiplies regeneration by 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"First aid",
			description:"Allows the use of pills and injections of Rebis.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Assault grenades",
			description:"Allows you to use simple assault grenades in combat.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Stimulants",
			description:"Allows you to use steroid and adrenaline drugs in the battle",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Bandolier",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1",
			lvlreq:5,
			column:2
		},
		{
			id:6,
			imageid:6,
			name:"Pistols",
			description:"Pistols using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:3
		},
		{
			id:10,
			imageid:10,
			name:"Assault rifles",
			description:"Assault Rifles using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:43,
			imageid:43,
			name:"Fast running",
			description:"Increases the amount of MP (yellow movement points) allowing to move further.",
			effect:"Increases maximum of move points for 5",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:432,
			imageid:43,
			name:"Fast running",
			description:"Increases the amount of MP (yellow movement points) allowing to move further.",
			effect:"Increases maximum of move points for 8",
			cost:3,
			lvlreq:6,
			rankof:43,
			column:7
		},
		{
			id:433,
			imageid:43,
			name:"Fast running",
			description:"Increases the amount of MP (yellow movement points) allowing to move further.",
			effect:"Increases maximum of move points for 11",
			cost:3,
			lvlreq:7,
			rankof:43,
			column:7
		},
		{
			id:25,
			imageid:25,
			name:"Battle grenades",
			description:"All you to use combat grenades.",
			cost:1,
			lvlreq:6,
			talentreq:4,
			column:0
		},
		{
			id:8,
			imageid:8,
			name:"Sub-machine guns (specialist)",
			description:"Sub-machine guns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Shotguns (specialist)",
			description:"Shotguns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:54,
			imageid:54,
			name:"Inspiration",
			description:"All your allies in the specified range from the mercenary receive increased mobility by 20% for 1 turn. Does not apply on the activating mercenary. Does not stack with the spring effect.",
			cost:1,
			lvlreq:6,
			talentreq:43,
			number_of_uses:2,
			AP_cost:20,
			radius:20,
			column:7
		},
		{
			id:55,
			imageid:55,
			name:"Sprint",
			description:"In mercenary's mobility by 40% until the end of the turn.",
			cost:1,
			lvlreq:6,
			talentreq:43,
			number_of_uses:2,
			AP_cost:20,
			column:8
		},
		{
			id:45,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 2%",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:452,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 5%",
			cost:2,
			lvlreq:9,
			rankof:45,
			column:9
		},
		{
			id:453,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 10%",
			cost:3,
			lvlreq:12,
			rankof:45,
			column:9
		},
		{
			id:36,
			imageid:36,
			name:"Hermogel",
			description:"Allows you to use hermetic to repair the armor in the battle.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:38,
			imageid:38,
			name:"Perceptivity to recovery",
			description:"Increases the incoming recovering of health and armor.",
			effect:"Increases healing effectiveness for 20%.",
			cost:1,
			lvlreq:7,
			row:7,
			column:7
		},
		{
			id:382,
			imageid:38,
			name:"Perceptivity to recovery",
			description:"Increases the incoming recovering of health and armor.",
			effect:"Increases healing effectiveness for 40%.",
			cost:2,
			lvlreq:8,
			rankof:38,
			column:7
		},
		{
			id:15,
			imageid:15,
			name:"Demolisher",
			description:"Explosives and mines setting and using skill.",
			cost:1,
			lvlreq:8,
			column:1
		},
		{
			id:19,
			imageid:19,
			name:"Pistols (professional)",
			description:"Pistols using skill of military or large-caliber classification.",
			cost:1,
			lvlreq:8,
			talentreq:6,
			column:3
		},
		{
			id:22,
			imageid:22,
			name:"Assault Rifles (professional)",
			description:"Assault Rifles using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:10,
			column:5
		},
		{
			id:20,
			imageid:20,
			name:"Shotguns (professional)",
			description:"Shotguns using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:70,
			imageid:70,
			name:"Lean",
			description:"Increases accuracy by 7 units in sitting position.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:9
		},
		{
			id:75,
			imageid:75,
			name:"Berserker",
			description:"When a mercenary receives 115 damage at a turn, increases its AP by 20 for one turn. The counter resets at the beginning of the turn.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:10
		},
		{
			id:48,
			imageid:48,
			name:"Solid",
			description:"Increases the basic amount of health.",
			effect:"Increases health maximum for 15.",
			cost:1,
			lvlreq:8,
			column:11
		},
		{
			id:482,
			imageid:48,
			name:"Solid",
			description:"Increases the basic amount of health.",
			effect:"Increases health maximum for 25.",
			cost:3,
			lvlreq:11,
			rankof:48,
			column:11
		},
		{
			id:17,
			imageid:17,
			name:"Chemical grenades",
			description:"Allows you to use chemical grenades",
			cost:1,
			lvlreq:9,
			talentreq:25,
			column:0
		},
		{
			id:26,
			imageid:26,
			name:"Sub-machine guns (professional)",
			description:"Sub-machine guns using skill of military classification.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:16,
			imageid:16,
			name:"Spider grenades",
			description:"Allows you to use spider grenades.",
			cost:1,
			lvlreq:10,
			talentreq:17,
			column:0
		},
		{
			id:63,
			imageid:63,
			name:"Pouch",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Stash",
			description:"Recovers 15 health units after using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Quick hands",
			description:"Restores 10 AP afte using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:72,
			imageid:72,
			name:"Adjustment fire",
			description:"Increases the mercenary's accuracy by 8 for each of his hits at a turn. The effect stacks. The counter resets at the beginning of the turn.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:6
		},
		{
			id:77,
			imageid:77,
			name:"Lucky coin",
			description:"Once per battle saves life by reducing the damage of one bullet, explosion or melee hit, which had to kill the mercenary, leaving 50% of the current health and 0% armor.",
			cost:1,
			number_of_uses:1,
			lvlreq:10,
			talentreq:38,
			column:7
		},
		{
			id:81,
			imageid:81,
			name:"Vindictive",
			description:"When the mercenary receives damage, the unit that dealt that damage, receives a 15% decrease of general resistance for 1 round. The effect is only valid, if at the battle there are not less than 2 enemies alive.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:8
		},
		{
			id:76,
			imageid:76,
			name:"Accountant",
			description:"20% of taken damage are summed and added to the mercenary attack. Bonus depends on armour-penetrating ability. The counter is reset after a succesful attack.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			column:11
		},
		{
			id:86,
			imageid:86,
			name:"Shoot 'till the end",
			description:"If after the attack remains less than 0 of total AP the attack has increased by 50% chance of critical hit. The chance is calculated for each bullet separately.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			AP_cost:1,
			column:12
		},
		{
			id:51,
			imageid:51,
			name:"Weapon expert",
			description:"Increases inflicting damage",
			effect:"Increases damage multiplier (except melee) for 5%",
			lvlreq:14,
			column:0
		}
		]
	},
	juggernaut_data:{
		prefix:"ju",
		grid_height:11,
		rows:[
			{ level:1 },
			{ level:3 },
			{ level:4 },
			{ level:5 },
			{ level:6 },
			{ level:7 },
			{ level:8 },
			{ level:9 },
			{ level:10 },
			{ level:12 },
			{ level:14 }
		],
		talents:[
		{
			id:1,
			imageid:1,
			name:"Passive regeneration",
			description:"Slow health regeneration in peaceful locations (Factory and etc.).",
			effect:"Multiplies regeneration by 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"First aid",
			description:"Allows the use of pills and injections of Rebis.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Assault grenades",
			description:"Allows you to use simple assault grenades in combat.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Stimulants",
			description:"Allows you to use steroid and adrenaline drugs in the battle",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Bandolier",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1",
			lvlreq:5,
			column:2
		},
		{
			id:9,
			imageid:9,
			name:"Shields (specialist)",
			description:"Shields using skill of police classification.",
			cost:2,
			lvlreq:5,
			column:3
		},
		{
			id:11,
			imageid:11,
			name:"Machine guns (specialist)",
			description:"Machine guns using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:39,
			imageid:39,
			name:"Staunch",
			description:"Adds basic resistance to any damage.",
			effect:"Increases total resist for 5%",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:392,
			imageid:39,
			name:"Staunch",
			description:"Adds basic resistance to any damage.",
			effect:"Increases total resist for 7%",
			cost:3,
			lvlreq:6,
			column:7,
			rankof:39
		},
		{
			id:7,
			imageid:7,
			name:"Melee weapon(specialist)",
			description:"Melee weapon using skill of police classification.",
			lvlreq:6,
			cost:1,
			column:3
		},
		{
			id:8,
			imageid:8,
			name:"Sub-machine guns (specialist)",
			description:"Sub-machine guns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Shotguns (specialist)",
			description:"Shotguns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:56,
			imageid:56,
			name:"Nanny",
			description:"All allies in the specified range from the mercenary receive 10% bonus to general resistance. The mercenary itself does not receive the bonus.",
			cost:1,
			lvlreq:6,
			talentreq:39,
			column:7,
			radius:20
		},
		{
			id:57,
			imageid:57,
			name:"Blind defense",
			description:"Increase the mercenary's general resistance by 40% for 1 turn, but he is losing the ability to see the enemy.",
			cost:1,
			lvlreq:6,
			AP_cost:20,
			number_of_uses:2,
			talentreq:39,
			column:8
		},
		{
			id:48,
			imageid:48,
			name:"Solid",
			description:"Increases the basic amount of health.",
			effect:"Increases health maximum for 15.",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:482,
			imageid:48,
			name:"Solid",
			description:"Increases the basic amount of health.",
			effect:"Increases health maximum for 25.",
			cost:2,
			lvlreq:9,
			rankof:48,
			column:9
		},
		{
			id:483,
			imageid:48,
			name:"Solid",
			description:"Increases the basic amount of health.",
			effect:"Increases health maximum for 35.",
			cost:4,
			lvlreq:13,
			rankof:48,
			column:9
		},
		{
			id:25,
			imageid:25,
			name:"Battle grenades",
			description:"All you to use combat grenades.",
			cost:2,
			lvlreq:7,
			talentreq:4,
			column:0
		},
		{
			id:36,
			imageid:36,
			name:"Hermogel",
			description:"Allows you to use hermetic to repair the armor in the battle.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:23,
			imageid:23,
			name:"Machine guns (professional)",
			description:"Machine guns using skill of military classification.",
			cost:1,
			lvlreq:7,
			talentreq:11,
			column:5
		},
		{
			id:38,
			imageid:38,
			name:"Perceptivity to recovery",
			description:"Increases the incoming recovering of health and armor.",
			effect:"Increases healing effectiveness for 20%.",
			cost:1,
			lvlreq:7,
			row:7,
			column:7
		},
		{
			id:382,
			imageid:38,
			name:"Perceptivity to recovery",
			description:"Increases the incoming recovering of health and armor.",
			effect:"Increases healing effectiveness for 40%.",
			cost:2,
			lvlreq:8,
			rankof:38,
			column:7
		},
		{
			id:383,
			imageid:38,
			name:"Perceptivity to recovery",
			description:"Increases the incoming recovering of health and armor.",
			effect:"Increases healing effectiveness for 60%.",
			cost:3,
			lvlreq:10,
			rankof:38,
			column:7
		},
		{
			id:44,
			imageid:44,
			name:"Martial art",
			description:"Increases inflicting damage at close combat.",
			effect:"Increases melee damage multiplier for 20%",
			cost:1,
			lvlreq:8,
			column:0
		},
		{
			id:442,
			imageid:44,
			name:"Martial art",
			description:"Increases inflicting damage at close combat.",
			effect:"Increases melee damage multiplier for 40%",
			cost:2,
			lvlreq:11,
			rankof:44,
			column:0
		},
		{
			id:20,
			imageid:20,
			name:"Shotguns (professional)",
			description:"Shotguns using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:71,
			imageid:71,
			name:"Bipods",
			description:"Increases the mercenary's accuracy by 10 units, but reduces his mobility by 10 times. Works until the end of the current turn.",
			cost:1,
			lvlreq:8,
			talentreq:48,
			AP_cost:10,
			column:9
		},
		{
			id:84,
			imageid:84,
			name:"No gaps",
			description:"Critical strikes do not deal additional damage to the mercenary.",
			cost:1,
			lvlreq:8,
			talentreq:48,
			column:10
		},
		{
			id:26,
			imageid:26,
			name:"Sub-machine guns (professional)",
			description:"Sub-machine guns using skill of military classification.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:63,
			imageid:63,
			name:"Pouch",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Stash",
			description:"Recovers 15 health units after using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Quick hands",
			description:"Restores 10 AP afte using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:74,
			imageid:74,
			name:"Put off the ballast",
			description:"Increases the mercenary's mobility by 15% when the armor falls below 40.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:7
		},
		{
			id:77,
			imageid:77,
			name:"Lucky coin",
			description:"Once per battle saves life by reducing the damage of one bullet, explosion or melee hit, which had to kill mercenary, leaving 50% of the current health and 0% armor.",
			number_of_uses:1,
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:8
		},
		{
			id:80,
			imageid:80,
			name:"Martyr",
			description:"When receiving summarily 200 damage, the rest fighters of your team are granted a 20% bonus general resistance for one turn. The counter resets after actuation.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:0
		},
		{
			id:81,
			imageid:81,
			name:"Vindictive",
			description:"When the mercenary receives damage, the unit that dealth that damage, receives a 15% decrease of general resistance for 1 round. The effect is only valid, if at the battle there are not less than 2 enemies alive.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:1
		},
		{
			id:51,
			imageid:51,
			name:"Weapon expert",
			description:"Increases inflicting damage",
			effect:"Increases damage multiplier (except melee) for 5%",
			lvlreq:14,
			column:0
		}
		]
	},
	scout_data:{
		prefix:"sc",
		grid_height:11,
		rows:[
			{ level:1 },
			{ level:3 },
			{ level:4 },
			{ level:5 },
			{ level:6 },
			{ level:7 },
			{ level:8 },
			{ level:9 },
			{ level:10 },
			{ level:12 },
			{ level:14 }
		],
		talents:[
		{
			id:1,
			imageid:1,
			name:"Passive regeneration",
			description:"Slow health regeneration in peaceful locations (Factory and etc.).",
			effect:"Multiplies regeneration by 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"First aid",
			description:"Allows the use of pills and injections of Rebis.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Assault grenades",
			description:"Allows you to use simple assault grenades in combat.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Stimulants",
			description:"Allows you to use steroid and adrenaline drugs in the battle",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:3,
			imageid:3,
			name:"Tactical grenades",
			description:"Allows you to use tactical grenades of Rebis & EM types.",
			cost:1,
			lvlreq:5,
			talentreq:4,
			column:0
		},
		{
			id:62,
			imageid:62,
			name:"Bandolier",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1",
			lvlreq:5,
			column:2
		},
		{
			id:6,
			imageid:6,
			name:"Pistols",
			description:"Pistols using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:4
		},
		{
			id:13,
			imageid:13,
			name:"Sniper rifles",
			description:"Sniper Rifles using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:6
		},
		{
			id:47,
			imageid:47,
			name:"Ballistics expert",
			description:"Increases inflicting damage.",
			effect:"Increases damage multiplier (except melee) for 5%",
			cost:1,
			lvlreq:5,
			column:9
		},
		{
			id:472,
			imageid:47,
			name:"Ballistics expert",
			description:"Increases inflicting damage.",
			effect:"Increases damage multiplier (except melee) for 8%",
			cost:3,
			lvlreq:8,
			rankof:47,
			column:9
		},
		{
			id:473,
			imageid:47,
			name:"Ballistics expert",
			description:"Increases inflicting damage.",
			effect:"Increases damage multiplier (except melee) for 10%",
			cost:3,
			lvlreq:11,
			rankof:47,
			column:9
		},
		{
			id:5,
			imageid:5,
			name:"Technician (specialist)",
			cost:1,
			lvlreq:6,
			column:3
		},
		{
			id:7,
			imageid:7,
			name:"Melee weapon(specialist)",
			description:"Melee weapon using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:5
		},
		{
			id:45,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 2%",
			cost:1,
			lvlreq:6,
			column:8
		},
		{
			id:452,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 5%",
			cost:2,
			lvlreq:7,
			rankof:45,
			column:8
		},
		{
			id:453,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 10%",
			cost:2,
			lvlreq:10,
			rankof:45,
			column:8
		},
		{
			id:454,
			imageid:45,
			name:"Shooting for sure",
			description:"Increases the chance to deal critical damage.",
			effect:"Increases crit.hit chance for 15%",
			cost:3,
			lvlreq:13,
			rankof:45,
			column:8
		},
		{
			id:58,
			imageid:58,
			name:"Tactical estimation",
			description:"Decreases the general resistance of the selected enemy by 30% for one turn.",
			cost:1,
			lvlreq:6,
			talentreq:47,
			AP_cost:60,
			number_of_uses:2,
			radius:100,
			column:9
		},
		{
			id:59,
			imageid:59,
			name:"Concentration",
			description:"Increases mercenary's inflicting damage by 20% on this turn. -20 AP on next turn.",
			cost:1,
			lvlreq:6,
			talentreq:47,
			AP_cost:30,
			number_of_uses:2,
			column:10
		},
		{
			id:36,
			imageid:36,
			name:"Hermogel",
			description:"Allows you to use hermetic to repair the armor in the battle.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:43,
			imageid:43,
			name:"Fast running",
			description:"Increases the amount of MP (yellow movement points) allowing to move further.",
			effect:"Increases maximum of move points for 5",
			cost:1,
			lvlreq:7,
			column:5
		},
		{
			id:19,
			imageid:19,
			name:"Pistols (professional)",
			description:"Pistols using skill of military or large-caliber classification.",
			cost:1,
			lvlreq:8,
			talentreq:6,
			column:4
		},
		{
			id:24,
			imageid:24,
			name:"Sniper Rifles (professional)",
			description:"Sniper Rifles using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:13,
			column:6
		},
		{
			id:44,
			imageid:44,
			name:"Martial art",
			description:"Increases inflicting damage at close combat.",
			effect:"Increases melee damage multiplier for 20%",
			cost:1,
			lvlreq:8,
			column:7
		},
		{
			id:442,
			imageid:44,
			name:"Martial art",
			description:"Increases inflicting damage at close combat.",
			effect:"Increases melee damage multiplier for 40%",
			cost:3,
			lvlreq:11,
			rankof:44,
			column:7
		},
		{
			id:70,
			imageid:70,
			name:"Lean",
			description:"Increases accuracy by 7 units in sitting position.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:8
		},
		{
			id:73,
			imageid:73,
			name:"Overwhelmed height",
			description:"Increases the chance of critical attack by 30% for the target located 2 meters below or more. Change is calculated for each bullet separately.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			radius:2,
			column:9
		},
		{
			id:17,
			imageid:17,
			name:"Chemical grenades",
			description:"Allows you to use chemical grenades.",
			cost:1,
			lvlreq:9,
			talentreq:3,
			column:0
		},
		{
			id:16,
			imageid:16,
			name:"Spider grenades",
			description:"Allows you to use spider grenades.",
			cost:1,
			lvlreq:10,
			talentreq:17,
			column:0
		},
		{
			id:63,
			imageid:63,
			name:"Pouch",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Stash",
			description:"Recovers 15 health units after using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Quick hands",
			description:"Restores 10 AP afte using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:72,
			imageid:72,
			name:"Adjustment fire",
			description:"Increases the mercenary's accuracy by 8 for each of his hits at a turn. The effect stacks. The counter resets at the beginning of the turn.",
			cost:1,
			lvlreq:10,
			talentreq:43,
			column:4
		},
		{
			id:85,
			imageid:85,
			name:"Critical damage",
			description:"Increases the critical damage dealt by the mercenary.",
			cost:1,
			lvlreq:10,
			talentreq:43,
			column:5
		},
		{
			id:86,
			imageid:86,
			name:"Shoot 'till the end",
			description:"If after the attack remains less than 0 of total AP the attack has increased by 50% chance of critical hit. The chance is calculated for each bullet separately.",
			cost:1,
			lvlreq:10,
			talentreq:43,
			AP_cost:1,
			column:6
		},
		{
			id:71,
			imageid:71,
			name:"Bipods",
			description:"Increases the mercenary's accuracy by 10 units, but reduces his mobility by 10 times. Works until the end of the current turn.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			AP_cost:10,
			column:7
		},
		{
			id:82,
			imageid:82,
			name:"Fair verdict",
			description:"When the mercenary kills an enemy all the allies (except of him) get 20% additional mobility for 1 turn. Effect does not stack.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:8
		},
		{
			id:51,
			imageid:51,
			name:"Weapon expert",
			description:"Increases inflicting damage",
			effect:"Increases damage multiplier (except melee) for 5%",
			lvlreq:14,
			column:0
		}
		]
	},
	support_data:{
		prefix:"su",
		grid_height:11,
		rows:[
			{ level:1 },
			{ level:3 },
			{ level:4 },
			{ level:5 },
			{ level:6 },
			{ level:7 },
			{ level:8 },
			{ level:9 },
			{ level:10 },
			{ level:12 },
			{ level:14 }
		],
		talents:[
		{
			id:1,
			imageid:1,
			name:"Passive regeneration",
			description:"Slow health regeneration in peaceful locations (Factory and etc.).",
			effect:"Multiplies regeneration by 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"First aid",
			description:"Allows the use of pills and injections of Rebis.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Assault grenades",
			description:"Allows you to use simple assault grenades in combat.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:3,
			imageid:3,
			name:"Tactical grenades",
			description:"Allows you to use tactical grenades of Rebis & EM types.",
			cost:1,
			lvlreq:5,
			talentreq:4,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Stimulants",
			description:"Allows you to use steroid and adrenaline drugs in the battle",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Bandolier",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1",
			lvlreq:5,
			column:2
		},
		{
			id:12,
			imageid:12,
			name:"Launchers (specialist)",
			description:"Launchers using skill of police classification.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:42,
			imageid:42,
			name:"Explosion resistant",
			description:"Adds basic resistance to explosions.",
			effect:"Increases explosion resist for 5%",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:422,
			imageid:42,
			name:"Explosion resistant",
			description:"Adds basic resistance to explosions.",
			effect:"Increases explosion resist for 10%",
			cost:2,
			lvlreq:8,
			rankof:42,
			column:7
		},
		{
			id:423,
			imageid:42,
			name:"Explosion resistant",
			description:"Adds basic resistance to explosions.",
			effect:"Increases explosion resist for 15%",
			cost:3,
			lvlreq:11,
			rankof:42,
			column:7
		},
		{
			id:5,
			imageid:5,
			name:"Technician (specialist)",
			cost:1,
			lvlreq:6,
			column:3
		},
		{
			id:8,
			imageid:8,
			name:"Sub-machine guns (specialist)",
			description:"Sub-machine guns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Shotguns (specialist)",
			description:"Shotguns using skill of police classification.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:60,
			imageid:60,
			name:"Recovery",
			description:"Recovers 35 armor units and 35 health units to an ally mercenary.",
			cost:1,
			lvlreq:6,
			talentreq:42,
			number_of_uses:3,
			AP_cost:55,
			radius:1,
			column:7
		},
		{
			id:61,
			imageid:61,
			name:"Sense",
			description:"The mercenary feels at the presence of enemies.",
			cost:1,
			lvlreq:6,
			talentreq:42,
			radius:15,
			column:8
		},
		{
			id:41,
			imageid:41,
			name:"Fire resistant",
			description:"Adds basic resistance to fire.",
			effect:"Increases fire resist for 7%",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:412,
			imageid:41,
			name:"Fire resistant",
			description:"Adds basic resistance to fire.",
			effect:"Increases fire resist for 12%",
			cost:2,
			lvlreq:9,
			rankof:41,
			column:9
		},
		{
			id:413,
			imageid:41,
			name:"Fire resistant",
			description:"Adds basic resistance to fire.",
			effect:"Increases fire resist for 20%",
			cost:3,
			lvlreq:12,
			rankof:41,
			column:9
		},
		{
			id:36,
			imageid:36,
			name:"Hermogel",
			description:"Allows you to use hermetic to repair the armor in the battle.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:18,
			imageid:18,
			name:"Technician (professional)",
			description:"Allows you to set up complex equipment in the battle zone.",
			cost:1,
			lvlreq:7,
			talentreq:5,
			column:3
		},
		{
			id:40,
			imageid:40,
			name:"Chemical resistant",
			description:"Adds basic resistance to acid.",
			effect:"Increases acid resist for 10%",
			cost:1,
			lvlreq:7,
			column:7
		},
		{
			id:402,
			imageid:40,
			name:"Chemical resistant",
			description:"Adds basic resistance to acid.",
			effect:"Increases acid resist for 20%",
			cost:2,
			lvlreq:10,
			rankof:40,
			column:7
		},
		{
			id:403,
			imageid:40,
			name:"Chemical resistant",
			description:"Adds basic resistance to acid.",
			effect:"Increases acid resist for 30%",
			cost:3,
			lvlreq:13,
			rankof:40,
			column:7
		},
		{
			id:17,
			imageid:17,
			name:"Chemical grenades",
			description:"Allows you to use chemical grenades.",
			cost:1,
			lvlreq:8,
			talentreq:3,
			column:0
		},
		{
			id:15,
			imageid:15,
			name:"Demolisher",
			description:"Explosives and mines setting and using skill.",
			cost:1,
			lvlreq:8,
			column:1
		},
		{
			id:21,
			imageid:21,
			name:"Launchers (professional)",
			description:"Laun using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:12,
			column:5
		},
		{
			id:20,
			imageid:20,
			name:"Shotguns (professional)",
			description:"Shotguns using skill of military classification.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:72,
			imageid:72,
			name:"Adjustment fire",
			description:"Increases the mercenary's accuracy by 8 for each of his hits at a turn. The effect stacks. The counter resets at the beginning of the turn.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:8
		},
		{
			id:78,
			imageid:78,
			name:"Opener",
			description:"The first bullet, shell, grenade or a hit at a target with full armor deals 140% damage.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:9
		},
		{
			id:83,
			imageid:83,
			name:"Common touch",
			description:"If near the mercenary there is an ally, both apply 10% more damage.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:10
		},
		{
			id:46,
			imageid:46,
			name:"Personal armor",
			description:"Increases basic amount of armor.",
			effect:"Increases defence maximum for 10",
			cost:1,
			lvlreq:8,
			column:11
		},
		{
			id:16,
			imageid:16,
			name:"Spider grenades",
			description:"Allows you to use spider grenades.",
			cost:1,
			lvlreq:9,
			talentreq:17,
			column:0
		},
		{
			id:26,
			imageid:26,
			name:"Sub-machine guns (professional)",
			description:"Sub-machine guns using skill of military classification.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:63,
			imageid:63,
			name:"Pouch",
			description:"Unlocks one cell for active items.",
			effect:"Increases number of active slots for 1.",
			cost:1,
			lvlreq:10,
			column:0
		},
		{
			id:64,
			imageid:64,
			name:"Stash",
			description:"Recovers 15 health units after using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Quick hands",
			description:"Restores 10 AP afte using an active item.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:56,
			imageid:56,
			name:"Nanny",
			description:"All allies in the specified range from the mercenary receive 10% bonus to general resistance. The mercenary itself does not receive the bonus.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			radius:20,
			column:6
		},
		{
			id:75,
			imageid:75,
			name:"Berserker",
			description:"When a mercenary receives 115 damage at a turn, increases its AP by 20 for one turn. The counter resets at the beginning of the turn.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			column:7
		},
		{
			id:76,
			imageid:76,
			name:"Accountant",
			description:"20% of taken damage are summed and added to the mercenary attack. Bonus depends on armour-penetrating ability. The counter is reset after a succesful attack.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			column:8
		},
		{
			id:74,
			imageid:74,
			name:"Put off the ballast",
			description:"Increases the mercenary's mobility by 15% when the armor falls below 40.",
			cost:1,
			lvlreq:12,
			talentreq:46,
			column:11
		},
		{
			id:79,
			imageid:79,
			name:"Vendetta",
			description:"When a member from your team dies, increases inflicting damage to all the team units by 15% for one turn. The effect does not stack.",
			cost:1,
			lvlreq:12,
			talentreq:46,
			column:12
		},
		{
			id:51,
			imageid:51,
			name:"Weapon expert",
			description:"Increases inflicting damage",
			effect:"Increases damage multiplier (except melee) for 5%",
			lvlreq:14,
			column:0
		}
		]
	}
}
