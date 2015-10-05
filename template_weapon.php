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
	$category = "middle";
}
$talentreq_name = "";
if (isset($data["talentreq"])) {
	if (isset($data["classreq"])) {
		$talentreq = $data["classreq"][0] . "/" . $data["talentreq"];
	} else {
		$talentreq = "as/" . $data["talentreq"];
	}
	$filename = "js/talents/" . $talentreq . ".js";
	if (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$talent = json_decode($filecontent, true);
		if (json_last_error() == 0 && isset($talent["name"])) {
			$talentreq_name = $talent["name"];
		}
	}
}

header("Content-Type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print $data["name"];?></title>
<?php } ?>
<?php if (!$iframe) { ?>
	<link href="css/jquery-ui.css" rel="stylesheet">
	<link href="css/local.css" rel="stylesheet">
	<script src="js/jquery.js"></script>
	<script src="js/jquery-ui.js"></script>
<script src="js/item_detail.js"></script>
	<script>
        function resizeIframe(obj) {
            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
        }
	</script>
	<script src="item_data.php"></script>
<?php } ?>
</head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div style="color:<?php print $colorname; ?>;font-size:16pt;">
		<?php print $data["name"]; 
			if ($quality != 0)
			{ print " +".$quality; } ?>
	</div>
	<?php if ($category == "light") {?>
		<div class="entry">Легкое оружие</div>
	<?php } else { ?>
		<div class="entry">Среднее оружие</div>
	<?php } ?>
	<?php if (isset($data["protection"])) {?>
		<div class="entry">Защита: <?php print $data["protection"];?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry">Мобильность: <?php print $data["mobility"]; ?></div>
	<?php } ?>
	<?php if (isset($data["clip"])) {?>
		<div class="entry">Размер магазина: <?php print $data["clip"]; ?></div>
	<?php } ?>
	<?php if (isset($data["ammo"])) {?>
		<div class="entry">Кол-во боеприпасов: <?php print $data["ammo"]; ?></div>
	<?php } ?>
	<?php if (isset($data["reload_cost"])) {?>
	<div class="entry">ОД для перезарядки: <?php print $data["reload_cost"];?></div>
	<?php } ?>
	<?php if (isset($data["lvlreq"])) {?>
		<div class="entry">Необходимый уровень: <?php if ($color == "gray") {
			print $data["lvlreq"] - 1;
		} else {
			print $data["lvlreq"];
		}?></div>
	<?php } ?>
	<?php if (isset($data["classreq"])) { ?>
		<div class="entry">Требуемый класс:
			<?php for ($i = 0; $i < count($data["classreq"]); $i++) { 
				if ($i > 0) {
					print ",";
				}
				if ($data["classreq"][$i] == "as") {
					print "Штурмовик";
					break;
				}
				if ($data["classreq"][$i] == "sc"){
					print "Скаут";
					break;
				}
				if ($data["classreq"][$i] == "ju") {
					print "Джаггернаут";
					break;
				}
				if ($data["classreq"][$i] == "su"){
					print "Поддержка";
					break;
				}
			} ?>
		</div>
	<?php } ?>
	<?php if (isset($data["talentreq"])) {?>
		<div class="entry">Требуемый навык: <?php print $talentreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
<?php if (!$iframe) { ?>
	<div id="primary" class="tunable-item">
		<div><a target="_blank" id="primary-link"><span id="primary-name"></span><span id="primary-value"></span></a></div>
		<div style="overflow:auto;">
			<div class="draggable-landing">
				<div id="primary-container" style="overflow:auto;">
					<img src="itemspng/slot-primary.png"/>
				</div>
				<a class="tunable-reset" onclick="player_model.reset_inventory_slot('primary');">очистить</a>
			</div>
			<div style="float:left;">
				<input type="radio" name="primary-quality" value="gray" id="primary-quality-gray" class="quality">
					<label for="primary-quality-gray"><span class="gray"><span class="gray"></span></span></label>
				</input>
				<input type="radio" name="primary-quality" value="white" id="primary-quality-white" class="quality" checked>
					<label for="primary-quality-white"><span class="white"><span class="white"></span></span></label>
				</input>
				<input type="radio" name="primary-quality" value="green" id="primary-quality-green" class="quality">
					<label for="primary-quality-green"><span class="green"><span class="green"></span></span></label>
				</input>
				<input type="radio" name="primary-quality" value="blue" id="primary-quality-blue" class="quality">
					<label for="primary-quality-blue"><span class="blue"><span class="blue"></span></span></label>
				</input>
				<div id="primary-slider" style="clear:both;"></div>
			</div>
		</div>
	</div>
	<div class="fake-tooltip-container" style="margin:2px;">
		<div class="fake-tooltip" id="primary-fake-tooltip">
			<iframe id="primary-iframe" scrolling="no" frameBorder="0" onload="javascript:resizeIframe(this);"></iframe>
		</div>
	</div>
	<div id="items-pool" style="clear:both;overflow:auto;">
		<ul>
			<li><a href="#all-melee">Ближний бой</a></li>
			<li><a href="#all-pistol">Пистолеты</a></li>
			<li><a href="#all-smg">ПП</a></li>
			<li><a href="#all-shotgun">Дробовики</a></li>
			<li><a href="#all-assault-rifle">Автоматы</a></li>
			<li><a href="#all-sniper-rifle">Снайперское</a></li>
			<li><a href="#all-machinegun">Пулеметы</a></li>
			<li><a href="#all-launcher">Взрывное</a></li>
			<li><a href="#all-shield">Щиты</a></li>
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
<script>
$("#items-pool").tabs();
$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
</script>
<script src="js/inventory-controller.js"></script>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>