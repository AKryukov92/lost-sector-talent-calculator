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
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"Первая помощь",
			description:"Позволяет использовать таблетки и инъекции ребиса.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Штурмовые гранаты",
			description:"Позволяет пользоваться простыми штурмовыми гранатами.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Стимуляторы",
			description:"Позволяет использовать стероидные и адреналиновые препараты.",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Патронташ",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1.",
			lvlreq:5,
			column:2
		},
		{
			id:6,
			imageid:6,
			name:"Пистолеты (специалист)",
			description:"Позволяет использовать пистолеты полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:3
		},
		{
			id:10,
			imageid:10,
			name:"Штурмовые винтовки",
			description:"Позволяет использовать штурмовые винтовки полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:43,
			imageid:43,
			name:"Быстрый бег",
			description:"Увеличивает количество очков движения, позволяя передвигаться дальше.",
			effect:"Увеличивает максимум очков движения на 5",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:432,
			imageid:43,
			name:"Быстрый бег",
			description:"Увеличивает количество очков движения, позволяя передвигаться дальше.",
			effect:"Увеличивает максимум очков движения на 8",
			cost:3,
			lvlreq:6,
			rankof:43,
			column:7
		},
		{
			id:433,
			imageid:43,
			name:"Быстрый бег",
			description:"Увеличивает количество очков движения, позволяя передвигаться дальше.",
			effect:"Увеличивает максимум очков движения на 11",
			cost:3,
			lvlreq:7,
			rankof:43,
			column:7
		},
		{
			id:25,
			imageid:25,
			name:"Боевые гранаты",
			description:"Позволяет использовать боевые гранаты.",
			cost:1,
			lvlreq:6,
			talentreq:4,
			column:0
		},
		{
			id:8,
			imageid:8,
			name:"Пистолеты-пулеметы (специалист)",
			description:"позволяет использовать пистолеты-пулеметы полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:54,
			imageid:54,
			name:"Летучка",
			description:"Союзники в указанном радиусе от наемника получают увеличение мобильности на 20% на 1 ход. Не действует на активировавшего намника. Не складывается с эффектом спринта.",
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
			name:"Спринт",
			description:"Увеличивает мобильность наемника на 40% до конца текущего хода.",
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
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 2%",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:452,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 5%",
			cost:2,
			lvlreq:9,
			rankof:45,
			column:9
		},
		{
			id:453,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 10%",
			cost:3,
			lvlreq:12,
			rankof:45,
			column:9
		},
		{
			id:36,
			imageid:36,
			name:"Гермогели",
			description:"Позволяет использовать герметики для восстановления брони в бою.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:38,
			imageid:38,
			name:"Восприимчивость к восстановлению",
			description:"Увеличивает эффективность восстановления своего здоровья и брони.",
			effect:"Увеличивает эффективность лечения на 20%.",
			cost:1,
			lvlreq:7,
			row:7,
			column:7
		},
		{
			id:382,
			imageid:38,
			name:"Восприимчивость к восстановлению",
			description:"Увеличивает эффективность восстановления своего здоровья и брони.",
			effect:"Увеличивает эффективность лечения на 40%.",
			cost:2,
			lvlreq:8,
			rankof:38,
			column:7
		},
		{
			id:15,
			imageid:15,
			name:"Подрывник",
			description:"Позволяет использовать и устанавливать взрывчатку и мины.",
			cost:1,
			lvlreq:8,
			column:1
		},
		{
			id:19,
			imageid:19,
			name:"Пистолеты (профессионал)",
			description:"Позволяет использовать пистолеты армейской или крупнокалиберной классификации.",
			cost:1,
			lvlreq:8,
			talentreq:6,
			column:3
		},
		{
			id:22,
			imageid:22,
			name:"Штурмовые винтовки (профессионал)",
			description:"Позволяет использовать штурмовые винтовки армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:10,
			column:5
		},
		{
			id:20,
			imageid:20,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:70,
			imageid:70,
			name:"Упор",
			description:"Увеличивает точность наемника на 7 в сидячем положении.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:9
		},
		{
			id:75,
			imageid:75,
			name:"Берсеркер",
			description:"При получении наемником 115 повреждений за один ход, увеличивает его очки действий на 20 на 1 ход. Счетчик сбрасывается в начале хода.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:10
		},
		{
			id:48,
			imageid:48,
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 15.",
			cost:1,
			lvlreq:8,
			column:11
		},
		{
			id:482,
			imageid:48,
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 25.",
			cost:3,
			lvlreq:11,
			rankof:48,
			column:11
		},
		{
			id:17,
			imageid:17,
			name:"Химические гранаты",
			description:"Позволяет использовать химические гранаты.",
			cost:1,
			lvlreq:9,
			talentreq:25,
			column:0
		},
		{
			id:26,
			imageid:26,
			name:"Пистолеты-пулеметы (профессионал)",
			description:"Позволяет использовать пистолеты-пулеметы армейской классификации.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:16,
			imageid:16,
			name:"Гранаты-пауки",
			description:"Позволяет использовать гранаты-пауки.",
			cost:1,
			lvlreq:10,
			talentreq:17,
			column:0
		},
		{
			id:63,
			imageid:63,
			name:"Подсумок",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1..",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Заначка",
			description:"Восстанавливает 15 ед. здоровья наемника после использовать активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Быстрые руки",
			description:"Восстанавливает 10 очков действия наемника после использования активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:72,
			imageid:72,
			name:"Пристрелка",
			description:"Увеличивает точность наемника на 8 ед. за каждую его атаку в ход. Эффект суммируется. Счетчик сбрасывается в начале хода.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:6
		},
		{
			id:77,
			imageid:77,
			name:"Счастливая монетка",
			description:"Спасает от одной смертельной пули или взрыва, но оставляет только 50% текущего здоровья и 0% брони, а также вызывает ослепление на 1 ход. Этот урон не учитывается навыками, срабатывающими от полученного урона.",
			cost:1,
			number_of_uses:1,
			lvlreq:10,
			talentreq:38,
			column:7
		},
		{
			id:81,
			imageid:81,
			name:"Злопамятный",
			description:"При получении наемником повреждений, у персонажа, нанесшего ему урон последним, уменьшается общее сопротивление на 15% на 1 ход. Эффект действует, только если  бою присутствует не менее 2 живых противников.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:8
		},
		{
			id:76,
			imageid:76,
			name:"Счетовод",
			description:"20% от полученных повреждений суммируются и прибавляются к атаке наемника. Чем выше бронепробиваемость оружия наемника, тем меньше бонус. Счетчик сбрасывается после успешной атаки.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			column:11
		},
		{
			id:86,
			imageid:86,
			name:"Стрелять до конца",
			description:"Следующая атака после активации потратит все ваши ОД, но будет иметь повышенный на 50% шанс критического попадания. Шанс считается для каждой пули отдельно. Для активации можно использовать очки движения.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			AP_cost:1,
			column:12
		},
		{
			id:51,
			imageid:51,
			name:"Эксперт по оружию",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 5%",
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
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"Первая помощь",
			description:"Позволяет использовать таблетки и инъекции ребиса.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Штурмовые гранаты",
			description:"Позволяет пользоваться простыми штурмовыми гранатами.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Стимуляторы",
			description:"Позволяет использовать стероидные и адреналиновые препараты.",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Патронташ",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1.",
			lvlreq:5,
			column:2
		},
		{
			id:9,
			imageid:9,
			name:"Щиты (специалист)",
			description:"Позволяет использовать щиты полицейской классификации.",
			cost:2,
			lvlreq:5,
			column:3
		},
		{
			id:11,
			imageid:11,
			name:"Пулеметы (специалист)",
			description:"Позволяет использовать пулеметы полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:39,
			imageid:39,
			name:"Стойкий",
			description:"Добавляет базовое сопротивление любому урону.",
			effect:"Увеличивает общую стойкость к урону на 5%",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:392,
			imageid:39,
			name:"Стойкий",
			description:"Добавляет базовое сопротивление любому урону.",
			effect:"Увеличивает общую стойкость к урону на 7%",
			cost:3,
			lvlreq:6,
			column:7,
			rankof:39
		},
		{
			id:7,
			imageid:7,
			name:"Холодное оружие (специалист)",
			description:"Позволяет использовать холодное оружие полицейской классификации.",
			lvlreq:6,
			cost:1,
			column:3
		},
		{
			id:8,
			imageid:8,
			name:"Пистолеты-пулеметы (специалист)",
			description:"позволяет использовать пистолеты-пулеметы полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:56,
			imageid:56,
			name:"Нянька",
			description:"Все союзники в указанном радиусе от наемника получают бонус 10% общего сопротивления к урону. Сам наемник бонус не получает.",
			cost:1,
			lvlreq:6,
			talentreq:39,
			column:7,
			radius:20
		},
		{
			id:57,
			imageid:57,
			name:"Глухая оборона",
			description:"Увеличивает общее сопротивление наемника на 40% на 1 ход, при этом боец теряет способность видеть врага.",
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
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 15.",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:482,
			imageid:48,
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 25.",
			cost:2,
			lvlreq:9,
			rankof:48,
			column:9
		},
		{
			id:483,
			imageid:48,
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 35.",
			cost:4,
			lvlreq:13,
			rankof:48,
			column:9
		},
		{
			id:25,
			imageid:25,
			name:"Боевые гранаты",
			description:"Позволяет использовать боевые гранаты.",
			cost:2,
			lvlreq:7,
			talentreq:4,
			column:0
		},
		{
			id:36,
			imageid:36,
			name:"Гермогели",
			description:"Позволяет использовать герметики для восстановления брони в бою.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:23,
			imageid:23,
			name:"Пулеметы (профессионал)",
			description:"Позволяет использовать пулеметы армейской классификации.",
			cost:1,
			lvlreq:7,
			talentreq:11,
			column:5
		},
		{
			id:38,
			imageid:38,
			name:"Восприимчивость к восстановлению",
			description:"Увеличивает эффективность восстановления своего здоровья и брони.",
			effect:"Увеличивает эффективность лечения на 20%.",
			cost:1,
			lvlreq:7,
			row:7,
			column:7
		},
		{
			id:382,
			imageid:38,
			name:"Восприимчивость к восстановлению",
			description:"Увеличивает эффективность восстановления своего здоровья и брони.",
			effect:"Увеличивает эффективность лечения на 40%.",
			cost:2,
			lvlreq:8,
			rankof:38,
			column:7
		},
		{
			id:383,
			imageid:38,
			name:"Восприимчивость к восстановлению",
			description:"Увеличивает эффективность восстановления своего здоровья и брони.",
			effect:"Увеличивает эффективность лечения на 60%.",
			cost:3,
			lvlreq:10,
			rankof:38,
			column:7
		},
		{
			id:44,
			imageid:44,
			name:"Искусство боя",
			description:"Увеличивает наносимый урон в ближнем бою.",
			effect:"Увеличивает урон в ближнем бою на 20%",
			cost:1,
			lvlreq:8,
			column:0
		},
		{
			id:442,
			imageid:44,
			name:"Искусство боя",
			description:"Увеличивает наносимый урон в ближнем бою.",
			effect:"Увеличивает урон в ближнем бою на 40%",
			cost:2,
			lvlreq:11,
			rankof:44,
			column:0
		},
		{
			id:20,
			imageid:20,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:71,
			imageid:71,
			name:"Сошки",
			description:"Увеличивает точность наемника на 10 ед., при этом снижая его мобильность в 10 раз. Действует до конца текущего хода.",
			cost:1,
			lvlreq:8,
			talentreq:48,
			AP_cost:10,
			column:9
		},
		{
			id:84,
			imageid:84,
			name:"Без зазоров",
			description:"Критические атаки не наносят наемнику дополнительных повреждений.",
			cost:1,
			lvlreq:8,
			talentreq:48,
			column:10
		},
		{
			id:26,
			imageid:26,
			name:"Пистолеты-пулеметы (профессионал)",
			description:"Позволяет использовать пистолеты-пулеметы армейской классификации.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:63,
			imageid:63,
			name:"Подсумок",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1..",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Заначка",
			description:"Восстанавливает 15 ед. здоровья наемника после использовать активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Быстрые руки",
			description:"Восстанавливает 10 очков действия наемника после использования активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:74,
			imageid:74,
			name:"Сбросить лишнее",
			description:"Увеличивает мобильность наемника на 15% при падении очков брони ниже 40.",
			cost:1,
			lvlreq:10,
			talentreq:38,
			column:7
		},
		{
			id:77,
			imageid:77,
			name:"Счастливая монетка",
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
			name:"Мученик",
			description:"При получении суммарно 200 повреждений, всем прочим бойцам вашей команды выдается бонус 20% общего сопротивления на 1 ход. Счетчик сбрасывается при срабатывании.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:0
		},
		{
			id:81,
			imageid:81,
			name:"Злопамятный",
			description:"When the mercenary receives damage, the unit that dealth that damage, receives a 15% decrease of general resistance for 1 round. The effect is only valid, if at the battle there are not less than 2 enemies alive.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:1
		},
		{
			id:51,
			imageid:51,
			name:"Эксперт по оружию",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 5%",
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
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"Первая помощь",
			description:"Позволяет использовать таблетки и инъекции ребиса.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Штурмовые гранаты",
			description:"Позволяет пользоваться простыми штурмовыми гранатами.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Стимуляторы",
			description:"Позволяет использовать стероидные и адреналиновые препараты.",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:3,
			imageid:3,
			name:"Тактические гранаты",
			description:"Позволяет использовать тактические гранаты по типу ребис и ЭМ гранат.",
			cost:1,
			lvlreq:5,
			talentreq:4,
			column:0
		},
		{
			id:62,
			imageid:62,
			name:"Патронташ",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1.",
			lvlreq:5,
			column:2
		},
		{
			id:6,
			imageid:6,
			name:"Пистолеты (специалист)",
			description:"Позволяет использовать пистолеты полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:4
		},
		{
			id:13,
			imageid:13,
			name:"Снайперские винтовки (специалист)",
			description:"Позволяет использовать снайперские винтовки полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:6
		},
		{
			id:47,
			imageid:47,
			name:"Эксперт по баллистике",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 5%",
			cost:1,
			lvlreq:5,
			column:9
		},
		{
			id:472,
			imageid:47,
			name:"Эксперт по баллистике",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 8%",
			cost:3,
			lvlreq:8,
			rankof:47,
			column:9
		},
		{
			id:473,
			imageid:47,
			name:"Эксперт по баллистике",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 10%",
			cost:3,
			lvlreq:11,
			rankof:47,
			column:9
		},
		{
			id:5,
			imageid:5,
			name:"Техник (специалист)",
			description:"Позволяет устанавливать простое оборудование в зоне битвы.",
			cost:1,
			lvlreq:6,
			column:3
		},
		{
			id:7,
			imageid:7,
			name:"Холодное оружие (специалист)",
			description:"Позволяет использовать холодное оружие полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:5
		},
		{
			id:45,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 2%",
			cost:1,
			lvlreq:6,
			column:8
		},
		{
			id:452,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 5%",
			cost:2,
			lvlreq:7,
			rankof:45,
			column:8
		},
		{
			id:453,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 10%",
			cost:2,
			lvlreq:10,
			rankof:45,
			column:8
		},
		{
			id:454,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 15%",
			cost:3,
			lvlreq:13,
			rankof:45,
			column:8
		},
		{
			id:58,
			imageid:58,
			name:"Тактическая оценка",
			description:"Уменьшает общее сопротивление выбранного противника на 30% на 1 ход.",
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
			name:"Концентрация",
			description:"Увеличивает наносимый урон на 20% до конца хода и снимает 20 ОД на следующем ходу.",
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
			name:"Гермогели",
			description:"Позволяет использовать герметики для восстановления брони в бою.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:43,
			imageid:43,
			name:"Быстрый бег",
			description:"Увеличивает количество очков движения, позволяя передвигаться дальше.",
			effect:"Увеличивает максимум очков движения на 5",
			cost:1,
			lvlreq:7,
			column:5
		},
		{
			id:19,
			imageid:19,
			name:"Пистолеты (профессионал)",
			description:"Позволяет использовать пистолеты армейской или крупнокалиберной классификации.",
			cost:1,
			lvlreq:8,
			talentreq:6,
			column:4
		},
		{
			id:24,
			imageid:24,
			name:"Снайперские винтовки (профессионал)",
			description:"Позволяет использовать снайперские винтовки армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:13,
			column:6
		},
		{
			id:44,
			imageid:44,
			name:"Искусство боя",
			description:"Увеличивает наносимый урон в ближнем бою.",
			effect:"Увеличивает урон в ближнем бою на 20%",
			cost:1,
			lvlreq:8,
			column:7
		},
		{
			id:442,
			imageid:44,
			name:"Искусство боя",
			description:"Увеличивает наносимый урон в ближнем бою.",
			effect:"Увеличивает урон в ближнем бою на 40%",
			cost:3,
			lvlreq:11,
			rankof:44,
			column:7
		},
		{
			id:70,
			imageid:70,
			name:"Упор",
			description:"Увеличивает точность наемника на 7 в сидячем положении.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			column:8
		},
		{
			id:73,
			imageid:73,
			name:"Подавляющая высота",
			description:"Увеличивает шанс критической атаки на 30% по цели, находящейся на 2 или более метров ниже наемника. Шанс считается для каждой пули отдельно.",
			cost:1,
			lvlreq:8,
			talentreq:45,
			radius:2,
			column:9
		},
		{
			id:17,
			imageid:17,
			name:"Химические гранаты",
			description:"Позволяет использовать химические гранаты..",
			cost:1,
			lvlreq:9,
			talentreq:3,
			column:0
		},
		{
			id:16,
			imageid:16,
			name:"Гранаты-пауки",
			description:"Позволяет использовать гранаты-пауки.",
			cost:1,
			lvlreq:10,
			talentreq:17,
			column:0
		},
		{
			id:63,
			imageid:63,
			name:"Подсумок",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1..",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:1
		},
		{
			id:64,
			imageid:64,
			name:"Заначка",
			description:"Восстанавливает 15 ед. здоровья наемника после использовать активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Быстрые руки",
			description:"Восстанавливает 10 очков действия наемника после использования активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:72,
			imageid:72,
			name:"Пристрелка",
			description:"Увеличивает точность наемника на 8 ед. за каждую его атаку в ход. Эффект суммируется. Счетчик сбрасывается в начале хода.",
			cost:1,
			lvlreq:10,
			talentreq:43,
			column:4
		},
		{
			id:85,
			imageid:85,
			name:"Критический урон",
			description:"Увеличивает повреждения от критических атак наемника.",
			effect:"Устанавливает множитель урона от крит. попаданий равным 2",
			cost:1,
			lvlreq:10,
			talentreq:43,
			column:5
		},
		{
			id:86,
			imageid:86,
			name:"Стрелять до конца",
			description:"Следующая атака после активации потратит все ваши ОД, но будет иметь повышенный на 50% шанс критического попадания. Шанс считается для каждой пули отдельно. Для активации можно использовать очки движения.",
			cost:1,
			lvlreq:10,
			talentreq:43,
			AP_cost:1,
			column:6
		},
		{
			id:71,
			imageid:71,
			name:"Сошки",
			description:"Увеличивает точность наемника на 10 ед., при этом снижая его мобильность в 10 раз. Действует до конца текущего хода.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			AP_cost:10,
			column:7
		},
		{
			id:82,
			imageid:82,
			name:"Справедливый суд",
			description:"При убийстве наемником врага, все союзники (кроме него) получают бонус в 20% мобильности на 1 ход. Эффект не суммируется.",
			cost:1,
			lvlreq:12,
			talentreq:44,
			column:8
		},
		{
			id:51,
			imageid:51,
			name:"Эксперт по оружию",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 5%",
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
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1,
			column:0
		},
		{
			id:2,
			imageid:2,
			name:"Первая помощь",
			description:"Позволяет использовать таблетки и инъекции ребиса.",
			cost:1,
			lvlreq:1,
			column:1
		},
		{
			id:4,
			imageid:4,
			name:"Штурмовые гранаты",
			description:"Позволяет пользоваться простыми штурмовыми гранатами.",
			cost:1,
			lvlreq:3,
			column:0
		},
		{
			id:3,
			imageid:3,
			name:"Тактические гранаты",
			description:"Позволяет использовать тактические гранаты по типу ребис и ЭМ гранат.",
			cost:1,
			lvlreq:5,
			talentreq:4,
			column:0
		},
		{
			id:35,
			imageid:35,
			name:"Стимуляторы",
			description:"Позволяет использовать стероидные и адреналиновые препараты.",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		},
		{
			id:62,
			imageid:62,
			name:"Патронташ",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1.",
			lvlreq:5,
			column:2
		},
		{
			id:12,
			imageid:12,
			name:"Пусковые установки (специалист)",
			description:"Позволяет использовать пусковые установки полицейской классификации.",
			cost:1,
			lvlreq:5,
			column:5
		},
		{
			id:42,
			imageid:42,
			name:"Взрывостойкий",
			description:"Добавляет базовое сопротивление взрывам.",
			effect:"Увеличивает сопротивление взрывам на 5%",
			cost:1,
			lvlreq:5,
			column:7
		},
		{
			id:422,
			imageid:42,
			name:"Взрывостойкий",
			description:"Добавляет базовое сопротивление взрывам.",
			effect:"Увеличивает сопротивление взрывам на 10%",
			cost:2,
			lvlreq:8,
			rankof:42,
			column:7
		},
		{
			id:423,
			imageid:42,
			name:"Взрывостойкий",
			description:"Добавляет базовое сопротивление взрывам.",
			effect:"Увеличивает сопротивление взрывам на 15%",
			cost:3,
			lvlreq:11,
			rankof:42,
			column:7
		},
		{
			id:5,
			imageid:5,
			name:"Техник (специалист)",
			description:"Позволяет устанавливать простое оборудование в зоне битвы.",
			cost:1,
			lvlreq:6,
			column:3
		},
		{
			id:8,
			imageid:8,
			name:"Пистолеты-пулеметы (специалист)",
			description:"позволяет использовать пистолеты-пулеметы полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:4
		},
		{
			id:14,
			imageid:14,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики полицейской классификации.",
			cost:1,
			lvlreq:6,
			column:6
		},
		{
			id:60,
			imageid:60,
			name:"Восстановление",
			description:"Восстанавливает 35 ед. брони и 35 ед. здоровья союзному наемнику.",
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
			name:"Чутье",
			description:"Наемник чувствует присутствие противников рядом.",
			cost:1,
			lvlreq:6,
			talentreq:42,
			radius:15,
			column:8
		},
		{
			id:41,
			imageid:41,
			name:"Огнеупорный",
			description:"Добавляет базовое сопротивление огню.",
			effect:"Увеличивает сопротивление огню на 7%",
			cost:1,
			lvlreq:6,
			column:9
		},
		{
			id:412,
			imageid:41,
			name:"Огнеупорный",
			description:"Добавляет базовое сопротивление огню.",
			effect:"Увеличивает сопротивление огню на 12%",
			cost:2,
			lvlreq:9,
			rankof:41,
			column:9
		},
		{
			id:413,
			imageid:41,
			name:"Огнеупорный",
			description:"Добавляет базовое сопротивление огню.",
			effect:"Увеличивает сопротивление огню на 20%",
			cost:3,
			lvlreq:12,
			rankof:41,
			column:9
		},
		{
			id:36,
			imageid:36,
			name:"Гермогели",
			description:"Позволяет использовать герметики для восстановления брони в бою.",
			cost:1,
			lvlreq:7,
			talentreq:35,
			column:1
		},
		{
			id:18,
			imageid:18,
			name:"Техник (профессионал)",
			description:"Позволяет устанавливать сложное оборудование в зоне битвы.",
			cost:1,
			lvlreq:7,
			talentreq:5,
			column:3
		},
		{
			id:40,
			imageid:40,
			name:"Химзащита",
			description:"Добавляет базовое сопротивление кислоте.",
			effect:"Увеличивает сопротивление кислоте на 10%",
			cost:1,
			lvlreq:7,
			column:7
		},
		{
			id:402,
			imageid:40,
			name:"Химзащита",
			description:"Добавляет базовое сопротивление кислоте.",
			effect:"Увеличивает сопротивление кислоте на 20%",
			cost:2,
			lvlreq:10,
			rankof:40,
			column:7
		},
		{
			id:403,
			imageid:40,
			name:"Химзащита",
			description:"Добавляет базовое сопротивление кислоте.",
			effect:"Увеличивает сопротивление кислоте на 30%",
			cost:3,
			lvlreq:13,
			rankof:40,
			column:7
		},
		{
			id:17,
			imageid:17,
			name:"Химические гранаты",
			description:"Позволяет использовать химические гранаты..",
			cost:1,
			lvlreq:8,
			talentreq:3,
			column:0
		},
		{
			id:15,
			imageid:15,
			name:"Подрывник",
			description:"Позволяет использовать и устанавливать взрывчатку и мины.",
			cost:1,
			lvlreq:8,
			column:1
		},
		{
			id:21,
			imageid:21,
			name:"Пусковые установки (профессионал)",
			description:"Позволяет использовать пусковые установки армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:12,
			column:5
		},
		{
			id:20,
			imageid:20,
			name:"Дробовики (специалист)",
			description:"Позволяет использовать дробовики армейской классификации.",
			cost:1,
			lvlreq:8,
			talentreq:14,
			column:6
		},
		{
			id:72,
			imageid:72,
			name:"Пристрелка",
			description:"Увеличивает точность наемника на 8 ед. за каждую его атаку в ход. Эффект суммируется. Счетчик сбрасывается в начале хода.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:8
		},
		{
			id:78,
			imageid:78,
			name:"Открывашка",
			description:"Первая пуля, снаряд, граната или удар по цели с полной броней наносит 140% повреждений.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:9
		},
		{
			id:83,
			imageid:83,
			name:"Чувство локтя",
			description:"Если рядом с наемником есть союзник, оба наносят на 10% урона больше.",
			cost:1,
			lvlreq:8,
			talentreq:41,
			column:10
		},
		{
			id:46,
			imageid:46,
			name:"Личная броня",
			description:"Увеличивает базовое количество брони.",
			effect:"Увеличивает запас брони на 10",
			cost:1,
			lvlreq:8,
			column:11
		},
		{
			id:16,
			imageid:16,
			name:"Гранаты-пауки",
			description:"Позволяет использовать гранаты-пауки.",
			cost:1,
			lvlreq:9,
			talentreq:17,
			column:0
		},
		{
			id:26,
			imageid:26,
			name:"Пистолеты-пулеметы (профессионал)",
			description:"Позволяет использовать пистолеты-пулеметы армейской классификации.",
			cost:1,
			lvlreq:9,
			talentreq:8,
			column:4
		},
		{
			id:63,
			imageid:63,
			name:"Подсумок",
			description:"Открывает одну ячейку для активных предметов.",
			effect:"Увеличивает количество активных слотов на 1..",
			cost:1,
			lvlreq:10,
			column:0
		},
		{
			id:64,
			imageid:64,
			name:"Заначка",
			description:"Восстанавливает 15 ед. здоровья наемника после использовать активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:2
		},
		{
			id:65,
			imageid:65,
			name:"Быстрые руки",
			description:"Восстанавливает 10 очков действия наемника после использования активного предмета.",
			cost:1,
			lvlreq:10,
			talentreq:62,
			column:3
		},
		{
			id:56,
			imageid:56,
			name:"Нянька",
			description:"Все союзники в указанном радиусе от наемника получают бонус 10% общего сопротивления к урону. Сам наемник бонус не получает.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			radius:20,
			column:6
		},
		{
			id:75,
			imageid:75,
			name:"Берсеркер",
			description:"При получении наемником 115 повреждений за один ход, увеличивает его очки действий на 20 на 1 ход. Счетчик сбрасывается в начале хода.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			column:7
		},
		{
			id:76,
			imageid:76,
			name:"Счетовод",
			description:"20% от полученных повреждений суммируются и прибавляются к атаке наемника. Чем выше бронепробиваемость оружия наемника, тем меньше бонус. Счетчик сбрасывается после успешной атаки.",
			cost:1,
			lvlreq:10,
			talentreq:40,
			column:8
		},
		{
			id:74,
			imageid:74,
			name:"Сбросить лишнее",
			description:"Увеличивает мобильность наемника на 15% при падении очков брони ниже 40.",
			cost:1,
			lvlreq:12,
			talentreq:46,
			column:11
		},
		{
			id:79,
			imageid:79,
			name:"Вендетта",
			description:"При смерти члена вашей команды увеличивает наносимый урон всеми бойцами команды на 15% на 1 ход. Эффект не суммируется.",
			cost:1,
			lvlreq:12,
			talentreq:46,
			column:12
		},
		{
			id:51,
			imageid:51,
			name:"Эксперт по оружию",
			description:"Увеличивает наносимый урон.",
			effect:"Увеличивает наносимый урон (кроме ближнего боя) на 5%",
			lvlreq:14,
			column:0
		}
		]
	}
}
