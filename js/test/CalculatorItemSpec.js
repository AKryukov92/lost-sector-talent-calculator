describe('testing CalculatorItem class', function() {
var talent1, talent48, talent86, talent39, talent392, talent45, talent452,talent453, talent454, talent70, talent73;
beforeEach(function(){
	talent1 = {
		id:1,
		name:"Пассивная регенерация",
		description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
		effect:"Умножает регенерацию здоровья на 3",
		cost:1,
		lvlreq:1,
		column:0
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
	it("throws exception on construction if 'id' not defined", function() {
		var talent = {
			imageid:1,
			name:"Талант без id",
			description:"123",
			effect:"123",
			cost:1,
			lvlreq:1,
			column:0
		};
		expect( function() { new CalculatorItem(talent); }).toThrow(new Error("Illegal talent data. 'id' not defined"));
	});
	
	it("throws exception on construction if 'lvlreq' not defined", function() {
		var talent = {
			id:1,
			imageid:1,
			name:"Талант без id",
			description:"123",
			effect:"123",
			cost:1,
			column:0
		};
		expect( function() { new CalculatorItem(talent); }).toThrow(new Error("Illegal talent data. 'lvlreq' not defined"));
	});
	
	it("throws exception on construction if 'column' not defined", function() {
		var talent = {
			id:1,
			name:"Пассивная регенерация",
			description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
			effect:"Умножает регенерацию здоровья на 3",
			cost:1,
			lvlreq:1
		};
		expect( function() { new CalculatorItem(talent); }).toThrow(new Error("Illegal talent data. 'column' not defined"));
	});
	describe('calculate talent image bounds in atlas', function(){
		it('based on id when it is in first row', function() {
			var item = new CalculatorItem(talent1);
			expect(item.imageBoundsX).toEqual(SOURCE_BOX_SIZE);
			expect(item.imageBoundsY).toEqual(0);
		});
		
		it('based on id when it is in the middle', function() {
			var item = new CalculatorItem(talent86);
			expect(item.imageBoundsX).toEqual(SOURCE_BOX_SIZE*6);
			expect(item.imageBoundsY).toEqual(SOURCE_BOX_SIZE*4);
		});
		
		it('based on imageid if defined', function() {
			var item = new CalculatorItem(talent392);
			expect(item.imageBoundsX).toEqual(SOURCE_BOX_SIZE*19);
			expect(item.imageBoundsY).toEqual(SOURCE_BOX_SIZE);
		});
	});
	it ('should treat passed talent as base', function(){
		var item = new CalculatorItem(talent392);
		expect(talent392).toEqual(item.base());
	});

	it('puts initial talent to rank array on construction', function() {
		var item392 = new CalculatorItem(talent392);
		expect(item392.ranks).toContain(talent392);
	});
});

describe("test anyRefLearned", function(){
	it('is truthy if any ref of talent is learned', function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.learn();
		expect(item45.anyRefLearned()).toEqual(true);
		item70.unlearn();
		item73.learn();
		expect(item45.anyRefLearned()).toEqual(true);
	});
	
	it('is falsy if no ref of talent is learned', function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		expect(item45.anyRefLearned()).toEqual(false);
	});
});

describe('test canLearn',function(){
	it("is falsy if talent is learned", function() {
		var item48 = new CalculatorItem(talent48);
		item48.learn();
		expect(item48.canLearn()).toEqual(false);
	});
	
	it ("is truthy if talent is not learned", function(){
		var item48 = new CalculatorItem(talent48);
		expect(item48.canLearn()).toEqual(true);
	});
	
	it("is falsy if required talent is not learned", function() {
		var item48 = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.setReq(item48);
		item48.addRef(item86);
		expect(item86.canLearn()).toEqual(false);
	});
	
	it("is truthy if required talent changed to learned", function(){
		var item48a = new CalculatorItem(talent48);
		var item48b = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.setReq(item48a);
		item86.setReq(item48b);
		item48b.learn();
		item48a.addRef(item86);
		item48b.addRef(item86);
		expect(item86.canLearn()).toEqual(true);
	});

	it("is truthy until all ranks of talent are learned", function() {
		var item45 = new CalculatorItem(talent45);
		item45.addRank(talent452);
		item45.addRank(talent453);
		item45.addRank(talent454);
		expect(item45.canLearn()).toEqual(true);
		item45.learn();
		expect(item45.canLearn()).toEqual(true);
		item45.learn();
		expect(item45.canLearn()).toEqual(true);
		item45.learn();
		expect(item45.canLearn()).toEqual(true);
		item45.learn();
		expect(item45.canLearn()).toEqual(false);
	});

	it('is falsy if talent is one of refs and other ref is learned', function() {
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		item70.learn();
		expect(item73.canLearn()).toEqual(false);
	});
	
	it('is truthy if talent is one of refs and no other ref is learned', function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		expect(item70.canLearn()).toEqual(true);
		expect(item73.canLearn()).toEqual(true);
	});
});

describe('test canUnlearn',function(){
	it("is falsy if talent is not learned", function() {
		var item48 = new CalculatorItem(talent48);
		expect(item48.canUnlearn()).toEqual(false);
	});
	
	it("is truthy if talent is learned", function(){
		var item48 = new CalculatorItem(talent48);
		item48.learn();
		expect(item48.canUnlearn()).toEqual(true);
	});
	
	if ("is falsy if any ref is learned", function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		item70.learn();
		expect(item45.canUnlearn()).toEqual(false);
	});
	
	it("is truthy if no ref is learned",function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		expect(item45.canUnlearn()).toEqual(true);
	});
	
	it('is falsy if talent with no ranks is not learned', function() {
		var item48 = new CalculatorItem(talent48);
		expect(item48.canUnlearn()).toEqual(false);
	});
	
	it('is truthy if any rank is learned', function() {
		var item45 = new CalculatorItem(talent45);
		item45.addRank(talent452);
		item45.addRank(talent453);
		item45.addRank(talent454);
		
		item45.learn();
		expect(item45.canUnlearn()).toEqual(true);
		item45.learn();
		expect(item45.canUnlearn()).toEqual(true);
		item45.learn();
		expect(item45.canUnlearn()).toEqual(true);
		item45.learn();
		expect(item45.canUnlearn()).toEqual(true);
	});
	
	it('is falsy if base learned and any ref learned', function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRank(talent452);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		item70.learn();
		expect(item45.canUnlearn()).toEqual(false);
	});
	
	it('is truthy if high rank learned and any ref learned', function(){
		var item45 = new CalculatorItem(talent45);
		var item70 = new CalculatorItem(talent70);
		var item73 = new CalculatorItem(talent73);
		item45.addRank(talent452);
		item45.addRef(item70);
		item45.addRef(item73);
		item70.setReq(item45);
		item73.setReq(item45);
		
		item45.learn();
		item45.learn();
		item70.learn();
		expect(item45.canUnlearn()).toEqual(true);
	});
});

describe('test getLearnedCount', function(){
	it('returns valid count of learned ranks', function() {
		var item45 = new CalculatorItem(talent45);
		item45.addRank(talent452);
		item45.addRank(talent453);
		item45.addRank(talent454);
		
		expect(item45.getLearnedCount()).toEqual(0);
		item45.learn();
		expect(item45.getLearnedCount()).toEqual(1);
		item45.learn();
		expect(item45.getLearnedCount()).toEqual(2);
		item45.learn();
		expect(item45.getLearnedCount()).toEqual(3);
		item45.learn();
		expect(item45.getLearnedCount()).toEqual(4);
	});
	
	it('returns 0 if talent have no ranks', function(){
		var item45 = new CalculatorItem(talent45);
		expect(item45.getLearnedCount()).toEqual(0);
	});
});

describe('test learn', function(){
	it('learns base first', function(){
		var item45 = new CalculatorItem(talent45);
		item45.learn();
		expect(item45.base().status).toEqual(TALENT_LEARNED);
	});
	
	it('learns least possible unlearned rank', function() {
		var item39 = new CalculatorItem(talent392);
		item39.addRank(talent39);
		item39.learn();
		expect(item39.ranks[0].status).toEqual(TALENT_LEARNED);
		item39.learn();
		expect(item39.ranks[1].status).toEqual(TALENT_LEARNED);
	});
	
	it('throws exception if talent can not be learned', function(){
		var item45 = new CalculatorItem(talent45);
		item45.canLearn = function(){return false;};
		expect( function() { item45.learn(); }).toThrow(new Error("Talent can not be learned."));
	});
});
describe('test unlearn', function(){
	it('unlearns base if talent have no ranks', function() {
		var item48 = new CalculatorItem(talent48);
		item48.learn();
		item48.unlearn();
		expect(item48.base().status).toEqual(TALENT_NOT_LEARNED);
	});
	it('unlearns highest possible rank', function() {
		var item39 = new CalculatorItem(talent392);
		item39.addRank(talent39);
		item39.learn();
		item39.learn();
		expect(item39.ranks[0].status).toEqual(TALENT_LEARNED);
		expect(item39.ranks[1].status).toEqual(TALENT_LEARNED);
		item39.unlearn();
		expect(item39.ranks[0].status).toEqual(TALENT_LEARNED);
		expect(item39.ranks[1].status).toEqual(TALENT_NOT_LEARNED);
	});
	
	it ('throws exception if talent can not be unlearned', function(){
		var item45 = new CalculatorItem(talent45);
		item45.canUnlearn = function(){return false;};
		expect( function() { item45.unlearn(); }).toThrow(new Error("Talent can not be unlearned."));
	});
});

describe("test addRank", function(){
	it('puts ranks of talents in proper order. input in reverse order', function() {
		var item45 = new CalculatorItem(talent454);
		item45.addRank(talent453);
		item45.addRank(talent452);
		item45.addRank(talent45);
		expect(item45.ranks[0]).toEqual(talent45);
		expect(item45.ranks[1]).toEqual(talent452);
		expect(item45.ranks[2]).toEqual(talent453);
		expect(item45.ranks[3]).toEqual(talent454);
	});
	
	it('puts ranks of talents in proper order. input in natural order', function() {
		var item45 = new CalculatorItem(talent45);
		item45.addRank(talent452);
		item45.addRank(talent453);
		item45.addRank(talent454);
		expect(item45.ranks[0]).toEqual(talent45);
		expect(item45.ranks[1]).toEqual(talent452);
		expect(item45.ranks[2]).toEqual(talent453);
		expect(item45.ranks[3]).toEqual(talent454);
	});
	
	it('puts ranks of talents in proper order. input in mixed order', function() {
		var item45 = new CalculatorItem(talent453);
		item45.addRank(talent454);
		item45.addRank(talent45);
		item45.addRank(talent452);
		expect(item45.ranks[0]).toEqual(talent45);
		expect(item45.ranks[1]).toEqual(talent452);
		expect(item45.ranks[2]).toEqual(talent453);
		expect(item45.ranks[3]).toEqual(talent454);
	});
});
describe('test isUsable',function(){
	it('is truthy if talent marked as usable', function() {
		var item86 = new CalculatorItem(talent86);
		expect(item86.isUsable()).toEqual(true);
	});
	it('is falsy if talent have no AP_cost', function(){
		var item39 = new CalculatorItem(talent39);
		expect(item39.isUsable()).toEqual(false);
	});
});
});