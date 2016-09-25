describe('testing Calculator class', function() {
	var talent1, talent2, talent4, talent48, talent86, talent39, talent392, talent45, talent452, talent453, talent454, talent70, talent73;
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
	talent70 = {
		id:70,
		imageid:70,
		name:"Упор",
		description:"Увеличивает точность наемника на 7 в сидячем положении.",
		cost:1,
		lvlreq:8,
		talentreq:45,
		column:8
	};
	talent73 = {
		id:73,
		imageid:73,
		name:"Подавляющая высота",
		description:"Увеличивает шанс критической атаки на 30% по цели, находящейся на 2 или более метров ниже наемника. Шанс считается для каждой пули отдельно.",
		cost:1,
		lvlreq:8,
		talentreq:45,
		radius:2,
		column:9
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
		expect(calculator.talents_data.length).toEqual(2);
	});
	
	it("should not add ranks in talents list", function(){
		var assault_data = {
			prefix:"as",
			talents:[talent39, talent392]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(calculator.items.length).toEqual(1);
		expect(calculator.talents_data.length).toEqual(2);
	});

	it('throws exception if data have no talents', function() {
		var assault_data = {
			prefix:"as"
		};
		var calculator = new Calculator();
		
		expect(function() {calculator.consumeInput(assault_data); }).toThrow(new Error("Illegal class data. Talents data not defined"));
	});
	it('throws exception about if data has no prefix', function() {
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

describe("test calculateWidth", function(){
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
	it('should set Calculator width to column of single talent', function(){
		var assault_data = {
			prefix:"as",
			talents:[talent1]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.calculateWidth();
		expect(calculator.width).toEqual(0);
	});
	it('should set Calculator width to 0 if no talents specified',function(){
		var assault_data = {
			prefix:"as",
			talents:[]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.calculateWidth();
		expect(calculator.width).toEqual(0);
	});
});

describe("test mapRefsReqs", function(){
	it('should set req and refs for items', function() {
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
	
	it('should not set req for talent without requirement', function(){
		var assault_data = {
			prefix:"as",
			talents:[talent2]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.mapRefsReqs();
		expect(calculator.items[0].req).toEqual(false);
	});
	
	it('should set reqs and forked refs', function(){
		var assault_data = {
			prefix:"as",
			talents:[talent45,talent70,talent73]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.mapRefsReqs();
		expect(calculator.items[1].req).toEqual(calculator.items[0]);
		expect(calculator.items[2].req).toEqual(calculator.items[0]);
		expect(calculator.items[0].refs).toContain(calculator.items[1], calculator.items[2]);
	});

	it('throws exception if data do not contain required talent',  function() {
		var assault_data = {
			prefix:"as",
			talents:[talent4]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(function(){ calculator.mapRefsReqs(); }).toThrow(new Error("Illegal talents data"));
	});
});

describe('test mapRanks', function(){
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
	
	it('should not mix ranks of different talents', function(){
		var assault_data = {
			prefix:"as",
			talents:[talent39, talent392, talent452, talent45]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.mapRanks();
		expect(calculator.items[0].ranks[0]).toEqual(talent39);
		expect(calculator.items[0].ranks[1]).toEqual(talent392);
		expect(calculator.items[0].ranks.length).toEqual(2);
		expect(calculator.items[1].ranks[0]).toEqual(talent45);
		expect(calculator.items[1].ranks[1]).toEqual(talent452);
		expect(calculator.items[1].ranks.length).toEqual(2);
	});

	it('throws exception if root talent is not present', function() {
		var assault_data = {
			prefix:"as",
			talents:[talent392]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(function() {calculator.mapRanks(); }).toThrow(new Error("Illegal talents data"));
	});
});

it('assigns power to talents', function() {
	var assault_data = {
		prefix:"as",
		talents:[talent45, talent452, talent453, talent454]
	};
	var calculator = new Calculator();
	calculator.consumeInput(assault_data);
	calculator.assignPowerToTalents();
	expect(calculator.talents_data[0].power).toEqual(1);
	expect(calculator.talents_data[1].power).toEqual(2);
	expect(calculator.talents_data[2].power).toEqual(4);
	expect(calculator.talents_data[3].power).toEqual(8);
});
describe('test getPowerSum', function(){
	it('calculates powersum', function() {
		var assault_data = {
			prefix:"as",
			talents:[talent45, talent452, talent453, talent454, talent48, talent86]
		};
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.assignPowerToTalents();
		expect(calculator.getPowerSum()).toEqual(0);
		calculator.items[0].learn();
		expect(calculator.getPowerSum()).toEqual(1);
		calculator.items[1].learn();
		expect(calculator.getPowerSum()).toEqual(17);
	});
	
	it("calculates powersum for rank", function(){
		var assault_data = {
			prefix:"as",
			talents:[talent1, talent2, talent4, talent39, talent392]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		calculator.mapRanks();
		calculator.assignPowerToTalents();
		calculator.items[3].learn();
		calculator.items[3].learn();
		expect(calculator.getPowerSum()).toEqual(24);
	});

	it("throws exception on getPowerSum if assignPowerToTalents was not called", function() {
		var assault_data = {
			prefix:"as",
			talents:[talent1, talent2, talent4]
		}
		var calculator = new Calculator();
		calculator.consumeInput(assault_data);
		expect(function() { calculator.getPowerSum(); }).toThrow(new Error("Assign power to talents first"));
	});
});
describe('test getTalentString', function(){
		var calculator = new Calculator();
	it("produces '0' if powersum is 0", function() {
		calculator.getPowerSum = function(){ return 0; };
		expect(calculator.getTalentString()).toEqual("0");
	});
	it("produces '9' if powersum = 9", function(){
		calculator.getPowerSum = function(){ return 9; };
		expect(calculator.getTalentString()).toEqual("9");
	});
	it("produces 'a' if powersum = 10", function(){
		calculator.getPowerSum = function(){ return 10; };
		expect(calculator.getTalentString()).toEqual("a");
	});
	it("produces 'w' if powersum = 32", function(){
		calculator.getPowerSum = function(){ return 32; };
		expect(calculator.getTalentString()).toEqual("w");
	});
	it("produces '01' if powersum = 33", function(){
		calculator.getPowerSum = function(){ return 33; };
		expect(calculator.getTalentString()).toEqual("01");
	});
	it("produces 'a1' if powersum = 43", function(){
		calculator.getPowerSum = function(){ return 43; };
		expect(calculator.getTalentString()).toEqual("a1");
	});
	it("produces '0a' if powersum = 330", function(){
		calculator.getPowerSum = function(){ return 330; };
		expect(calculator.getTalentString()).toEqual("0a");
	});
	it("produces 'ww' if powersum = 1088", function(){
		calculator.getPowerSum = function(){ return 1088; };
		expect(calculator.getTalentString()).toEqual("ww");
	});
	it("produces '001' if powersum = 1089", function(){
		calculator.getPowerSum = function(){ return 1089; };
		expect(calculator.getTalentString()).toEqual("001");
	});
	it("throws exception if getPowerSum throws exception", function(){
		calculator.getPowerSum = function(){ throw new Error("Assign power to talents first"); }
		expect(function() { calculator.getTalentString(); }).toThrow(new Error("Assign power to talents first"));
	});
});

describe("test parseTalentString", function(){
	var calculator = new Calculator();
	it("produces 0 if talentstring '0'", function(){
		expect(calculator.parseTalentString("0")).toEqual(0);
	});
	it("produces 9 if talentstring '9'", function(){
		expect(calculator.parseTalentString("9")).toEqual(9);
	});
	it("produces 10 if talentstring 'a'", function(){
		expect(calculator.parseTalentString("a")).toEqual(10);
	});
	it("produces 32 if talentstring 'w'", function(){
		expect(calculator.parseTalentString("w")).toEqual(32);
	});
	it("produces 33 if talentstring '01'", function(){
		expect(calculator.parseTalentString("01")).toEqual(33);
	});
	it("produces 43 if talentstring 'a1'", function(){
		expect(calculator.parseTalentString("a1")).toEqual(43);
	});
	it("produces 330 if talentstring '0a'", function(){
		expect(calculator.parseTalentString("0a")).toEqual(330);
	});
	it("produces 1088 if talentstring 'ww'", function(){
		expect(calculator.parseTalentString("ww")).toEqual(1088);
	});
	it("produces 1089 if talentstring '001'", function(){
		expect(calculator.parseTalentString("001")).toEqual(1089);
	});
});
describe("test learnTalentsFromString", function(){
	
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

});