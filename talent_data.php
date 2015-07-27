<?php
$TALENTS_DATA_DIRECTORY = "js/talents";
function print_class_data($class_short_name, $directory){
	$filename = $directory ."/" . $class_short_name . "_header.js";
	if (file_exists($filename)) {
		$class_header = file_get_contents($filename);
		$class_header = preg_replace('/[\r\t\n]+|( {4})+/','',$class_header);
		print($class_header);
	}
	print(",talents:[");
	$files = scandir("./" . $directory . "/" . $class_short_name);
	if (!$files) {
		print ("data was not found");
		return;
	}
	$flag = false;
	for ($i = 0; $i < count($files); $i++) {
		$filename = $directory . "/" . $class_short_name . "/" . $files[$i];
		if (!is_dir($filename)) {
			$talent_data = file_get_contents($filename);
			if (!$flag) {
				$flag = true;
			} else {
				print(",");
			}
			//$talent_data = preg_replace('/[\r\t\n]+|( {4})+/','',$talent_data);
			print($talent_data);
		}
	}
	print("]");
}

header('Content-type: text/javascript');

$files = scandir("./" . $TALENTS_DATA_DIRECTORY);
if (!$files) {
	print ("data was not found");
	return;
}
print("var patchdata={");
print("\"gameversion\":98,");
print("\"dataversion\":1,");
print("\"assault_data\":{\n");
print_class_data("as", $TALENTS_DATA_DIRECTORY);
print("},");
print("\"juggernaut_data\":{\n");
print_class_data("ju", $TALENTS_DATA_DIRECTORY);
print("},");
print("\"support_data\":{");
print_class_data("su", $TALENTS_DATA_DIRECTORY);
print("},");
print("\"scout_data\":{");
print_class_data("sc", $TALENTS_DATA_DIRECTORY);
print("}");
print("}");
?>