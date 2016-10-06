<?php
function write_to_log($msg, $file){
	echo $msg."<br/>";
	fwrite($file, date("Y-m-d H:i:s") . " " . $msg. "\n");
}
function httpGet($url, $file){
	write_to_log("fetching " . $url, $file);
    $ch = curl_init();
	$options = array(
		'Header: text/html;charset=UTF-8\r\n',
		'Method: GET',
		'Cookie: member_id=12695; pass_hash=60349f45e4f5df4e1c33584db2a178d7; member_id=12695; pass_hash=60349f45e4f5df4e1c33584db2a178d7; ipsconnect_85082fd86c0e8cb0f60397a0ed4c9070=1; modtids=%2C; rteStatus=rte;'
	);
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $options);
 
    $raw=curl_exec($ch);
    curl_close($ch);
	return $raw;
}
function hide($url, $file){
	$topicId = extract_topic_id($url);
	write_to_log("hiding $url with id $topicId", $file);
	$ch = curl_init();
	$options = http_build_query(array(
		'auth_key' => '1822d828a51d395fad406dca148825a6',
		'do' => 'topicchoice',
		'selectedtids[$topicId]' => $topicId,
		'tact'=>'sdelete',
		'f'=>'14',
		'st'=>'0',
		'deleteReason'=>'This topic was hidden by daemon'
	));
	curl_setopt($ch, CURLOPT_URL,"http://forum.lsonline.ru/index.php?app=forums&module=moderate&section=moderate");
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,$options);
	$options = array(
		'Header: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\r\n',
		'Method: POST',
		'Cookie: member_id=12695; pass_hash=60349f45e4f5df4e1c33584db2a178d7; member_id=12695; pass_hash=60349f45e4f5df4e1c33584db2a178d7; ipsconnect_85082fd86c0e8cb0f60397a0ed4c9070=1; modtids=%2C; rteStatus=rte;'
	);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $options);

	// receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec ($ch);
	curl_close ($ch);
}
function process_new_topics($raw, $file){
	write_to_log("begin processing new topics ".strlen($raw), $file);
	$pattern = "/<tr[^>]*class=[^>]*unread[^>]*>.*?<h4><a href='(.*?)'[^>]*>.*?<\/tr>/s";
	if(preg_match_all($pattern, $raw, $matches)){
		write_to_log("found " . count($matches[1])." new topics", $file);
		for($i=0;$i<count($matches[1]);$i++){
			$rawTopic = httpGet($matches[1][$i], $file);
			$topic = extract_topic_content($rawTopic, $file);
			if(contain_unfriendly_url($topic, $file)){
				write_to_log($matches[1][$i]." is ok", $file);
			} else {
				write_to_log($matches[1][$i]." is bad", $file);
				hide($matches[1][$i]);
			}
		}
	}
}
function extract_new_authors($raw, $file){
	$pattern = "/<tr[^>]*class=[^>]*unread[^>]*>.*?Тему начал: <a[^>]*href='(.*?)'[^>]*>.*?<\/tr>/s";
	if(preg_match_all($pattern, $raw, $matches)){
		for($i=0;$i<count($matches[1]);$i++){
			echo $matches[1][$i];
			echo "</br>";
		}
	}
}
function extract_topic_id($raw, $file){
	$pattern = "/index.php\?\/topic\/(\d*)/s";
	if(preg_match($pattern, $raw, $matches)){
		return $matches[1];
	}
}
function extract_topic_content($raw, $file){
	write_to_log("begin processing ".strlen($raw), $file);
	$pattern = "/<div[^>]*class='post entry-content[^>]*>(.*?)<\/div>/s";
	if(preg_match($pattern, $raw, $matches)){
		write_to_log("topic content length " .strlen($matches[1]), $file);
		return $matches[1];
	}
}
function contain_unfriendly_url($content, $file){
	write_to_log("check topic for illegal url " .strlen($content), $file);
	$pattern = "/<a[^>]*?href=[\"\'][http|https]+:([^>]*?)[\?\"\'][^>]*?>.*?<\/a>/s";
	$friends = array(
		"//forum.lsonline.ru/index.php",
		"//lstc.wc.lt",
		"//lstc.wc.lt/",
		"//radikale.ru/",
		"//lstc.wc.lt/item.php"
	);
	if(preg_match_all($pattern, $content, $matches)){
		write_to_log("found " . count($matches[1]) . " urls", $file);
		var_dump($matches[1]);
		for($j = 0; $j < count($matches[1]);$j++){
			//write_to_log($matches[1][$j], $file);
			$found = false;
			for ($i = 0; $i < count($friends); $i++){
				if ($friends[$i]==$matches[1][$j]){
					$found = true;
				}
			}
			if(!$found){
				return false;
			}
		}
		return true;
	} else {
		write_to_log("found no urls", $file);
		return true;
	}
}
$file = fopen("antispam.log","a");
$raw = httpGet("http://forum.lsonline.ru/index.php?app=core&module=search&do=viewNewContent&search_app=forums", $file);
process_new_topics($raw, $file);
fclose($file);
//hide('http://forum.lsonline.ru/index.php?/topic/10681-%D1%82%D0%BE%D0%B6%D0%B5-%D0%BD%D0%B5-%D1%82%D1%80%D0%BE%D0%B3%D0%B0%D1%82%D1%8Ccxudo/');
?>