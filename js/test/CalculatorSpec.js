describe('testing Calculator class', function() {
	var talent1, talent2, talent4, talent48, talent86, talent39, talent392, talent45, talent452, talent453, talent454;
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
	talent2 = {
		id:2,
		imageid:2,
		name:"Первая помощь",
		description:"Позволяет использовать таблетки и инъекции ребиса.",
		cost:1,
		lvlreq:1,
		column:1
	};
	talent4 = {
		id:35,
		imageid:35,
		name:"Стимуляторы",
		description:"Позволяет использовать стероидные и адреналиновые препараты.",
		cost:1,
		lvlreq:4,
		talentreq:2,
		column:1
	};
	talent48 = {
		id:48,
		imageid:48,
		name:"Крепкий",
		description:"Увеличивает базовое количество здоровья.",
		effect:"Увеличивает запас здоровья на 15.",
		cost:1,
		lvlreq:8,
		column:11
	};
	talent86 = {
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
	talent39 = {
		id:39,
		imageid:39,
		name:"Стойкий",
		description:"Добавляет базовое сопротивление любому урону.",
		effect:"Увеличивает общую стойкость к урону на 5%",
		cost:1,
		lvlreq:5,
		column:7
	};
	talent392 ={
		id:392,
		imageid:39,
		name:"Стойкий",
		description:"Добавляет базовое сопротивление любому урону.",
		effect:"Увеличивает общую стойкость к урону на 7%",
		cost:3,
		lvlreq:6,
		column:7,
		rankof:39
	};
	talent45 = {
		id:45,
		imageid:45,
		name:"Стрельба наверняка",
		description:"Увеличивает шанс нанести цели критический урон.",
		effect:"Увеличивает шанс крит.попадания на 2%",
		cost:1,
		lvlreq:6,
		column:8
	};
	talent452 = {
		id:452,
		imageid:45,
		name:"Стрельба наверняка",
		description:"Увеличивает шанс нанести цели критический урон.",
		effect:"Увеличивает шанс крит.попадания на 5%",
		cost:2,
		lvlreq:7,
		rankof:45,
		column:8
	};
	talent453 = {
		id:453,
		imageid:45,
		name:"Стрельба наверняка",
		description:"Увеличивает шанс нанести цели критический урон.",
		effect:"Увеличивает шанс крит.попадания на 10%",
		cost:2,
		lvlreq:10,
		rankof:45,
		column:8
	};
	talent454 = {
		id:454,
		imageid:45,
		name:"Стрельба наверняка",
		description:"Увеличивает шанс нанести цели критический урон.",
		effect:"Увеличивает шанс крит.попадания на 15%",
		cost:3,
		lvlreq:13,
		rankof:45,
		column:8
	};
});

describe('test construction', function(){
	it('should create Calculator object', function() {
		var assault_data = {
			prefix:"as",
			talents:[talent2, talent4]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(calculator.prefix).toEqual("as");
	});
});

describe('test consumeInput', function(){
	it('should create Calculator object and fill items', function() {
		var assault_data = {
			prefix:"as",
			talents:[talent1, talent2]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(calculator.items.length).toEqual(2);
	});
	
	it("should not add ranks in talents list", function(){
		var assault_data = {
			prefix:"as",
			talents:[talent39, talent392]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(calculator.items.length).toEqual(1);
	});

	it('should throw exception if data have no talents', function() {
		var assault_data = {
			prefix:"as"
		};
		var calculator = new Calculator();
		
		expect(function() {calculator.consumeInput(assault_data); }).toThrow(new Error("Illegal class data. Talents data not defined"));
	});
	it('should throw exception about if data has no prefix', function() {
		var assault_data = {
			talents:[]
		};
		var calculator = new Calculator();
		expect(function() {calculator.consumeInput(assault_data); }).toThrow(new Error("Illegal class data. Class prefix not defined"));
	});

	it("considers that no learned talents require level 1", function() {
		var assault_data = {
			prefix:"as",
			talents:[talent1, talent2]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(calculator.getRequiredLevel()).toEqual(1);
	});
});
it('should set Calculator width to max value', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent1, talent48, talent86]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.calculateWidth();
	expect(calculator.width).toEqual(12);
});

it('creates object and fills refs and req for items', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent2, talent4]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.mapRefsReqs();
	expect(calculator.items[0].refs).toContain(calculator.items[1]);
	expect(calculator.items[1].req).toEqual(calculator.items[0]);
});

it('throws exception on mapping refs and reqs',  function() {
	var assault_data = {
		prefix:"as",
		talents:[talent4]
	}
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	expect(function(){ calculator.mapRefsReqs(); }).toThrow(new Error("Illegal talents data"));
});

it('puts ranks of talent to single item. input in natural order', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent45, talent452, talent453, talent454]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.mapRanks();
	expect(calculator.items[0].ranks[0]).toEqual(talent45);
	expect(calculator.items[0].ranks[1]).toEqual(talent452);
	expect(calculator.items[0].ranks[2]).toEqual(talent453);
	expect(calculator.items[0].ranks[3]).toEqual(talent454);
});

it('puts ranks of talent to single item. ranks in reverse order', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent454, talent453, talent452, talent45]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.mapRanks();
	expect(calculator.items[0].ranks[0]).toEqual(talent45);
	expect(calculator.items[0].ranks[1]).toEqual(talent452);
	expect(calculator.items[0].ranks[2]).toEqual(talent453);
	expect(calculator.items[0].ranks[3]).toEqual(talent454);
});

it('should throw exception on mapping ranks', function() {
	var assault_data = {
		prefix:"as",
		talents:[ talent392]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	expect(function() {calculator.mapRanks(); }).toThrow(new Error("Illegal talents data"));
});

it('assigns power to talents', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent45, talent452, talent453, talent454]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.mapRanks();
	calculator.assignPowerToTalents();
	expect(calculator.items[0].ranks[0].power).toEqual(1);
	expect(calculator.items[0].ranks[1].power).toEqual(2);
	expect(calculator.items[0].ranks[2].power).toEqual(4);
	expect(calculator.items[0].ranks[3].power).toEqual(8);
});
it('calculates powersum', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent45, talent452, talent453, talent454, talent48, talent86]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.mapRanks();
	calculator.assignPowerToTalents();
	expect(calculator.getPowerSum()).toEqual(0);
	calculator.items[0].learn();
	expect(calculator.getPowerSum()).toEqual(1);
	calculator.items[1].learn();
	expect(calculator.getPowerSum()).toEqual(17);
});

it("calculates spent points", function() {
	var assault_data = {
		prefix: "as",
		talents:[talent1]
	}
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	expect(calculator.getSpentTalentPoints()).toEqual(0);
	calculator.items[0].learn();
	expect(calculator.getSpentTalentPoints()).toEqual(1);
});

it("calculates level based on learned talents", function() {
	var assault_data = {
		prefix:"as",
		talents:[talent1, talent2, talent4]
	}
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.items[0].learn();
	expect(calculator.getRequiredLevel()).toEqual(1);
	calculator.items[1].learn();
	expect(calculator.getRequiredLevel()).toEqual(2);
	calculator.items[2].learn();
	expect(calculator.getRequiredLevel()).toEqual(4);
});

it("produces empty talentstring if nothing learned", function() {
	var assault_data = {
		prefix:"as",
		talents:[talent1, talent2, talent4]
	}
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.assignPowerToTalents();
	expect(calculator.getTalentString()).toEqual("0");
});

it("throws error on getPowerSum if assignPowerToTalents was not called", function() {
	var assault_data = {
		prefix:"as",
		talents:[talent1, talent2, talent4]
	}
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	expect(function() { calculator.getPowerSum(); }).toThrow(new Error("Assign power to talents first"));
});
});