<?php
include "commons.php";
$itemsData = LoadItemData($GLOBALS["version"]);

$talentString = "";
if (isset($_GET["t"])) {
	$talentString = $_GET["t"];
}
if (!isset($_GET["p"]) || ($primary = json_encode(FindItem($_GET["p"], $itemsData))) == null) {
	$primary = "{}";
}
if (!isset($_GET["s"]) || ($secondary = json_encode(FindItem($_GET["s"], $itemsData))) == null) {
	$secondary = "{}";
}
if (!isset($_GET["a"]) || ($armor = json_encode(FindItem($_GET["a"], $itemsData))) == null) {
	$armor = "{}";
}
if (!isset($_GET["h"]) || ($hat = json_encode(FindItem($_GET["h"], $itemsData))) == null) {
	$hat = "{}";
}
if (!isset($_GET["c1"]) || ($consumable1 = json_encode(FindItem($_GET["c1"], $itemsData))) == null) {
	$consumable1 = "{}";
}
if (!isset($_GET["c2"]) || ($consumable2 = json_encode(FindItem($_GET["c2"], $itemsData))) == null) {
	$consumable2 = "{}";
}
if (!isset($_GET["c3"]) || ($consumable3 = json_encode(FindItem($_GET["c3"], $itemsData))) == null) {
	$consumable3 = "{}";
}
if (!isset($_GET["c4"]) || ($consumable4 = json_encode(FindItem($_GET["c4"], $itemsData))) == null) {
	$consumable4 = "{}";
}
if (!isset($_GET["c5"]) || ($consumable5 = json_encode(FindItem($_GET["c5"], $itemsData))) == null) {
	$consumable5 = "{}";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<link href="/css/local.css" rel="stylesheet">
	<script src="/js/jquery.js" charset="utf-8"></script>
	<script src="/js/item_detail.js" charset="utf-8"></script>
	<script src="/js/calculator.js" charset="utf-8"></script>
	<script src="/js/combinator.js" charset="utf-8"></script>
	<script src="/js/utils.js" charset="utf-8"></script>
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
<button id="runAnalysis" disabled>Рассчитать</button>
<div id="report"></div>
<script src="/js/combinator-controller.js"></script>
<script src="/js/analytics.js"></script>
</body>
</html>