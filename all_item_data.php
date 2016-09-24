<?php
header('Content-type: application/json;charset=UTF-8');
$ITEM_DATA_DIRECTORY = "js/items";
$files = scandir("./" . $ITEM_DATA_DIRECTORY);
if (!$files) {
	print ("data was not found");
	return;
}
print("[");
$flag = false;
for ($i = 0; $i < count($files); $i++) {
	$filename = $ITEM_DATA_DIRECTORY . "/" . $files[$i];
	if (!is_dir($filename) && !preg_match('/.*\.json/', $filename)) {
		$item_data = file_get_contents($filename);
		if (!$flag) {
			$flag = true;
		} else {
			print(",");
		}
		$item_data = preg_replace('/[\r\t\n]+|( {4})+/','',$item_data);
		print($item_data);
	}
}
print("]");
?>