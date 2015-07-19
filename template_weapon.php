<?php
switch($color) {
	case "gray" :
		$colorname = "gray";
		$base_grade = 90;
		break;
	case "green" :
		$colorname = "#20dd20";
		$base_grade = 115;
		break;
	case "blue" :
		$colorname = "#4870fd";
		$base_grade = 125;
		break;
	default :
		$colorname = "white";
		$base_grade = 100;
		break;
}
if($data["category"] == 1 || $data["category"] == 2 || $data["category"] == 3) {
	$category = 1;
} else {
	$category = 2;
}
$talentreq_name = "";
if (isset($data["talentreq"])) {
	$talentreq = $data["talentreq"];
	$filename = "js/talents/" . $talentreq . ".js";
	if (file_exists($filename)) {
		$filecontent = file_get_contents($filename);
		$talent = json_decode($filecontent, true);
		if (json_last_error() == 0 && isset($talent["name"])) {
			$talentreq_name = $talent["name"];
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
</head>
<body>
<div class="ui-tooltip" style="overflow:auto;">
	<img src="itemspng/item<?php print $id; ?>00.png" style="float:right;"/>
	<div style="color:<?php print $colorname; ?>;font-size:16pt;"><?php print $data["name"]; ?></div>
	<?php if ($category == 1) {?>
		<div>Легкое оружие</div>
	<?php } else { ?>
		<div>Среднее оружие</div>
	<?php } ?>
	<?php if (isset($data["protection"])) {?>
		<div>Защита: <?php print $data["protection"];?></div>
	<?php } ?>
	<div>Мобильность: <?php print $data["mobility"]; ?></div>
	<?php if (isset($data["clip"])) {?>
		<div>Размер магазина: <?php print $data["clip"]; ?></div>
	<?php } ?>
	<?php if (isset($data["ammo"])) {?>
		<div>Кол-во боеприпасов: <?php print $data["ammo"]; ?></div>
	<?php } ?>
	<?php if (isset($data["reload_cost"])) {?>
	<div>ОД для перезарядки: <?php print $data["reload_cost"];?></div>
	<?php } ?>
	<?php if (isset($data["lvlreq"])) {?>
		<div>Необходимый уровень: <?php if ($color == "gray") {
			print $data["lvlreq"] - 1;
		} else {
			print $data["lvlreq"];
		}?></div>
	<?php } ?>
	<?php if (isset($data["talentreq"])) {?>
		<div>Требуемый навык: <?php print $talentreq_name; ?></div>
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