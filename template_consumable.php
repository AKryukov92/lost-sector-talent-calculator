<?php
if (isset($data["consumable_type"])) {
	switch($data["consumable_type"]) {
		case 1:
			$consumable_type_name = Placeholder("t-medkit");
			break;
		case 2:
			$consumable_type_name = Placeholder("t-steroid");
			break;
		case 3:
			$consumable_type_name = Placeholder("t-gear");
			break;
		case 4:
			$consumable_type_name = Placeholder("t-grenade");
			break;
		default:
			$consumable_type_name = "";
			break;
	}
} else {
	$consumable_type_name = "";
}
$talentreq_name = getRequiredTalentName($data);
$base_grade = 100;

header("Content-Type: text/html; charset=utf-8");

if (!$GLOBALS["iframe"]) {
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
<?php } ?>
<div class="tooltip-content">
	<?php if (!$GLOBALS["iframe"]) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div style="color:white;font-size:16pt;" id="item<?php print $data["id"]; ?>name"><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?></div>
	<?php if (!IsNullOrEmptyString($consumable_type_name)) { ?>
		<div class="entry"><?php print Placeholder("t-active-item"); ?> (<?php print $consumable_type_name; ?>)</div>
	<?php } ?>
	<?php if(isset($data["lvlreq"])) { ?>
		<div class="entry"><?php print Placeholder("t-required-level"); ?>: <?php print $data["lvlreq"];?></div>
	<?php } ?>
	<?php if (!IsNullOrEmptyString($talentreq_name)) { ?>
		<div class="entry"><?php print Placeholder("t-required-skill"); ?>: <?php print $talentreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print GetLocalizedProperty($data, "description", $GLOBALS["locale"]); ?></div>
	<?php } ?>
	<?php if (isset($data["specials"])) {
		$specials = $data["specials"];
		include "template_specials.php";
	} ?>
	<?php if (isset($data["AP_cost"])) {?>
		<div class="entry"><?php print Placeholder("t-required"); ?> <?php print $data["AP_cost"];?> <?php print Placeholder("t-AP"); ?></div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
</div>
<?php if (!$GLOBALS["iframe"]) { ?>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>