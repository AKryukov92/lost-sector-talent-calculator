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
function update_link() {
	var link = location.origin;
	if (typeof talentApplication.getActiveClass().calculator != 'undefined') {
		if (!isEmpty(talentApplication.patchdata)) {
			link += "/?t=" + talentApplication.patchdata.game_version +
				talentApplication.patchdata.data_version +
				talentApplication.getActiveClass().calculator.prefix + "_" +
				talentApplication.getActiveClass().calculator.getTalentString();
		}
	}
	if (typeof inventoryApp != 'undefined') {
		var slot = inventoryApp.slots["primary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&p=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = inventoryApp.slots["secondary"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&s=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = inventoryApp.slots["armor"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&a=" + slot.item.id + "_" + slot.color + "_" + slot.grade;
		}
		slot = inventoryApp.slots["hat"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&h=" + slot.item.id;
		}
		slot = inventoryApp.slots["consumable_1"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c1=" + slot.item.id;
		}
		slot = inventoryApp.slots["consumable_2"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c2=" + slot.item.id;
		}
		slot = inventoryApp.slots["consumable_3"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c3=" + slot.item.id;
		}
		slot = inventoryApp.slots["consumable_4"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c4=" + slot.item.id;
		}
		slot = inventoryApp.slots["consumable_5"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&c5=" + slot.item.id;
		}
		slot = inventoryApp.slots["head_mod"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&hem=" + slot.item.id;
		}
		slot = inventoryApp.slots["chest_mod"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&cm=" + slot.item.id;
		}
		slot = inventoryApp.slots["hand_mod"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&ham=" + slot.item.id;
		}
		slot = inventoryApp.slots["feet_mod"];
		if (!$.isEmptyObject(slot.item)) {
			link += "&fm=" + slot.item.id;
		}
	}
	$("#link-to-build").val(link);
}

function ApplicationLink(linkString) {
	
	this.linkString = linkString;
	this.parts = [];
	
	this.processParts = function() {
		var array = [];
		if (linkString.length != 0) {
			linkString.replace("?", "").split("&").forEach(function(UriItem) {
				var keyvalue = UriItem.split("=");
				var key = keyvalue[0];
				var value = keyvalue[1];
				array.push({"key":key , "value":value });
			});
		}
		this.parts = array;
	}	
	this.processParts();
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
	't-chest-mods':{'ru':'Грудная клетка', 'en':'Chest' }
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
	if (typeof talentApplication != "undefined") {
		talentApplication.applyLocale(locale);
		refreshTalentTooltipIframe(talentApplication);
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