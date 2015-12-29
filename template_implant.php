<?php
$base_grade = 100;

header("Content-Type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]);?></title>
<?php } ?>
</head>
<body>
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$GLOBALS["iframe"]) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div style="color:white;font-size:16pt;" id="item<?php print $data["id"]; ?>name"><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?></div>
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
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>