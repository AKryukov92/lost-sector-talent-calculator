<?php

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
<head>
<body style="margin:0px;">
<?php } ?>
<div class="tooltip-content">
	<?php if (!$GLOBALS["iframe"]) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div class="item-name" style="color:#ff7700;"><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?></div>
	<div class="entry"><?php print Placeholder("t-avatar");?></div>
	<div class="entry"><?php print Placeholder("t-protection");?>: 5</div>
	<?php if (isset($data["classreq"])) { ?>
		<div class="entry"><?php print Placeholder("t-required-class");?>:
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
<script src="js/analytics.js"></script>
</body>
<html>
<?php } ?>