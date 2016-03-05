<?php
$TALENTS_DATA_DIRECTORY = "js/talents";

header('Content-type: application/json;charset=UTF-8');

if (isset($_GET["version"])) {
	$version = $_GET["version"];
	$filename = $TALENTS_DATA_DIRECTORY . "/archive" . $version . ".js";
	if (file_exists($filename)) {
		print(file_get_contents($filename));
		return;
	}
}

$files = scandir("./" . $TALENTS_DATA_DIRECTORY);
if (!$files) {
	print ("data was not found");
	return;
}
?>