<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<head>
<body>
<div class="ui-tooltip" style="overflow:auto;">
	<img src="itemspng/item<?php print $id; ?>00.png" style="float:right;"/>
	<div style="color:#ff7700;font-size:16pt;"><?php print $data["name"]; ?></div>
	<div>Аватар</div>
	<div>Защита: 5</div>
	<?php if (isset($data["description"])) { ?>
		<div style="color:gray;"><?php print $data["description"]; ?></div>
	<?php } ?>
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
<html>