<?php
include "commons.php";
header("Content-Type: text/html; charset=utf-8");
$iframe = false;
if(!isset($_POST["current"])) {
	print "talent data was not provided";
	return;
}
if (!isset($_POST["prefix"])) {
	print "Class prefix is not specified";
	return;
}
if (isset($_POST["locale"])) {
	$GLOBALS["locale"] = $_POST["locale"];
} else {
	$GLOBALS["locale"] = "ru";
}
$data = $_POST["current"];
$prefix = $_POST["prefix"];
if (isset($_POST["required"])) {
	$required_data = $_POST["required"];
}
?>
<div class="tooltip-content" style="overflow:auto;">
<h3>
	<?php print GetLocalizedProperty($data, "name", $GLOBALS["locale"]); ?>
</h3>
<?php if (!isset($ranks)) {?>
	<div class="entry"><span class="key"><?php print Placeholder("t-required");?>:</span>
		<?php if (isset($data["lvlreq"])) {?>
			<?php print Placeholder("t-merc-level");?>&nbsp;<?php print $data["lvlreq"]?>
		<?php } ?>
		<?php if (isset($required_data["name"])) {?>
			<?php print ", " . GetLocalizedProperty($required_data,"name", $GLOBALS["locale"]); ?>
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