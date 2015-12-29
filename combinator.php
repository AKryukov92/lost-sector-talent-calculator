<?php
function IsNullOrEmptyString($question) {
	return (!isset($question) || trim($question)==='');
}
function GetItemData($id) {
	$filename = "js/items/" . $id . ".js";
	if (file_exists($filename)) {
		return file_get_contents($filename);
	}
	return "{}";
}
$talentString = "";
$primary = "{}";
$secondary = "{}";
$armor = "{}";
$hat = "{}";
$consumable1 = "{}";
$consumable2 = "{}";
$consumable3 = "{}";
$consumable4 = "{}";
$consumable5 = "{}";
if (isset($_GET["t"])) {
	$talentString = $_GET["t"];
}
if (isset($_GET["p"])) {
	$primary = GetItemData($_GET["p"]);
}
if (isset($_GET["s"])) {
	$secondary = GetItemData($_GET["s"]);
}
if (isset($_GET["a"])) {
	$armor = GetItemData($_GET["a"]);
}
if (isset($_GET["h"])) {
	$hat = GetItemData($_GET["h"]);
}
if (isset($_GET["c1"])) {
	$consumable1 = GetItemData($_GET["c1"]);
}
if (isset($_GET["c2"])) {
	$consumable2 = GetItemData($_GET["c2"]);
}
if (isset($_GET["c3"])) {
	$consumable3 = GetItemData($_GET["c3"]);
}
if (isset($_GET["c4"])) {
	$consumable4 = GetItemData($_GET["c4"]);
}
if (isset($_GET["c5"])) {
	$consumable5 = GetItemData($_GET["c5"]);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<link href="css/local.css" rel="stylesheet">
	<script src="js/jquery.js" charset="utf-8"></script>
	<script src="js/item_detail.js" charset="utf-8"></script>
	<script src="js/calculator.js" charset="utf-8"></script>
	<script src="js/combinator.js" charset="utf-8"></script>
	<script src="js/utils.js" charset="utf-8"></script>
	<script>
		var talentString = "<?php print $talentString; ?>";
		var primary = <?php print $primary; ?>;
		var secondary = <?php print $secondary; ?>;
		var consumable1 = <?php print $consumable1; ?>;
		var consumable2 = <?php print $consumable2; ?>;
		var consumable3 = <?php print $consumable3; ?>;
		var consumable4 = <?php print $consumable4; ?>;
		var consumable5 = <?php print $consumable5; ?>;
		var temp = 0;
	</script>
</head>
<body style="margin:0px;">
<div id="availableActions" style="overflow:auto;"></div>
<input type="button" id="runAnalysis" value="Рассчитать"/>
<div id="report"></div>
<script src="js/combinator-controller.js"></script>
<script src="js/analytics.js"></script>
</body>
</html>