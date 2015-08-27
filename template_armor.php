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
if (isset($data["imageid"])) {
	$imageid = $data["imageid"];
} else {
	$imageid = $id;
}
if (isset($data["protection"])) {
	$real_grade = $base_grade + $quality * 1.5;
	$protection = $data["protection"];
	$real_protection = round($protection + ($protection / 100 * ($real_grade - 100) * 1.5));
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
		<img src="itemspng/item<?php print $imageid; ?>00.png" style="float:right;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));"/>
	<?php } ?>
	<div style="color:<?php print $colorname; ?>;font-size:16pt;">
		<?php print $data["name"]; 
			if ($quality != 0)
			{ print " +".$quality; } ?>
	</div>
	<div class="entry">Броня</div>
	<?php if (isset($data["protection"])) {?>
		<div class="entry">Защита: <?php print $real_protection;?></div>
	<?php } ?>
	<?php if (isset($data["mobility"])) {?>
		<div class="entry">Мобильность: <?php print $data["mobility"]; ?></div>
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
	<?php if (isset($data["description"])) {?>
		<div class="entry"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
</body>
</html>