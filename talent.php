<?php
include "commons.php";
if(!isset($_GET["id"]) && IsNullOrEmptyString($id)) {
	print "talent id is not specified";
	return;
}
if (!isset($_GET["prefix"]) && IsNullOrEmptyString($id)) {
	print "class prefix is not specified";
	return;
}
$id = $_GET["id"];
$prefix = $_GET["prefix"];


$filename = "js/talents/archive" . $GLOBALS["version"] . ".json";

if (!file_exists($filename)) {
	print "talent data is not found";
	return;
}

$filecontent = file_get_contents($filename);
$talentData = json_decode($filecontent, true);
if (json_last_error() != 0) {
	print 'error parsing talents data';
}
if ($id > 100) {
	$base_id = floor($id/10);
	for ($i = 0; $i < count($talentData[$prefix]["talents"]); $i++) {
		$current = $talentData[$prefix]["talents"][$i];
		if ($current["id"] == $id) {
			$data = $current;
		}
		if (floor($current["id"]/10) == floor($id/10)) {
			$ranks[$current["id"]%10] = $current;
		}
	}
} else {
	for ($i = 0; $i < count($talentData[$prefix]["talents"]); $i++){
		$current = $talentData[$prefix]["talents"][$i];
		if ($current["id"] == $id) {
			$data = $current;
		}
	}
	$base_id = $id;
}
if (isset($data["talentreq"])) {
	for ($i = 0; $i < count($talentData[$prefix]["talents"]); $i++){
		$current = $talentData[$prefix]["talents"][$i];
		if ($current["id"] == $data["talentreq"]) {
			$required_data = $current;
		}
	}
}

$TALENT_BOX_SIZE = 48;

$imagedx = ($base_id % 20) * $TALENT_BOX_SIZE;
$imagedy = floor($base_id / 20) * $TALENT_BOX_SIZE;

header("Content-Type: text/html; charset=utf-8");

if (!$iframe) {
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title><?php print GetLocalizedProperty($data,"name", $GLOBALS["locale"]); ?></title>
	<link href="css/local.css" rel="stylesheet">
</head>
<body style="margin:0px;">
<?php } ?>
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<div class="tooltip-image-container" style="width:<?php print $TALENT_BOX_SIZE; ?>px;height:<?php print $TALENT_BOX_SIZE; ?>px;">
			<img src="images/Skills<?php print $GLOBALS["version"] ?>.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
<h3><?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?>
<?php print "  <a target='_blank' class='white-link' href='talent.php?id=" . $id . "&locale=" . $locale . "&prefix=" . $prefix . "&version=" . $GLOBALS["version"] . "'>";
	print "link";
print "</a>";?>
</h3>
<?php if (!isset($ranks)) {?>
	<div class="entry"><span class="key"><?php print Placeholder("t-required");?>:</span>
		<?php if (isset($data["lvlreq"])) {?>
			<?php print Placeholder("t-merc-level");?>&nbsp;<?php print $data["lvlreq"]?>
		<?php } ?>
		<?php if (isset($required_data["name"])) {?>
			<?php print ", <a class='white-link' target='_blank' href='/talent.php?id=" . $data["talentreq"]
					. "&locale=" . $locale
					. "&prefix=" . $prefix
					. "&version=" .$GLOBALS["version"]
					. "'>" . GetLocalizedProperty($required_data,"name", $GLOBALS["locale"])
					. "</a>"; ?>
		<?php }?>
	</div>
	<?php if(isset($data["cost"])){?>
		<div class="entry"><span class="key"><?php print Placeholder("t-cost");?>:</span> <?php print $data["cost"] ?> <?php print Placeholder("t-skill-points");?></div>
	<?php } ?>
<?php } ?>
<?php if (isset($data["radius"])){?>
	<div class="entry"><span class="key"><?php print Placeholder("t-radius");?>:</span> <?php print $data["radius"]?></div>
<?php }?>
<?php if (isset($data["number_of_uses"])) { ?>
	<div class="entry"><span class="key"><?php print Placeholder("t-number-of-uses");?>:</span> <?php print $data["number_of_uses"]; ?></div>
<?php } ?>
<?php if (isset($data["AP_cost"])) {?>
	<div class="entry"><span class="key"><?php print Placeholder("t-AP-cost");?>:</span> <?php print $data["AP_cost"] ?></div>
<?php } ?>
<?php if (isset($data["description"])) {?>
	<div class="entry"><span class="key"><?php print Placeholder("t-description");?>:</span> <?php print GetLocalizedProperty($data, "description", $GLOBALS["locale"]); ?></div>
<?php } ?>
<?php if (isset($ranks)) {
	for ($i = 1; $i <= count($ranks); $i ++) {?>
	<div><div class="attack-name"><?php print Placeholder("t-rank");?> <?php print $i ?></div>
		<?php if (isset($ranks[$i]["cost"])) {?>
			<div class="entry"><span class="key"><?php print Placeholder("t-cost");?>:</span> <?php print $ranks[$i]["cost"] ?></div>
		<?php }?>
		<?php if (isset($ranks[$i]["lvlreq"])) {?>
			<div class="entry"><span class="key"><?php print Placeholder("t-required-level");?>:</span> <?php print $ranks[$i]["lvlreq"] ?></div>
		<?php } ?>
		<div  class="entry"><span class="key"><?php print Placeholder("t-effect");?>:</span> <?php print GetLocalizedProperty($ranks[$i], "effect", $GLOBALS["locale"]);?></div>
	</div>
	<?php }?>
	</div>
<?php } ?>
</div>
<?php if (!$iframe) { ?>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/utils.js"></script>
<script src="js/analytics.js"></script>
</body>
</html>
<?php } ?>