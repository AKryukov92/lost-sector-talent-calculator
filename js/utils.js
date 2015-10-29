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
	if (typeof talentApplication.activeClass.calculator != 'undefined') {
		if (!isEmpty(talentApplication.patchdata)) {
			link += "/?t=" + talentApplication.patchdata.game_version +
				talentApplication.patchdata.data_version +
				talentApplication.activeClass.calculator.prefix + "_" +
				talentApplication.activeClass.calculator.getTalentString();
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

var localizationData = [
	{ id:"t-clear", text:{ "ru":"очистить", "en":"clear" } },
	{ id:"t-armor", text:{ "ru":"Броня", "en":"Armor" } },
	{ id:"t-melee", text:{ "ru":"Ближний бой", "en":"Melee" } },
	{ id:"t-pistol", text:{ "ru":"Пистолеты", "en":"Pistols" } },
	{ id:"t-smg", text:{ "ru":"ПП", "en":"SMG" } },
	{ id:"t-shotgun", text:{ "ru":"Дробовики", "en":"Shotguns" } },
	{ id:"t-assault-rifle", text:{ "ru":"Автоматы", "en":"Assault rifles" } },
	{ id:"t-sniper-rifle", text:{ "ru":"Снайперское", "en":"Sniper rifles" } },
	{ id:"t-machinegun", text:{ "ru":"Пулеметы", "en":"Machinegun" } },
	{ id:"t-launcher", text:{ "ru":"Взрывное", "en":"Launchers" } },
	{ id:"t-shield", text:{ "ru":"Щиты", "en":"Shields" } },
	{ id:"t-hat", text:{ "ru":"Шапки", "en":"Hats" } },
	{ id:"t-consumable", text:{ "ru":"Активки", "en":"Consumables" } },
	{ id:"t-light-weapon", text:{ "ru":"Легкое оружие", "en":"Light weapon" } },
	{ id:"t-medium-weapon", text:{ "ru":"Среднее оружие", "en":"Medium weapon" } },
	{ id:"t-protection", text:{ "ru":"Защита", "en":"Protection" } },
	{ id:"t-mobility", text:{ "ru":"Мобильность", "en":"Mobility" } },
	{ id:"t-clip-size", text:{ "ru":"Размер магазина", "en":"Clip size" } },
	{ id:"t-ammo", text:{ "ru":"Кол-во боеприпасов", "en":"Ammo" } },
	{ id:"t-reload-cost", text:{ "ru":"ОД для перезарядки", "en":"Reload cost" } },
	{ id:"t-required-level", text:{ "ru":"Необходимый уровень", "en":"Required level" } },
	{ id:"t-required-class", text:{ "ru":"Необходимый класс", "en":"Required class" } },
	{ id:"t-assault", text:{ "ru":"Штурмовик", "en":"Assault" } },
	{ id:"t-scout", text:{ "ru":"Скаут", "en":"Scout" } },
	{ id:"t-juggernaut", text:{ "ru":"Джаггернаут", "en":"Juggernaut" } },
	{ id:"t-support", text:{ "ru":"Поддержка", "en":"Support" } },
	{ id:"t-required-skill", text:{ "ru":"Требуемый навык", "en":"Required skill" } },
	{ id:"t-active-item", text:{ "ru":"Активная вещь", "en":"Active item" } },
	{ id:"t-required", text:{ "ru":"Необходимо", "en":"Required" } },
	{ id:"t-AP", text:{ "ru":"ОД", "en":"\AP" } },
	{ id:"t-link", text:{ "ru":"ссылка", "en":"link" } },
	{ id:"t-level", text:{ "ru":"Уровень", "en":"Level" } },
	{ id:"t-hide-tooltip", text:{ "ru":"Спрятать тултипы талантов", "en":"Hide talent tooltips" } },
	{ id:"t-version", text:{ "ru":"Версия игры", "en":"Game version" } },
	{ id:"t-merc-level", text:{ "ru":"Уровень бойца", "en":"Mercenary level" } },
	{ id:"t-cost", text:{ "ru":"Стоимость", "en":"Cost" } },
	{ id:"t-skill-points", text:{ "ru":"очков навыков", "en":"skill points" } },
	{ id:"t-radius", text:{ "ru":"Радиус", "en":"Radius" } },
	{ id:"t-number-of-uses", text:{ "ru":"Число использований", "en":"Number of uses" } },
	{ id:"t-AP-cost", text:{ "ru":"Затраты ОД", "en":"AP cost" } },
	{ id:"t-description", text:{ "ru":"Описание", "en":"Description" } },
	{ id:"t-rank", text:{ "ru":"Ранг", "en":"Rank" } },
	{ id:"t-effect", text:{ "ru":"Эффект", "en":"Effect" } }
	// { id:"t-", text:{ "ru":"", "en":"" } }
];

function applyLocaleToInterface(locale) {
	for (item of localizationData){
		var id = item.id;
		$("[name=" + id + "]").each(function(){
			$(this).html(item.text[locale]);
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
	if (inventoryApp != "undefined") {
		inventoryApp.applyLocale(locale);
		for (slot in inventoryApp.possible_slots){
			inventoryApp.updateSlotTooltip(slot);
		}
	}
	if (talentApplication != "undefined") {
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
$("#items-pool").tabs();
$( "#tabs" ).tabs();
$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );