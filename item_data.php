<?php
header('Content-type: text/javascript');
$WEAPONTYPE_DATA_FILENAME = "js/weapontype_data.js";
$ITEM_DATA_DIRECTORY = "js/items";
if (!file_exists($WEAPONTYPE_DATA_FILENAME)) {
	return;
}
$weapontype_data = file_get_contents($WEAPONTYPE_DATA_FILENAME);
$weapontype_data = preg_replace('/[\r\t\n]+|( {4})+/','',$weapontype_data);
print($weapontype_data);

$files = scandir("./" . $ITEM_DATA_DIRECTORY);
if (!$files) {
	print ("data was not found");
	return;
}
print("\npatchdata.item_data=[");
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