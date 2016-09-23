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
if (isset($data["imageid"])) {
	$imageid = $data["imageid"];
} else {
	$imageid = $id;
}
if (isset($data["protection"])) {
	$real_grade = $base_grade + $quality * 1.5;
	$protection = $data["protection"];
	$real_protection = round($protection + ($protection / 100 * ($real_grade - 100) * 1.5));
}

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
	<div class="entry"><?php print Placeholder("t-armor"); ?></div>
	<?php if (isset($data["protection"])) {?>
		<div class="entry"><?php print Placeholder("t-protection"); ?>: <?php print $real_protection;?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry"><?php print Placeholder("t-mobility"); ?>: <?php print $data["mobility"]; ?></div>
	<?php } ?>
	<?php if (isset($data["lvlreq"])) {?>
		<div class="entry"><?php print Placeholder("t-required-level"); ?>: <?php if ($color == "gray") {
			print $data["lvlreq"] - 1;
		} else {
			print $data["lvlreq"];
		}?></div>
	<?php } ?>
	<?php if (isset($data["classreq"])) { ?>
		<div class="entry"><?php print Placeholder("t-required-class"); ?>:
			<?php for ($i = 0; $i < count($data["classreq"]); $i++) { 
				if ($i > 0) {
					print ",";
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
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print GetLocalizedProperty($data, "description", $GLOBALS["locale"]); ?></div>
	<?php } ?>
</div>
<?php if (!$GLOBALS["iframe"]) { ?>
	<div id="armor" class="tunable-item">
		<div class="tunable-item-name">
			<a target="_blank" id="armor-link">
				<span id="armor-name"></span><span id="armor-value"></span>
			</a>
		</div>
		<div class="draggable-landing">
			<div id="armor-container" class="inventory-item-container">
				<img src="images/slot-armor.png"/>
			</div>
			<a class="tunable-reset" onclick="player_model.reset_inventory_slot('armor');">
				<span id="armor-reset">очистить</span>
			</a>
		</div>
		<div class="tunable-properties-container">
			<input type="radio" name="armor-quality" value="gray" id="armor-quality-gray" class="quality">
				<label for="armor-quality-gray"><span class="gray"></span></label>
			</input>
			<input type="radio" name="armor-quality" value="white" id="armor-quality-white" class="quality" checked>
				<label for="armor-quality-white"><span class="white"></span></label>
			</input>
			<input type="radio" name="armor-quality" value="green" id="armor-quality-green" class="quality">
				<label for="armor-quality-green"><span class="green"></span></label>
			</input>
			<input type="radio" name="armor-quality" value="blue" id="armor-quality-blue" class="quality">
				<label for="armor-quality-blue"><span class="blue"></span></label>
			</input>
		</div>
		<div id="armor-slider"></div>
	</div>
	<select id="selLang" style="margin:10px;float:right;">
		<option value="ru">ру</option>
		<option value="en">en</option>
	</select>
	<div class="fake-tooltip-container" style="margin:2px;">
		<div class="fake-tooltip" id="armor-fake-tooltip">
		</div>
	</div>
	<div id="items-pool" style="clear:both;overflow:auto;">
		<div id="armor-pool" class="pool"></div>
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