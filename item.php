<?php 
// Function for basic field validation (present and neither empty nor only white space
function IsNullOrEmptyString($question){
    return (!isset($question) || trim($question)==='');
}
if (!isset($_GET["id"]) && IsNullOrEmptyString($id)) {
	print "item is not specified";
	return;
}
$id = $_GET["id"];
$filename = "js/items/" . $id . ".js";
if (!file_exists($filename)) {
	print "item data is not found";
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
if (isset($_GET["iframe"])) {
	$iframe = true;
} else {
	$iframe = false;
}
$filecontent = file_get_contents($filename);
$data = json_decode($filecontent, true);
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
include 'template_weapon.php';
?>