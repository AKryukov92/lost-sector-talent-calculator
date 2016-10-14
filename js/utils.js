var defaultVersion = 105;
function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	// get num of sources
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = sources[src];
	}
}
// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
var recentId;

function resizeIframe(obj) {
	window.setTimeout(function() {
		if (obj.contentWindow.document.body != null) {
			obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
		}
	}, 100);
}

function ApplicationLink(linkString) {
	this.linkString = linkString;
	this.parts = [];
	
	if (linkString.length != 0) {
		var array = [];
		linkString.replace("?", "").split("&").forEach(function(UriItem) {
			var keyvalue = UriItem.split("=");
			var key = keyvalue[0];
			var value = keyvalue[1];
			array.push({"key":key , "value":value });
		});
		this.parts = array;
	}
	
	this.handleParts = function(uriHandlers){
		this.parts.forEach(function(item){
			if (typeof uriHandlers[item.key] != 'undefined') {
				uriHandlers[item.key].fn(
					item.key,
					item.value,
					uriHandlers[item.key].target);
			}
		});
	}
}
function getLocalizedProperty(container, property, locale) {
	if (typeof container[property] == "undefined") {
		throw new Error("Свойство не существует");
	}
	if (typeof container[property] === "object" && container[property] !== null) {
		if (typeof container[property][locale] != 'undefined') {
			return container[property][locale];
		} else {
			return container[property]["ru"];
		}
	} else {
		return container[property];
	}
}
var localizationData = {
	't-clear':{ 'ru':'очистить', 'en':'clear' },
	't-armor':{ 'ru':'Броня', 'en':'Armor' },
	't-melee':{ 'ru':'Ближний бой', 'en':'Melee' },
	't-pistol':{ 'ru':'Пистолеты', 'en':'Pistols' },
	't-smg':{ 'ru':'ПП', 'en':'SMG' },
	't-shotgun':{ 'ru':'Дробовики', 'en':'Shotguns' },
	't-assault-rifle':{ 'ru':'Автоматы', 'en':'Assault rifles' },
	't-sniper-rifle':{ 'ru':'Снайперское', 'en':'Sniper rifles' },
	't-machinegun':{ 'ru':'Пулеметы', 'en':'Machinegun' },
	't-launcher':{ 'ru':'Взрывное', 'en':'Launchers' },
	't-shield':{ 'ru':'Щиты', 'en':'Shields' },
	't-hat':{ 'ru':'Шапки', 'en':'Hats' },
	't-consumable':{ 'ru':'Активки', 'en':'Consumables' },
	't-light-weapon':{ 'ru':'Легкое оружие', 'en':'Light weapon' },
	't-medium-weapon':{ 'ru':'Среднее оружие', 'en':'Medium weapon' },
	't-protection':{ 'ru':'Защита', 'en':'Protection' },
	't-mobility':{ 'ru':'Мобильность', 'en':'Mobility' },
	't-clip':{ 'ru':'Размер магазина', 'en':'Clip' },
	't-ammo':{ 'ru':'Кол-во боеприпасов', 'en':'Ammo' },
	't-reload-cost':{ 'ru':'ОД для перезарядки', 'en':'Reload cost' },
	't-required-level':{ 'ru':'Необходимый уровень', 'en':'Required level' },
	't-required-class':{ 'ru':'Необходимый класс', 'en':'Required class' },
	't-assault':{ 'ru':'Штурмовик', 'en':'Assault' },
	't-scout':{ 'ru':'Скаут', 'en':'Scout' },
	't-juggernaut':{ 'ru':'Джаггернаут', 'en':'Juggernaut' },
	't-support':{ 'ru':'Поддержка', 'en':'Support' },
	't-required-skill':{ 'ru':'Требуемый навык', 'en':'Required skill' },
	't-active-item':{ 'ru':'Активная вещь', 'en':'Active item' },
	't-required':{ 'ru':'Необходимо', 'en':'Required' },
	't-AP':{ 'ru':'ОД', 'en':'AP' },
	't-link':{ 'ru':'ссылка', 'en':'link' },
	't-level':{ 'ru':'Уровень', 'en':'Level' },
	't-hide-tooltip':{ 'ru':'Спрятать тултипы талантов', 'en':'Hide talent tooltips' },
	't-version':{ 'ru':'Версия игры', 'en':'Game version' },
	't-merc-level':{ 'ru':'Уровень бойца', 'en':'Mercenary level' },
	't-cost':{ 'ru':'Стоимость', 'en':'Cost' },
	't-skill-points':{ 'ru':'очков навыков', 'en':'skill points' },
	't-radius':{ 'ru':'Радиус', 'en':'Radius' },
	't-number-of-uses':{ 'ru':'Число использований', 'en':'Number of uses' },
	't-AP-cost':{ 'ru':'Затраты ОД', 'en':'AP cost' },
	't-description':{ 'ru':'Описание', 'en':'Description' },
	't-rank':{ 'ru':'Ранг', 'en':'Rank' },
	't-effect':{ 'ru':'Эффект', 'en':'Effect' },
	't-medkit':{ 'ru':'Аптечка', 'en':'Medkit' },
	't-steroid':{ 'ru':'Стимулятор', 'en':'Steroid' },
	't-gear':{ 'ru':'Оборудование', 'en':'Gear' },
	't-grenade':{ 'ru':'Граната', 'en':'Grenade' },
	't-damage':{ 'ru':'Урон', 'en':'Damage' },
	't-melee-damage':{ 'ru':'от удара', 'en':'melee' },
	't-soft-bullet-damage':{ 'ru':'мягкими пулями', 'en':'soft bullets' },
	't-bullet-damage':{ 'ru':'пулями', 'en':'bullets' },
	't-shot-damage':{ 'ru':'дробью', 'en':'shot' },
	't-high-caliber-damage':{ 'ru':'крупным калибром', 'en':'high caliber' },
	't-explosion-damage':{ 'ru':'взрывом', 'en':'explosion' },
	't-acid-damage':{ 'ru':'кислотой', 'en':'acid' },
	't-fire-damage':{ 'ru':'огнем', 'en':'fire' },
	't-instant-effect':{ 'ru':'При применении', 'en':'Instant' },
	't-turn':{ 'ru':'раунда', 'en':'turn' },
	't-turns':{ 'ru':'раундов', 'en':'turns' },
	't-turns-effect-start':{ 'ru':'Длится в течениие', 'en':'Lasts for' },
	't-avatar':{'ru':'Аватар', 'en':'Avatar'},
	't-head-mods':{'ru':'Череп', 'en':'Skull' },
	't-hand-mods':{'ru':'Руки', 'en':'Arms' },
	't-feet-mods':{'ru':'Ноги', 'en':'Legs' },
	't-chest-mods':{'ru':'Грудная клетка', 'en':'Chest' },
	't-subscription':{'ru':'Форумная подпись', 'en':'Forum subscription'},
	't-movecost':{'ru':'Цена перемещения','en':'Movement costs'}
	};

function applyLocaleToInterface(locale) {
	for (var key in localizationData){
		$("[name=" + key + "]").each(function(){
			$(this).html(localizationData[key][locale]);
		});
	}
}

function getLocale() {
	if (typeof(localStorage) !== "undefined") {
		if (localStorage.getItem("lstc.wc.lt/locale") != null) {
			return localStorage.getItem("lstc.wc.lt/locale");
		} else {
			return "ru";
		}
	}
}

function applyLocale(){
	var locale = getLocale();
	applyLocaleToInterface(locale);
	if (typeof inventoryApp != "undefined") {
		inventoryApp.applyLocale(locale);
	}
	if (typeof talentController != "undefined") {
		talentController.getView().applyLocale(locale);
		refreshTalentTooltipIframe(talentController.getView());
		if (talentController.currentPrefix == "as") {
			document.title = localizationData["t-assault"][getLocale()];
		} else if (talentController.currentPrefix == "ju") {
			document.title = localizationData["t-juggernaut"][getLocale()];
		} else if (talentController.currentPrefix == "sc") {
			document.title = localizationData["t-scout"][getLocale()];
		} else if (talentController.currentPrefix == "su") {
			document.title = localizationData["t-support"][getLocale()];
		}
	}
}

$("#selLang").val(getLocale());

$("#selLang").change(function() {
	var locale = $("#selLang").val();
	if (typeof(localStorage) !== "undefined") {
		localStorage.setItem("lstc.wc.lt/locale", $("#selLang").val());
	}
	applyLocale();
});
$(document).ready(function(){
	applyLocaleToInterface(getLocale());
});
if (!isEmpty($("#items-pool"))) {
	$("#items-pool").tabs();
}
if (!isEmpty($("#tabs"))) {
	$( "#tabs" ).tabs();
	$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
}