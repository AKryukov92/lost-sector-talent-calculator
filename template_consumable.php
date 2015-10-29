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

header("Content-Type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print $data["name"];?></title>
<?php } ?>
</head>
<body>
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="images/items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div style="color:white;font-size:16pt;"><?php print $data["name"]; ?></div>
	<?php if (!IsNullOrEmptyString($consumable_type_name)) { ?>
		<div class="entry"><span name="t-active-item">Активная вещь</span> (<?php print $consumable_type_name; ?>)</div>
	<?php } ?>
	<?php if(isset($data["lvlreq"])) { ?>
		<div class="entry"><span name="t-required-level">Необходимый уровень</span>: <?php print $data["lvlreq"];?></div>
	<?php } ?>
	<?php if (!IsNullOrEmptyString($talentreq_name)) { ?>
		<div class="entry"><span name="t-required-skill">Требуемый навык</span>: <?php print $talentreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"] ?></div>
	<?php } ?>
	<?php if (isset($data["specials"])) {
		$specials = $data["specials"];
		include "template_specials.php";
	} ?>
	<?php if (isset($data["AP_cost"])) {?>
		<div class="entry"><span name="t-required">Необходимо</span> <?php print $data["AP_cost"];?> <span name="t-AP">ОД</span></div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
</div>
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/utils.js"></script>
<?php if (!$iframe) { ?>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
</html>