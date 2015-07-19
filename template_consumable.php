<?php
if (isset($data["consumable_type"])) {
	switch($data["consumable_type"]) {
		case 1:
			$consumable_type_name = "Аптечка";
			break;
		case 2:
			$consumable_type_name = "Стимулятор";
			break;
		case 3:
			$consumable_type_name = "Оборудование";
			break;
		case 4:
			$consumable_type_name = "Граната";
			break;
		default:
			$consumable_type_name = "";
			break;
	}
} else {
	$consumable_type_name = "";
}
$skillreq_name = "";
if (isset($data["skillreq"])) {
	$skillreq = $data["skillreq"];
	$filename = "js/talents/" . $skillreq . ".js";
	if (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$talent = json_decode($filecontent, true);
		if (json_last_error() == 0 && isset($talent["name"])) {
			$skillreq_name = $talent["name"];
		}
	}
}
$base_grade = 100;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
</head>
<body>
<div class="ui-tooltip" style="overflow:auto;">
	<img src="itemspng/item<?php print $data["id"]; ?>00.png" style="float:right"/>
	<div style="font-size:14pt;"><?php print $data["name"]; ?></div>
	<?php if (!IsNullOrEmptyString($consumable_type_name)) { ?>
		<div>Активная вещь (<?php print $consumable_type_name; ?>)</div>
	<?php } ?>
	<?php if(isset($data["lvlreq"])) { ?>
		<div>Необходимый уровень: <?php print $data["lvlreq"];?></div>
	<?php } ?>
	<?php if (!IsNullOrEmptyString($skillreq_name)) { ?>
		<div>Требуемый навык: <?php print $skillreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["description"])) {?>
		<div><?php print $data["description"] ?></div>
	<?php } ?>
	<?php if (isset($data["specials"])) {
		$specials = $data["specials"];
		include "template_specials.php";
	} ?>
	<?php if (isset($data["AP_cost"])) {?>
		<div>Необходимо <?php print $data["AP_cost"];?> ОД</div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
</div>
<?php
$previd = $id - 1;
$filename = "js/items/" . $previd . ".js";
while (!file_exists($filename) && $previd >= 0) {
	$previd --;
	$filename = "js/items/" . $previd . ".js";
}
?>
<a href="?id=<?php print $previd;?>" style="float:right"> предыдущий - <?php print $previd;?> </a>
<?php
$nextid = $id + 1;
$filename = "js/items/" . $nextid . ".js";
while (!file_exists($filename) && $nextid <= 1000) {
	$nextid ++;
	$filename = "js/items/" . $nextid . ".js";
}
?>
<a href="?id=<?php print $nextid;?>" style="clear:right;float:right"> следующий - <?php print $nextid;?> </a>
</body>
</html>