var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
describe('testing Combinator class', function() {
	var talent1, talent57, talent71, talent86;
	var item324, item401, itemDummy, item607;
	var swap;
	var action57, action71, action86, action401a, action401b, action401r, action607;
	var calculator;
	beforeEach(function() {
		talent1 = {
			id:1,
			imageid:1,
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1,
			column:0
		};
		talent57 = {
			status:1,
			id:57,
			imageid:57,
			name:"Глухая оборона",
			description:"Увеличивает общее сопротивление наемника на 40% на 1 ход, при этом боец теряет способность видеть врага.",
			cost:1,
			lvlreq:6,
			AP_cost:20,
			number_of_uses:2,
			talentreq:391,
			column:8
		};
		action57 = new Action(20, "Глухая оборона", 2);
		action57.imageid = 57;
		talent71 = {
			status:1,
			id:71,
			imageid:71,
			name:"Сошки",
			description:"Увеличивает точность наемника на 10 ед., при этом снижая его мобильность в 10 раз. Действует до конца текущего хода.",
			cost:1,
			lvlreq:8,
			talentreq:481,
			AP_cost:10,
			column:9
		};
		action71 = new Action(10, "Сошки");
		action71.imageid = 71;
		talent86 = {
			status:0,
			id:86,
			imageid:86,
			name:"Стрелять до конца",
			description:"Следующая атака после активации потратит все ваши ОД, но будет иметь повышенный на 50% шанс критического попадания. Шанс считается для каждой пули отдельно. Для активации можно использовать очки движения.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			AP_cost:1,
			column:12
		};
		action86 = new Action(1, "Стрелять до конца");
		action86.imageid = 86;
		item324 = {
			name:"Шлем скаута",
			category:"hat",
			description:"Входит в состав наборов брони для скаута за голд или платину",
			protection:5,
			lvlreq:5,
			classreq:["sc"],
			id:324
		};
		item401 = {
			name:"Дробовик Ремингтон M870",
			category:"shotgun",
			mobility:85,
			clip:3,
			ammo:12,
			reload_cost:20,
			lvlreq:2,
			id:401,
			attacks:[{
				name:"Удар",
				type:1,
				min_damage:20,
				max_damage:30,
				accuracy:90,
				cost:45,
				min_dist:0,
				max_dist:1.5
			},{
				name:"Навскидку",
				type:4,
				min_damage:56,
				max_damage:79,
				accuracy:36,
				bullets:1,
				cost:40,
				min_dist:4,
				max_dist:9
			}]
		};
		action401a = new Action(45, "Удар");
		action401a.imageid = 401;
		action401b = new Action(40, "Навскидку");
		action401b.imageid = 401;
		action401r = new Action(20, "Перезарядка");
		action401r.imageid = 401;
		itemDummy = {
			name:"Болванка с перезарядкой без атак",
			reload_cost:30,
			id:0,
			attacks:[]
		};
		item607 = {
			id:607,
			name:"Запас амуниции",
			category:"consumable",
			consumable_type:3,
			description:"Сбрасывает на землю 2 ящика патронов, которыми любой персонаж может восполнить весь боезапас за 40 ОД",
			lvlreq:5,
			AP_cost:20
		};
		action607 = new Action(20, "Запас амуниции", 1);
		action607.imageid = 607;
		swap = new Action(10, "Сменить");
		swap.imageid = 2;
		swap.imagesrc = "special";
		calculator = {
			items: [
				{ base: function() { return talent1; } },
				{ base: function() { return talent57; } },
				{ base: function() { return talent71; } }
			]
		};
	});
	it('should create Combinator object from calculator with single active talent', function() {
		var calculator = {
			items: [ { base: function() { return talent57; } } ]
		};
		var combinator = new Combinator();
		combinator.addFromCalculator(calculator);
		expect(combinator.actions.length).toEqual(1);
	});
	it('should populate Combinator object with active talent with limited number of uses', function() {
		var calculator = {
			items: [ { base: function() { return talent57; } } ]
		};
		var combinator = new Combinator();
		combinator.addFromCalculator(calculator);
		expect(combinator.actions[0].numberOfUses).toEqual(2);
	});
	it('should populate Combinator object with active talent with UNlimited number of uses', function() {
		var calculator = {
			items: [ { base: function() { return talent71; } } ]
		};
		var combinator = new Combinator();
		combinator.addFromCalculator(calculator);
		expect(combinator.actions[0].numberOfUses).toEqual(Number.MAX_VALUE);
	});
	it('should create Combinator object from calculator with passive talent', function() {
		var combinator = new Combinator();
		combinator.addFromCalculator(calculator);
		expect(combinator.actions.length).toEqual(2);
	});
	it('should not add actions from item with no attacks', function() {
		var combinator = new Combinator();
		combinator.addFromItem(item324);
		expect(combinator.actions.length).toEqual(0);
	});
	it('should add actions from item with attacks', function() {
		var combinator = new Combinator();
		combinator.addFromItem(item401);
		expect(combinator.actions.length).toEqual(3);
		expect(combinator.actions[0].numberOfUses).toEqual(Number.MAX_VALUE);
		expect(combinator.actions[1].numberOfUses).toEqual(Number.MAX_VALUE);
		expect(combinator.actions[2].numberOfUses).toEqual(Number.MAX_VALUE);
	});
	it('should add action from consumable item', function() {
		var combinator = new Combinator();
		combinator.addFromItem(item607);
		expect(combinator.actions.length).toEqual(1);
		expect(combinator.actions[0].numberOfUses).toEqual(1);
	});
	it('should generate root based on each present action', function() {
		var combinator = new Combinator();
		combinator.addFromItem(item607);
		combinator.addFromCalculator(calculator);
		var rootSets = combinator.createRoots();
		expect(rootSets.length).toEqual(3);
		expect(rootSets[0].actions[0].isEqual(action607)).toEqual(true);
		expect(rootSets[1].actions[0].isEqual(action57)).toEqual(true);
		expect(rootSets[2].actions[0].isEqual(action71)).toEqual(true);
	});
	it('should produce array with leaves', function() {
		var calculator = {
			items: [
				{ base: function() { return talent57; } },
				{ base: function() { return talent71; } }
			]
		};
		var combinator = new Combinator();
		combinator.addFromItem(item607);
		combinator.addFromCalculator(calculator);
		var rootSets = combinator.createRoots();
		var leavesSets = combinator.produceLeaves(rootSets);
		expect(leavesSets.length).toEqual(8);
	});
	it('should not create actions for unlearned talents', function() {
		var calculator = {
			items: [
				{ base: function() { return talent86; } },
				{ base: function() { return talent71; } }
			]
		};
		var combinator = new Combinator();
		combinator.addFromCalculator(calculator);
		expect(combinator.actions.length).toEqual(1);
	});
	it('should add Swap action' , function() {
		var combinator = new Combinator();
		combinator.addSwap();
		var swap = combinator.actions[0];
		expect(swap.cost).toEqual(10);
		expect(swap.imageid).toEqual(2);
		expect(swap.imagesrc).toEqual("special");
	});
	// it('should throw exception about illegal data', function() {
		// var assault_data = {
			// prefix:"as"
		// };
		// expect(function() {new Calculator(assault_data); }).toThrow(new Error("Illegal class data. Talents data not defined"));
	// });
});