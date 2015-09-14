describe('calculator.js', function() {
	var talent1 = {
		id:1,
		imageid:1,
		name:"Пассивная регенерация",
		description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
		effect:"Умножает регенерацию здоровья на 3",
		cost:1,
		lvlreq:1,
		column:0
	};
	var talent2 = {
		id:2,
		imageid:2,
		name:"Первая помощь",
		description:"Позволяет использовать таблетки и инъекции ребиса.",
		cost:1,
		lvlreq:1,
		column:1
	};
	var talent4 = {
			id:35,
			imageid:35,
			name:"Стимуляторы",
			description:"Позволяет использовать стероидные и адреналиновые препараты.",
			cost:1,
			lvlreq:4,
			talentreq:2,
			column:1
		};
	var talent48 = {
			id:48,
			imageid:48,
			name:"Крепкий",
			description:"Увеличивает базовое количество здоровья.",
			effect:"Увеличивает запас здоровья на 15.",
			cost:1,
			lvlreq:8,
			column:11
		};
	var talent86 = {
			id:86,
			imageid:86,
			name:"Стрелять до конца",
			description:"Следующая атака после активации потратит все ваши ОД, но будет иметь повышенный на 50% шанс критического попадания. Шанс считается для каждой пули отдельно. Для активации можно использовать очки движения.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			AP_cost:1,
			column:12
		}
		
	it('should create Calculator object', function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			talents:[talent2, talent4]
		};
		var calculator = new Calculator(assault_data);
		expect(calculator.itemBoxSize).toEqual(35);
	});
	
	it('should throw Calculator exception on mapping items',  function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			talents:[talent4]
		}
		var calculator = new Calculator(assault_data);
		expect(function(){ calculator.mapRefsReqs(); }).toThrow(new Error("Illegal talents data"));
	});
	
	it('should set Calculator width to max value', function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			talents:[talent1, talent48, talent86]
		};
		var calculator = new Calculator(assault_data);
		calculator.calculateWidth();
		expect(calculator.width).toEqual(12);
	});
	
	it('should put talent.levelreq to heightmap', function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			rows:[
				{ level:1 }
			],
			talents:[talent1]
		};
		var calculator = new Calculator(assault_data);
		expect(calculator.heightmap[0]).toEqual(1);
	});
	
	it('should create Calculator object and fill items', function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			talents:[talent1, talent2]
		};
		var calculator = new Calculator(assault_data);
		expect(calculator.items.length).toEqual(2);
	});
	
	it('should create Calculator object and fill items', function() {
		var assault_data = {
			prefix:"as",
			grid_height:11,
			talents:[talent2, talent4]
		};
		var calculator = new Calculator(assault_data);
		calculator.mapRefsReqs();
		expect(calculator.items[0].refs).toContain(calculator.items[1]);
		expect(calculator.items[1].reqs).toContain(calculator.items[0]);
	});
});