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
$talentreq_name = "";
if (isset($data["talentreq"])) {
	if (isset($data["classreq"])) {
		$talentreq = $data["classreq"][0] . "/" . $data["talentreq"];
	} else {
		$talentreq = "as/" . $data["talentreq"];
	}
	$filename = "js/talents/" . $talentreq . ".js";
	if (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$talent = json_decode($filecontent, true);
		if (json_last_error() == 0 && isset($talent["name"])) {
			$talentreq_name = $talent["name"];
		}
	}
}
$base_grade = 100;
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print $data["name"];?></title>
<?php } ?>
</head>
<body>
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<img src="itemspng/item<?php print $id; ?>00.png" style="float:right;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));"/>
	<?php } ?>
	<div style="color:white;font-size:16pt;"><?php print $data["name"]; ?></div>
	<?php if (!IsNullOrEmptyString($consumable_type_name)) { ?>
		<div class="entry">Активная вещь (<?php print $consumable_type_name; ?>)</div>
	<?php } ?>
	<?php if(isset($data["lvlreq"])) { ?>
		<div class="entry">Необходимый уровень: <?php print $data["lvlreq"];?></div>
	<?php } ?>
	<?php if (!IsNullOrEmptyString($talentreq_name)) { ?>
		<div class="entry">Требуемый навык: <?php print $talentreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"] ?></div>
	<?php } ?>
	<?php if (isset($data["specials"])) {
		$specials = $data["specials"];
		include "template_specials.php";
	} ?>
	<?php if (isset($data["AP_cost"])) {?>
		<div class="entry">Необходимо <?php print $data["AP_cost"];?> ОД</div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
</div>

<?php if (!$iframe) { ?>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>