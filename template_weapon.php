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
if($data["category"] == "pistol" || $data["category"] == "melee" || $data["category"] == "smg") {
	$category = "light";
} else {
	$category = "middle";
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
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print $data["name"];?></title>
<?php } ?>
</head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<img src="itemspng/item<?php print $id; ?>00.png" style="float:right;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));"/>
	<?php } ?>
	<div style="color:<?php print $colorname; ?>;font-size:16pt;">
		<?php print $data["name"]; 
			if ($quality != 0)
			{ print " +".$quality; } ?>
	</div>
	<?php if ($category == "light") {?>
		<div class="entry">Легкое оружие</div>
	<?php } else { ?>
		<div class="entry">Среднее оружие</div>
	<?php } ?>
	<?php if (isset($data["protection"])) {?>
		<div class="entry">Защита: <?php print $data["protection"];?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry">Мобильность: <?php print $data["mobility"]; ?></div>
	<?php } ?>
	<?php if (isset($data["clip"])) {?>
		<div class="entry">Размер магазина: <?php print $data["clip"]; ?></div>
	<?php } ?>
	<?php if (isset($data["ammo"])) {?>
		<div class="entry">Кол-во боеприпасов: <?php print $data["ammo"]; ?></div>
	<?php } ?>
	<?php if (isset($data["reload_cost"])) {?>
	<div class="entry">ОД для перезарядки: <?php print $data["reload_cost"];?></div>
	<?php } ?>
	<?php if (isset($data["lvlreq"])) {?>
		<div class="entry">Необходимый уровень: <?php if ($color == "gray") {
			print $data["lvlreq"] - 1;
		} else {
			print $data["lvlreq"];
		}?></div>
	<?php } ?>
	<?php if (isset($data["classreq"])) { ?>
		<div class="entry">Требуемый класс:
			<?php for ($i = 0; $i < count($data["classreq"]); $i++) { 
				if ($i > 0) {
					print ",";
				}
				if ($data["classreq"][$i] == "as") {
					print "Штурмовик";
					break;
				}
				if ($data["classreq"][$i] == "sc"){
					print "Скаут";
					break;
				}
				if ($data["classreq"][$i] == "ju") {
					print "Джаггернаут";
					break;
				}
				if ($data["classreq"][$i] == "su"){
					print "Поддержка";
					break;
				}
			} ?>
		</div>
	<?php } ?>
	<?php if (isset($data["talentreq"])) {?>
		<div class="entry">Требуемый навык: <?php print $talentreq_name; ?></div>
	<?php } ?>
	<?php if (isset($data["attacks"])) {
		for($i = 0; $i < count($data["attacks"]); $i++) {
			$attack = $data["attacks"][$i];
			include 'template_attack.php';
		}
	} ?>
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
</body>
</html>