<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<img src="itemspng/item<?php print $id; ?>00.png" style="float:right;"/>
	<?php } ?>
	<div style="color:#ff7700;font-size:16pt;"><?php print $data["name"]; ?></div>
	<div class="entry">Аватар</div>
	<div class="entry">Защита: 5</div>
	<?php if (isset($data["description"])) { ?>
		<div style="color:gray;"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
</body>
<html>