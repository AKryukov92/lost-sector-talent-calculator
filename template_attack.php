<?php
$typename = "";
if (isset($attack["type"])) {
	switch($attack["type"]) {
		case 1:
			$typename = "от удара";
			break;
		case 2:
			$typename = "мягкими пулями";
			break;
		case 3:
			$typename = "пулями";
			break;
		case 4:
			$typename = "дробью";
			break;
		case 5:
			$typename = "крупным калибром";
			break;
		case 6:
			$typename = "взрывом";
			break;
		case 8:
			$typename = "кислотой";
			break;
		case 9:
			$typename = "огнем";
			break;
		default:
			$typename = $attack["type"];
			break;
	}
}
if (isset($attack["min_damage"]) && isset($attack["max_damage"])) {
	$real_grade = $base_grade + $quality * 1.5;
	$min_damage = $attack["min_damage"];
	$max_damage = $attack["max_damage"];
	$real_min_damage = round($min_damage + ($min_damage / 100 * ($real_grade - 100) * 0.75));
	$real_max_damage = round($max_damage + ($max_damage / 100 * ($real_grade - 100) * 0.75));
}
?>
<div class="attack">
<h3><?php print $attack["name"]; ?></h3>
<?php if (!IsNullOrEmptyString($typename)) { ?>
	<div class="entry">Урон <?php print $typename; ?></div>
<?php } ?>
<?php if (isset($attack["radius"])) { ?>
	<div class="entry">Радиус: <?php print $attack["radius"]; ?></div>
<?php } ?>
<?php if (isset($attack["accuracy"])) { ?>
	<div class="entry">Точность: <?php print $attack["accuracy"]; ?></div>
<?php } ?>
<?php if (isset($attack["bullets"])) { ?>
	<div class="entry">Патронов на атаку: <?php print $attack["bullets"]; ?></div>
<?php } ?>
<?php if (isset($attack["cost"])) { ?>
	<div class="entry">ОД на выстрел: <?php print $attack["cost"]; ?></div>
<?php } ?>
<?php if (isset($attack["min_dist"]) && isset($attack["max_dist"])) { ?>
	<div class="entry">Оптимальная дистанция: <?php print $attack["min_dist"]. "-". $attack["max_dist"]; ?> м</div>
<?php } ?>
<?php if (isset($attack["min_damage"]) && isset($attack["max_damage"])) {?>
	<div class="entry">Разброс урона: <?php print $real_min_damage . " - " . $real_max_damage; ?></div>
<?php } ?>
<?php if (isset($data["specials"])) {
	$specials = $data["specials"];
	include "template_specials.php";
} ?>
</div>