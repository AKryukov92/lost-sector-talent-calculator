<?php
$ITEM_DATA_DIRECTORY = "js/items";

header('Content-type: application/json;charset=UTF-8');

if (isset($_GET["version"])) {
	$version = $_GET["version"];
	$filename = $ITEM_DATA_DIRECTORY . "/archive" . $version . ".json";
	if (file_exists($filename)) {
		print(file_get_contents($filename));
		return;
	}
}
http_response_code(404);
return;
?>