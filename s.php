<?php
function hexColorAllocate($im,$hex){
    $hex = ltrim($hex,'#');
    $r = hexdec(substr($hex,0,2));
    $g = hexdec(substr($hex,2,2));
    $b = hexdec(substr($hex,4,2));
    return imagecolorallocate($im, $r, $g, $b); 
}
$url = "http://localhost/?v=102&c=as&t=cp6og7oe";
//Handle get parameters
if (isset($_GET["v"])) {
	$version = $_GET["v"];
} else {
	$version = 102;
}
if (isset($_GET["c"])) {
	$prefix = $_GET["c"];
} else {
	$prefix = "as";
}
if (isset($_GET["t"])) {
	$talentstring = $_GET["t"];
} else {
	$talentstring = "";
}
//Load class data
$filename = "js/talents/archive" . $version . ".js";
if (!file_exists($filename)) {
	print "talent data is not found";
	return;
}
$filecontent = file_get_contents($filename);
$talentData = json_decode($filecontent, true);
if (json_last_error() != 0) {
	print 'error parsing talent ' . $id . ' data';
}
$classData = $talentData[$prefix]["talents"];

// Parse talent string
$powersum = 0;
$power = 1;
$i = 0;
while($i < strlen($talentstring) ) {
	$chr = $talentstring[$i];
	list(, $ord) = unpack('N', mb_convert_encoding($chr, 'UCS-4BE', 'UTF-8'));
	if ($ord >= 97 && $ord <= 122) {
		$powersum += ($ord - 87) * $power;
	} else if ($ord >= 48 && $ord <= 57) {
		$powersum += ($ord - 48) * $power;
	} else {
		return "unexpected character: " + $chr;
	}
	$power *= 33;
	$i++;
}
// Find ids of learned talents which block learning of other talents
$talentIds = [];
$power = 1;
for ($i = 0; $i < count($classData); $i++) {
	$classData[$i]["power"] = $power;
	$power *= 2;
}
$lastIdIndex = 0;
function findTalentById($data, $id) {
	for ($i = 0; $i < count($data); $i++) {
		if ($data[$i]["id"] == $id) {
			return $data[$i];
		}
	}
	return null;
}
for ($i = count($classData) - 1; $i >= 0; $i--) {
	$talent = $classData[$i];
	if ($talent["power"] <= $powersum) {
		$powersum -= $talent["power"];
		if (isset($talent["talentreq"])) {
			$parent = findTalentById($classData, $talent["talentreq"]);
			if ($parent != null) {
				$count = 0;
				for ($j = 0; $j < count($classData); $j++) {
					if (isset($classData[$j]["talentreq"])
						&& $classData[$j]["talentreq"] == $talent["talentreq"]) {
						$count++;
					}
				}
				if ($count > 1) {
					// echo "<br/>", $talent["name"]["ru"];
					// var_dump($talent);
					$talentIds[$lastIdIndex] = $talent["id"];
					$lastIdIndex++;
				}
			}
		}
	}
}
$talentAtlas = imagecreatefrompng("images/Skills" . $version . ".png");
header('Content-type: image/png');
$spacing = 5;
$imageSize = 48;
$resultWidth = 4 * ($imageSize + $spacing) + $spacing;
$resultHeight = $spacing + $imageSize + $spacing;
$result = imagecreatetruecolor($resultWidth, $resultHeight);
for ($i = 0; $i < count($talentIds); $i++) {
	$dst_x = $i * ($imageSize + $spacing) + $spacing;
	$dst_y = $spacing;
	$src_x = ($talentIds[$i] % 20) * $imageSize;
	$src_y = floor($talentIds[$i] / 20) * $imageSize;
	imagecopy($result, $talentAtlas, $dst_x, $dst_y, $src_x, $src_y, $imageSize, $imageSize);
}
imagepng($result);
imagedestroy($result);
imagedestroy($talentAtlas);
// $my_img = imagecreate(200, 200);
// $black_color = hexColorAllocate($my_img, '000000');
// $gray_color = hexColorAllocate($my_img, '939182');
// $dark_gold_color = hexColorAllocate($my_img, 'c77405');
// $gold_color = hexColorAllocate($my_img, 'e7a516');
// imagestring($my_img, 4, 30, 25, "thesitewizard.com", $gray_color);
// imagesetthickness($my_img, 5);
// imageline($my_img, 30, 45, 165, 45, $gold_color);

// header('Content-type: image/png');
// imagepng($my_img);
// imagecolordeallocate($gold_color);
// imagecolordeallocate($gray_color);
// imagecolordeallocate($black_color);
// imagecolordeallocate($dark_gold_color);
// imagedestroy($my_img);
?>