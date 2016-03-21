<?php
include "commons.php";
if (!isset($_GET["id"]) && IsNullOrEmptyString($id)) {
	print "item is not specified";
	return;
}
if (isset($_GET["color"])) {
	$color = $_GET["color"];
} else {
	$color = "white";
}
if (isset($_GET["quality"])) {
	$quality = $_GET["quality"];
} else {
	$quality = 0;
}
$id = $_GET["id"];
if (isset($data["imageid"])) {
	$imageId = $data["imageId"];
} else {
	$imageId = $id;
}

$filename = "js/items/archive" . $GLOBALS["version"] . ".json";
if (!file_exists($filename)) {
	print "item data is not found";
	return;
}

$filecontent = file_get_contents($filename);
$itemsData = json_decode($filecontent, true);
if (json_last_error() != 0) {
	print 'error parsing items data';
}
$data = null;
for ($i = 0; $i < count($itemsData); $i++) {
	$current = $itemsData[$i];
	if ($current["id"] == $id) {
		$data = $current;
		break;
	}
}
if ($data == null) {
	print "item data is not found";
	return;
}
$ITEM_BOX_SIZE = 64;

$imagedx = ($imageId % 20) * $ITEM_BOX_SIZE;
$imagedy = floor($imageId / 20) * $ITEM_BOX_SIZE;

if (json_last_error() != 0) {
	print 'error parsing item data';
	return;
}
if ($data["category"] == "hat") {
	include 'template_hat.php';
	return;
}
if ($data["category"] == "consumable") {
	include 'template_consumable.php';
	return;
}
if ($data["category"] == "armor") {
	include 'template_armor.php';
	return;
}
if ($data["category"] == "shield") {
	include 'template_armor.php';
	return;
}
if ($data["category"] == "head_mod") {
	include 'template_head_mod.php';
	return;
}
if ($data["category"] == "hand_mod") {
	include 'template_hand_mod.php';
	return;
}
if ($data["category"] == "chest_mod") {
	include 'template_chest_mod.php';
	return;
}
if ($data["category"] == "feet_mod") {
	include 'template_feet_mod.php';
	return;
}
include 'template_weapon.php';
?>