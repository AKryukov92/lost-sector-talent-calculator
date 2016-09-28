<?php
$base_grade = 100;

header("Content-Type: text/html; charset=utf-8");

if (!$GLOBALS["iframe"]) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<link href="css/local.css" rel="stylesheet">
	<link href="css/local624.css" rel="stylesheet">
	<link href="css/local1280.css" rel="stylesheet">
	<link href="css/local1920.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]);?></title>
<?php } ?>
</head>
<body>
<?php } ?>
<div class="tooltip-content">
	<?php if (!$GLOBALS["iframe"]) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div class="item-name" id="item<?php print $data["id"]; ?>name"><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?></div>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print GetLocalizedProperty($data, "description", $GLOBALS["locale"]); ?></div>
	<?php } ?>
	<div class="specials">
	<?php if (isset($data["effects"])) {
		for($i = 0; $i < count($data["effects"]); $i++) {
			print "<div name=\"" . $i . "\" style=\"color:#bac887;clear:both;\">"
			. GetLocalizedProperty($data["effects"], $i, $locale)
			. "</div>";
		}
	} ?>
	</div>
</div>
<?php if (!$GLOBALS["iframe"]) { ?>
	<div class="special-item">
		<a id="head_mod-link" name="t-link" target="_blank" class="white-link">ссылка</a>
		<div id="head_mod-container" class="inventory-item-container">
			<img src="images/slot-head_mod.png"/>
		</div>
		<a class="tunable-reset" onclick="resetSlot('head_mod');"><span name="t-clear">очистить</span></a>
	</div>
	<div class="fake-tooltip-container" style="margin:2px;">
		<div class="fake-tooltip" id="head_mod-fake-tooltip">
		</div>
	</div>
	<div id="items-pool" style="clear:both;overflow:auto;">
		<div id="head_mod-pool" class="pool"></div>
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