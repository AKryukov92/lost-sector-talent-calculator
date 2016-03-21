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

$files = scandir("./" . $ITEM_DATA_DIRECTORY);
if (!$files) {
	print ('{"error":"data was not found"}');
	return;
}
print("[");
$flag = false;
for ($i = 0; $i < count($files); $i++) {
	$filename = $ITEM_DATA_DIRECTORY . "/" . $files[$i];
	if (!is_dir($filename)) {
		$item_data = file_get_contents($filename);
		if (!$flag) {
			$flag = true;
		} else {
			print(",");
		}
		//$item_data = preg_replace('/[\r\t\n]+|( {4})+/','',$item_data);
		print($item_data);
	}
}
print("]");
?>