<?php

header("Content-Type: text/html; charset=utf-8");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<link href="css/local.css" rel="stylesheet">
<?php if (isset($data["name"])) { ?>
	<title><?php print $data["name"];?></title>
<?php } ?>
<head>
<body style="margin:0px;">
<div class="tooltip-content" style="overflow:auto;">
	<?php if (!$iframe) {?>
		<div class="tooltip-image-container" style="width:<?php print $ITEM_BOX_SIZE; ?>px;height:<?php print $ITEM_BOX_SIZE; ?>px;background:radial-gradient(50% 50%, #939182, rgba(255,0,0,0));">
			<img src="items.png" style="margin-left:-<?php print $imagedx; ?>px; margin-top:-<?php print $imagedy; ?>px;"/>
		</div>
	<?php } ?>
	<div style="color:#ff7700;font-size:16pt;"><?php print $data["name"]; ?></div>
	<div class="entry">Аватар</div>
	<div class="entry">Защита: 5</div>
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
	<?php if (isset($data["description"])) { ?>
		<div style="color:gray;"><?php print $data["description"]; ?></div>
	<?php } ?>
</div>
<?php if (!$iframe) { ?>
<script src="js/analytics.js"></script>
<?php } ?>
</body>
<html>