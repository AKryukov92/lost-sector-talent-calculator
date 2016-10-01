var TALENT_NOT_LEARNED = 0;
var TALENT_LEARNED = 1;
function tunableItemUriHandler() {}
function specialItemUriHandler () {}
describe('testing utility functions', function() {
	describe("test getLocalizedProperty", function(){
		var model = new InventoryModel("en", defaultVersion);
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
			var value = getLocalizedProperty(itemNotLocalized, "name", "en");
			expect(value).toEqual("абвгд");
		});
		it('should return model locale if no suitable locale found', function() {
			var value = getLocalizedProperty(itemLocalizedNoSuitableLocale, "name", model.locale);
			expect(value).toEqual("bcdef");
		});
		it('should return requested locale', function() {
			var value = getLocalizedProperty(itemContainLocale, "name", "ru");
			expect(value).toEqual("вгдеж");
		});
		it('should return requested locale of subitem', function(){
			var value = getLocalizedProperty(itemContainLocalizedSubitem.specials.effects, 0, "en");
			expect(value).toEqual("effect");
		});
		it('should use model locale if not specified otherwise', function() {
			var value = getLocalizedProperty(itemContainLocale,"name", model.locale);
			expect(value).toEqual("cdefg");	
		});
	});
});