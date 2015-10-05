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
	<script src="js/utils.js"></script>
	<script>
		function update_link() {}
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
	<div class="entry">Броня</div>
	<?php if (isset($data["protection"])) {?>
		<div class="entry">Защита: <?php print $real_protection;?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry">Мобильность: <?php print $data["mobility"]; ?></div>
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
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
<?php if (!$iframe) { ?>
	<div id="armor" class="tunable-item">
		<div><a target="_blank" id="armor-link"><span id="armor-name"></span><span id="armor-value"></span></a></div>
		<div style="overflow:auto;">
			<div class="draggable-landing">
				<div id="armor-container" style="overflow:auto;">
					<img src="itemspng/slot-armor.png"/>
				</div>
				<a class="tunable-reset" onclick="player_model.reset_inventory_slot('armor');">очистить</a>
			</div>
			<div style="float:left;">
				<input type="radio" name="armor-quality" value="gray" id="armor-quality-gray" class="quality">
					<label for="armor-quality-gray"><span class="gray"><span class="gray"></span></span></label>
				</input>
				<input type="radio" name="armor-quality" value="white" id="armor-quality-white" class="quality" checked>
					<label for="armor-quality-white"><span class="white"><span class="white"></span></span></label>
				</input>
				<input type="radio" name="armor-quality" value="green" id="armor-quality-green" class="quality">
					<label for="armor-quality-green"><span class="green"><span class="green"></span></span></label>
				</input>
				<input type="radio" name="armor-quality" value="blue" id="armor-quality-blue" class="quality">
					<label for="armor-quality-blue"><span class="blue"><span class="blue"></span></span></label>
				</input>
				<div id="armor-slider" style="clear:both;"></div>
			</div>
		</div>
	</div>
	<div class="fake-tooltip-container" style="margin:2px;">
		<div class="fake-tooltip" id="armor-fake-tooltip">
			<iframe id="armor-iframe" scrolling="no" frameBorder="0" onload="javascript:resizeIframe(this);"></iframe>
		</div>
	</div>
	<div id="items-pool" style="clear:both;overflow:auto;">
		<div id="armor-pool" class="pool"></div>
	</div>
<script>
$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
</script>
<script src="js/inventory-controller.js"></script>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>