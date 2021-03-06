<?php
if (isset($_GET["version"])) {
	$GLOBALS["version"] = $_GET["version"];
} else {
	$GLOBALS["version"] = 106;
}
if (isset($_GET["locale"])) {
	$GLOBALS["locale"] = $_GET["locale"];
} else {
	$GLOBALS["locale"] = "ru";
}
if (isset($_GET["iframe"])) {
	$GLOBALS["iframe"] = true;
} else {
	$GLOBALS["iframe"] = false;
}

function GetLocalizedProperty($container, $property, $locale) {
	if (!isset($container[$property])){
		return "";
	}
	if (is_array($container[$property])){
		if (isset($container[$property][$locale])){
			return $container[$property][$locale];
		} else {
			return $container[$property]["ru"];
		}
	} else {
		return $container[$property];
	}
}

function LoadItemData($version){
	$filename = "js/items/archive" . $version . ".json";
	if (!file_exists($filename)) {
		print "item data is not found";
		die;
	}

	$filecontent = file_get_contents($filename);
	$itemsData = json_decode($filecontent, true);
	if (json_last_error() != 0) {
		print 'error parsing items data';
		die;
	}
	return $itemsData;
}

function FindItem($id, $itemsData){
	$data = null;
	for ($i = 0; $i < count($itemsData); $i++) {
		$current = $itemsData[$i];
		if ($current["id"] == $id) {
			return $current;
			break;
		}
	}
	if ($data == null) {
		print "item data is not found";
		die;
	}
}
function talentsVersionFallback($v) {
	if ($v == 100 || $v == 99) {
		return 98;
	}
	if ($v == 104 || $v == 105 || $v == 106) {
		return 103;
	}
	return $v;
}
// Function for basic field validation (present and neither empty nor only white space
function IsNullOrEmptyString($question){
    return (!isset($question) || trim($question)==='');
}
function Placeholder($key) {
	if (isset($GLOBALS["locale"])) {
		$locale = $GLOBALS["locale"];
	} else {
		$locale = "ru";
	}
	if ($GLOBALS["iframe"]) {
		return GetLocalizedProperty($GLOBALS["localizationData"], $key, $locale);
	} else {
		return "<span name=\"" . $key . "\">"
			. GetLocalizedProperty($GLOBALS["localizationData"], $key, $locale)
			. "</span>";
	}
}
function getRequiredTalentName($data){
	$filename = "js/talents/archive" . talentsVersionFallback($GLOBALS["version"]) . ".json";

	if (!file_exists($filename)) {
		print "talent data is not found " . $filename;
		return;
	}

	$filecontent = file_get_contents($filename);
	$talentData = json_decode($filecontent, true);
	if (json_last_error() != 0) {
		print 'error parsing talent ' . $id . ' data';
	}
	if (isset($data["classreq"])) {
		$prefix = $data["classreq"][0];
	} else {
		$prefix = "as";
	}
	if (isset($data["talentreq"])) {
		for ($i = 0; $i < count($talentData[$prefix]["talents"]); $i++){
			$current = $talentData[$prefix]["talents"][$i];
			if ($current["id"] == $data["talentreq"]) {
				return GetLocalizedProperty($current, "name", $GLOBALS["locale"]);
			}
		}
	}
	return "";
}

$GLOBALS['localizationData'] = json_decode(str_replace("'", "\"", "{
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
	't-clip':{ 'ru':'Размер магазина', 'en':'Clip size' },
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
	't-subscription':{'ru':'Форумная подпись', 'en':'Forum subscription'}
	}"), true);
if (json_last_error() != 0) {
	print 'error parsing localizationData';
	return;
}
?>