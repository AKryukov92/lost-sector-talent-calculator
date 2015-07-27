<?php
function IsNullOrEmptyString($question) {
	return (!isset($question) || trim($question)==='');
}
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
$PATH_TO_TALENTS = "js/talents/" . $prefix;
$filename = $PATH_TO_TALENTS . "/" . $id . ".js";
if (!file_exists($filename)) {
	print "talent data is not found";
	return;
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
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
</head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<img src="skillspng/<?php print $base_id; ?>00.png" style="float:right;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));"/>
	<?php } ?>
<h3><?php print $data["name"] ?></h3>
<?php if (!isset($ranks)) {?>
	<div class="entry"><span class="key">Требуется:</span>
		<?php if (isset($data["lvlreq"])) {?>
			 Уровень бойца <?php print $data["lvlreq"]?>
		<?php } ?>
		<?php if (isset($required_data["name"])) {?>
			<?php print ", " . $required_data["name"]; ?>
		<?php }?>
	</div>
	<?php if(isset($data["cost"])){?>
		<div class="entry"><span class="key">Стоимость:</span> <?php print $data["cost"] ?> очков навыков</div>
	<?php } ?>
	
<?php } ?>
<?php if (isset($data["radius"])){?>
	<div class="entry"><span class="key">Радиус:</span> <?php print $data["radius"]?></div>
<?php }?>
<?php if (isset($data["number_of_uses"])) { ?>
	<div class="entry"><span class="key">Число использований:</span> <?php print $data["number_of_uses"]; ?></div>
<?php } ?>
<?php if (isset($data["AP_cost"])) {?>
	<div class="entry"><span class="key">Затраты ОД:</span> <?php print $data["AP_cost"] ?></div>
<?php } ?>
<?php if (isset($data["description"])) {?>
	<div class="entry"><span class="key">Описание:</span> <?php print $data["description"] ?></div>
<?php } ?>
<?php if (isset($ranks)) {
	for ($i = 1; $i <= count($ranks); $i ++) {?>
	<div><div class="attack-name"><span>Ранг</span> <?php print $i ?></div>
		<?php if (isset($ranks[$i]["cost"])) {?>
			<div class="entry"><span class="key">Стоимость:</span> <?php print $ranks[$i]["cost"] ?></div>
		<?php }?>
		<?php if (isset($ranks[$i]["lvlreq"])) {?>
			<div class="entry"><span class="key">Требуемый уровень:</span> <?php print $ranks[$i]["lvlreq"] ?></div>
		<?php } ?>
		<div  class="entry"><span class="key">Эффект:</span> <?php print $ranks[$i]["effect"];?></div>
	</div>
	<?php }?>
	</div>
<?php } ?>
</div>
</body>
</html>