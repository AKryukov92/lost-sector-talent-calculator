<?php
switch($color) {
	case "gray" :
		$colorname = "gray";
		$base_grade = 90;
		break;
	case "green" :
		$colorname = "#20dd20";
		$base_grade = 115;
		break;
	case "blue" :
		$colorname = "#4870fd";
		$base_grade = 125;
		break;
	default :
		$colorname = "white";
		$base_grade = 100;
		break;
}
if($data["category"] == "pistol" || $data["category"] == "melee" || $data["category"] == "smg") {
	$category = "light";
} else {
	$category = "medium";
}
$talentreq_name = getRequiredTalentName($data);

header("Content-Type: text/html; charset=utf-8");

if (!$GLOBALS["iframe"]) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
<?php if (isset($data["name"])) { ?>
	<title><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]);?></title>
<?php } ?>
	<link href="css/jquery-ui.css" rel="stylesheet">
	<link href="css/local.css" rel="stylesheet">
	<link href="css/local624.css" rel="stylesheet">
	<link href="css/local1280.css" rel="stylesheet">
	<link href="css/local1920.css" rel="stylesheet">
	<script>
        function resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
	</script>
</head>
<body style="margin:0px;">
<?php } ?>
<div class="tooltip-content">
	<?php if (!$GLOBALS["iframe"]) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div class="item-name" style="color:<?php print $colorname; ?>;">
		<?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]);
			if ($quality != 0)
			{ print " +".$quality; } ?>
	</div>
	<?php if ($category == "light") {?>
		<div class="entry"><?php print Placeholder("t-light-weapon"); ?></div>
	<?php } else { ?>
		<div class="entry"><?php print Placeholder("t-medium-weapon"); ?></div>
	<?php } ?>
	<?php if (isset($data["protection"])) {?>
		<div class="entry"><?php print Placeholder("t-protection"); ?>: <?php print $data["protection"];?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry"><?php print Placeholder("t-mobility"); ?>: <?php print $data["mobility"]; ?></div>
	<?php } ?>
	<?php if (isset($data["clip"])) {?>
		<div class="entry"><?php print Placeholder("t-clip"); ?>: <?php print $data["clip"]; ?></div>
	<?php } ?>
	<?php if (isset($data["ammo"])) {?>
		<div class="entry"><?php print Placeholder("t-ammo"); ?>: <?php print $data["ammo"]; ?></div>
	<?php } ?>
	<?php if (isset($data["reload_cost"])) {?>
		<div class="entry"><?php print Placeholder("t-reload-cost"); ?>: <?php print $data["reload_cost"];?></div>
	<?php } ?>
	<?php if (isset($data["lvlreq"])) {?>
		<div class="entry"><?php print Placeholder("t-required-level"); ?>:
		<?php if ($color == "gray") {
			print $data["lvlreq"] - 1;
		} else {
			print $data["lvlreq"];
		}?></div>
	<?php } ?>
	<?php if (isset($data["classreq"])) { ?>
		<div class="entry"><?php print Placeholder("t-required-class"); ?>:
			<?php for ($i = 0; $i < count($data["classreq"]); $i++) { 
				if ($i > 0) {
					print ", ";
				}
				if ($data["classreq"][$i] == "as") {
					print Placeholder("t-assault");
				}
				if ($data["classreq"][$i] == "sc"){
					print Placeholder("t-scout");
				}
				if ($data["classreq"][$i] == "ju") {
					print Placeholder("t-juggernaut");
				}
				if ($data["classreq"][$i] == "su"){
					print Placeholder("t-support");
				}
			} ?>
		</div>
	<?php } ?>
	<?php if (isset($data["talentreq"])) {?>
		<div class="entry"><?php print Placeholder("t-required-skill"); ?>: <?php print $talentreq_name; ?> </div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print GetLocalizedProperty($data, "description", $GLOBALS["locale"]); ?></div>
	<?php } ?>
</div>
<?php if (!$GLOBALS["iframe"]) { ?>
	<div id="primary" class="tunable-item">
		<div class="tunable-item-name">
			<a target="_blank" id="primary-link">
				<span id="primary-name"></span><span id="primary-value"></span>
			</a>
		</div>
		<div class="draggable-landing">
			<div id="primary-container" class="inventory-item-container">
				<img src="images/slot-primary.png"/>
			</div>
			<a class="tunable-reset" onclick="resetSlot('primary');"><span id="primary-reset">очистить</span></a>
		</div>
		<div class="tunable-properties-container">
			<input type="radio" name="primary-quality" value="gray" id="primary-quality-gray" class="quality">
				<label for="primary-quality-gray"><span class="gray"></span></label>
			</input>
			<input type="radio" name="primary-quality" value="white" id="primary-quality-white" class="quality" checked>
				<label for="primary-quality-white"><span class="white"></span></label>
			</input>
			<input type="radio" name="primary-quality" value="green" id="primary-quality-green" class="quality">
				<label for="primary-quality-green"><span class="green"></span></label>
			</input>
			<input type="radio" name="primary-quality" value="blue" id="primary-quality-blue" class="quality">
				<label for="primary-quality-blue"><span class="blue"></span></label>
			</input>
		</div>
		<div id="primary-slider"></div>
	</div>
	<select id="selLang" style="margin:10px;float:right;">
		<option value="ru">ру</option>
		<option value="en">en</option>
	</select>
	<div class="fake-tooltip-container" style="margin:2px;">
		<div class="fake-tooltip" id="primary-fake-tooltip">
		</div>
	</div>
	<div id="items-pool">
		<ul>
			<li><a href="#all-melee"><span name="t-melee">Ближний бой</span></a></li>
			<li><a href="#all-pistol"><span name="t-pistol">Пистолеты</span></a></li>
			<li><a href="#all-smg"><span name="t-smg">ПП</span></a></li>
			<li><a href="#all-shotgun"><span name="t-shotgun">Дробовики</span></a></li>
			<li><a href="#all-assault-rifle"><span name="t-assault-rifle">Автоматы</span></a></li>
			<li><a href="#all-sniper-rifle"><span name="t-sniper-rifle">Снайперское</span></a></li>
			<li><a href="#all-machinegun"><span name="t-machinegun">Пулеметы</span></a></li>
			<li><a href="#all-launcher"><span name="t-launcher">Взрывное</span></a></li>
			<li><a href="#all-shield"><span name="t-shield">Щиты</span></a></li>
		</ul>
		<div id="all-melee">
			<div id="melee-pool" class="pool"></div>
		</div>
		<div id="all-pistol">
			<div id="pistol-pool" class="pool"></div>
		</div>
		<div id="all-smg">
			<div id="smg-pool" class="pool"></div>
		</div>
		<div id="all-shotgun">
			<div id="shotgun-pool" class="pool"></div>
		</div>
		<div id="all-assault-rifle">
			<div id="assault_rifle-pool" class="pool"></div>
		</div>
		<div id="all-sniper-rifle">
			<div id="sniper_rifle-pool" class="pool"></div>
		</div>
		<div id="all-machinegun">
			<div id="machinegun-pool" class="pool"></div>
		</div>
		<div id="all-launcher">
			<div id="launcher-pool" class="pool"></div>
		</div>
		<div id="all-shield">
			<div id="shield-pool" class="pool"></div>
		</div>
	</div>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/utils.js"></script>
<script src="js/item_detail.js"></script>
<script src="js/single-item-controller.js"></script>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>