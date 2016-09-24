<?php
include "commons.php";
$TALENTS_DATA_DIRECTORY = "js/talents";

header('Content-type: application/json;charset=UTF-8');

$version = talentsVersionFallback($GLOBALS["version"]);
$filename = $TALENTS_DATA_DIRECTORY . "/archive" . $version . ".json";
if (!file_exists($filename)) {
	print ('{"error":"data was not found"}');
	return;
}
print(file_get_contents($filename));
?>