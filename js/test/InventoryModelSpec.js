var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
function tunableItemUriHandler() {}
function specialItemUriHandler () {}
describe('testing InventoryModel class', function() {
	var inventoryModel = new InventoryModel("en");
	var itemNotLocalized,
		itemLocalizedNoSuitableLocale,
		itemContainLocale;
	beforeEach(function() {
		itemNotLocalized = {
			id:1,
			name:"абвгд"
		};
		itemLocalizedNoSuitableLocale = {
			id:2,
			name:{"en":"bcdef"}
		};
		itemContainLocale = {
			id:3,
			name:{"ru":"вгдеж",
			"en":"cdefg"}
		}
		itemContainLocalizedSubitem = {
			id:4,
			specials: {
				effects:[
					{"ru":"эффект",
					"en":"effect"}
				]
			}
		}
	});
	it('should return plain value if it is not localized yet', function() {
		var value = inventoryModel.getLocalizedProperty(itemNotLocalized, "name", "en");
		expect(value).toEqual("абвгд");
	});
	it('should return model locale if no suitable locale found', function() {
		var value = inventoryModel.getLocalizedProperty(itemLocalizedNoSuitableLocale, "name", "ru");
		expect(value).toEqual("bcdef");
	});
	it('should return requested locale', function() {
		var value = inventoryModel.getLocalizedProperty(itemContainLocale, "name", "ru");
		expect(value).toEqual("вгдеж");
	});
	it('should return requested locale of subitem', function(){
		var value = inventoryModel.getLocalizedProperty(itemContainLocalizedSubitem.specials.effects, 0, "en");
		expect(value).toEqual("effect");
	});
	it('should use model locale if not specified otherwise', function() {
		var value = inventoryModel.getLocalizedProperty(itemContainLocale,"name");
		expect(value).toEqual("cdefg");	
	});
});