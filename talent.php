<?php
include "commons.php";
if(!isset($_GET["id"]) && IsNullOrEmptyString($id)) {
	print "talent is not specified";
	return;
}
if (!isset($_GET["prefix"]) && IsNullOrEmptyString($id)) {
	print "class prefix is not specified";
	return;
}
$iframe = isset($_GET["iframe"]);
$id = $_GET["id"];
$prefix = $_GET["prefix"];

if (isset($_GET["locale"])) {
	$GLOBALS["locale"] = $_GET["locale"];
} else {
	$GLOBALS["locale"] = "ru";
}

if (isset($_GET["version"])) {
	$version = $_GET["version"];
	$PATH_TO_TALENTS = "js/talents/" . $_GET["version"] . "/" . $prefix;
	$filename = $PATH_TO_TALENTS . "/" . $id . ".js";
} else {
	$version = 101;
	$filename = "";
}

if (!file_exists($filename)) {
	$PATH_TO_TALENTS = "js/talents/" . $prefix;
	$filename = $PATH_TO_TALENTS . "/" . $id . ".js";
	if (!file_exists($filename)) {
		print "talent data is not found";
		return;
	}
}
$filecontent = file_get_contents($filename);
$data = json_decode($filecontent, true);
if (json_last_error() != 0) {
	print 'error parsing item data';
}
if (isset($data["talentreq"])) {
	$filename = $PATH_TO_TALENTS . "/" . $data["talentreq"] . ".js";
	if (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$required_data = json_decode($filecontent, true);
	}
}
if ($id > 100) {
	$current_rank = 1;
	$base_talent = ($id - $id%10);
	$base_id = $base_talent/10;
	$next_id = $base_talent + $current_rank;
	$filename = $PATH_TO_TALENTS . "/" . $next_id . ".js";
	
	while (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$ranks[$current_rank] = json_decode($filecontent, true);
		$next_id ++;
		$current_rank ++;
		$filename = $PATH_TO_TALENTS . "/" . $next_id . ".js";
	}
} else {
	$base_id = $id;
}

$TALENT_BOX_SIZE = 48;

$imagedx = ($base_id % 20) * $TALENT_BOX_SIZE;
$imagedy = floor($base_id / 20) * $TALENT_BOX_SIZE;

header("Content-Type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
<link href="css/local.css" rel="stylesheet">
</head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<div class="tooltip-image-container" style="width:<?php print $TALENT_BOX_SIZE; ?>px;height:<?php print $TALENT_BOX_SIZE; ?>px;">
			<img src="Skills<?php print $version; ?>.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
<h3><?php print $data["name"] ?></h3>
<?php if (!isset($ranks)) {?>
	<div class="entry"><span class="key"><?php print Placeholder("t-required");?>:</span>
		<?php if (isset($data["lvlreq"])) {?>
			<?php print Placeholder("t-merc-level");?>&nbsp;<?php print $data["lvlreq"]?>
		<?php } ?>
		<?php if (isset($required_data["name"])) {?>
			<?php print ", " . $required_data["name"]; ?>
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
	<div class="entry"><span class="key"><?php print Placeholder("t-description");?>:</span> <?php print $data["description"] ?></div>
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
		<div  class="entry"><span class="key"><?php print Placeholder("t-effect");?>:</span> <?php print $ranks[$i]["effect"];?></div>
	</div>
	<?php }?>
	</div>
<?php } ?>
</div>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/utils.js"></script>
<?php if (!$iframe) { ?>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>