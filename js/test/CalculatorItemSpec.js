describe('testing CalculatorItem class', function() {
	var talent1 = {
		id:1,
		name:"Пассивная регенерация",
		description:"Медленно восстанавливает здоровье наемника на мирных локациях (Фабрика и другие).",
		effect:"Умножает регенерацию здоровья на 3",
		cost:1,
		lvlreq:1,
		column:0
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
			name:"Стрелять до конца",
			description:"Следующая атака после активации потратит все ваши ОД, но будет иметь повышенный на 50% шанс критического попадания. Шанс считается для каждой пули отдельно. Для активации можно использовать очки движения.",
			cost:1,
			lvlreq:12,
			talentreq:48,
			AP_cost:1,
			column:12
		};
	
	var talent39 = {
			id:39,
			imageid:39,
			name:"Стойкий",
			description:"Добавляет базовое сопротивление любому урону.",
			effect:"Увеличивает общую стойкость к урону на 5%",
			cost:1,
			lvlreq:5,
			column:7
		};
	var talent392 ={
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
	var talent45 = {
			id:45,
			imageid:45,
			name:"Стрельба наверняка",
			description:"Увеличивает шанс нанести цели критический урон.",
			effect:"Увеличивает шанс крит.попадания на 2%",
			cost:1,
			lvlreq:6,
			column:8
		};
	var talent452 = {
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
	var talent453 = {
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
	var talent454 = {
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
	
	it('calculates talent image bounds in atlas based on id when it is in first row', function() {
		var item = new CalculatorItem(talent1);
		expect(item.imageBoundsX).toEqual(ITEM_BOX_SIZE);
		expect(item.imageBoundsY).toEqual(0);
	});
	
	it('calculates talent image bounds in atlas based on id when it is in the middle', function() {
		var item = new CalculatorItem(talent86);
		expect(item.imageBoundsX).toEqual(ITEM_BOX_SIZE*6);
		expect(item.imageBoundsY).toEqual(ITEM_BOX_SIZE*4);
	});
	
	it('calculates talent image bounds in atlas based on imageid if defined', function() {
		var item = new CalculatorItem(talent392);
		expect(item.imageBoundsX).toEqual(ITEM_BOX_SIZE*19);
		expect(item.imageBoundsY).toEqual(ITEM_BOX_SIZE);
	});
	
	it('return false on learn if required talent is not learned', function() {
		var item48 = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.addReq(item48);
		item48.addRef(item86);
		expect(item86.canLearn()).toEqual(false);
	});
	
	it('returns false on unlearn if references are learned', function() {
		var item48 = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.addReq(item48);
		item48.addRef(item86);
		item48.learn();
		item86.learn();
		expect(item48.canUnlearn()).toEqual(false);
	});
	
	it('puts initial talent to rank array on construction', function() {
		var item392 = new CalculatorItem(talent392);
		expect(item392.ranks).toContain(talent392);
		expect(talent392.status).toEqual(TALENT_NOT_LEARNED);
	});
	
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
	
	it('learn least possible unlearned rank', function() {
		var item39 = new CalculatorItem(talent392);
		item39.addRank(talent39);
		item39.learn();
		expect(item39.ranks[0].status).toEqual(TALENT_LEARNED);
		item39.learn();
		expect(item39.ranks[1].status).toEqual(TALENT_LEARNED);
	});
	
	it('unlearn highest possible rank', function() {
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
	
	it('should calculate position of talent in grid', function() {
		var item39 = new CalculatorItem(talent39);
		item39.calculatePaintPosition(5,3,47,47);
		expect(item39.x).toEqual(286);
		expect(item39.y).toEqual(50);
	});
	
	it('should check is usable talent marked as usable', function() {
		var item39 = new CalculatorItem(talent39);
		expect(item39.isUsable()).toEqual(false);
		var item86 = new CalculatorItem(talent86);
		expect(item86.isUsable()).toEqual(true);
	});
	
	it('should return array with lines to draw', function() {
		var item48 = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.addReq(item48);
		item48.addRef(item86);
		item48.calculatePaintPosition(5,3,47,53);
		item86.calculatePaintPosition(5,3,47,53);
		var lines = item48.getReqToRefLinks();
		expect(lines[0]).toEqual({ x1: 461, y1: 85, x2: 499, y2: 50 });
	});
	
	it("should throw exception 'coordinates was not calculated'", function() {
		var item48 = new CalculatorItem(talent48);
		var item86 = new CalculatorItem(talent86);
		item86.addReq(item48);
		item48.addRef(item86);
		expect(function() { item48.getReqToRefLinks(); }).toThrow(new Error("Coordinates was not calculated"));
	});
});