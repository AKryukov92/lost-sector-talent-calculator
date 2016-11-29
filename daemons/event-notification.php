<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
</head>
<body>
<form enctype="multipart/form-data" action="event-notification.php" method="POST">
	<input type="hidden" name="MAX_FILE_SIZE" value="300000" />
	<input type="file" name="upfile"/>
	<input type="submit"/>
</form>
<?php
$GLOBALS['out'] = fopen("event-notification " . date("Y-m-d"). ".log","a");
function write_to_log($msg){
	echo $msg."<br/>";
	fwrite($GLOBALS['out'], date("Y-m-d H:i:s") . " " . $msg. "\n");
}
function handle_upload(){
	switch ($_FILES['upfile']['error']) {
		case UPLOAD_ERR_OK:
			break;
		case UPLOAD_ERR_NO_FILE:
			throw new RuntimeException('No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			throw new RuntimeException('Exceeded filesize limit.');
		default:
			throw new RuntimeException('Unknown errors.');
	}
	if ($_FILES['upfile']['size'] > 300000) {
		throw new RuntimeException('Exceeded filesize limit.');
	}
	if (!file_exists('./uploads')){
		mkdir('./uploads');
	}
	$base_filename = './uploads/log_' . date("Y-m-d") . '_' . sha1_file($_FILES['upfile']['tmp_name']);
	if (!move_uploaded_file($_FILES['upfile']['tmp_name'], $base_filename . ".raw")) {
		throw new RuntimeException('Failed to move uploaded file.');
	}
	$filecontent = mb_convert_encoding(file_get_contents($base_filename . ".raw"), "UTF-8", "UCS-2");
	file_put_contents($base_filename . ".txt", $filecontent);
	unlink($base_filename . ".raw");
	write_to_log("File saved as " . $base_filename . ".txt");
	return $filecontent;
}
class LogEntry {
	public $id = "";
	public $date = "";
	public $raw_name = "";
	function __construct($in_id, $in_name, $in_date) {
		$this->id = $in_id;
		$temp = DateTime::createFromFormat('Y-n-d H:i',$in_date);
		$temp->add(new DateInterval('PT3H'));
		$this->date = $temp->format('d.m.Y H:i');
		$this->raw_name = $in_name;
	}
}
function extract_entries_from_temp_file($filecontent){
	$pattern = "/\[.*] CUSTOM MESSAGE: Added EVENT id=(\d*) ([^,]*), [^\[]*(\d{4}-\d{1,2}-\d{1,2} \d{2}:\d{2})/";
	$n = preg_match_all($pattern,$filecontent,$out);
	$ret = array();
	for ($i = 0; $i < $n; $i++){
		$entry = new LogEntry($out[1][$i], $out[2][$i], $out[3][$i]);
		$ret[$entry->date] = $entry;
	}
	return $ret;
}
function load_event_data(){
	$filename = "event-data.json";
	if(!file_exists($filename)){
		write_to_log("event data is not found");
		die;
	}
	$filecontent = file_get_contents($filename);
	$event_data = json_decode($filecontent, true);
	if (json_last_error() != 0) {
		write_to_log('error parsing event data');
		die;
	}
	return $event_data;
}
function makeResultEntry($log_entry, $event){
	return "[size=5][b]" . $log_entry->date . "[/b] [url=http://ru.lost-sector.wikia.com/wiki/" . $event["url"] . "]" . $event["name"] . "[/url][/size]\n";
}
function makeResultEntryNoEvent($log_entry){
	return "[size=5][b]" . $log_entry->date . "[/b]" . $log_entry->raw_name . "[/size]\n";
}

/*
function httpGet($url){
	write_to_log("fetching " . $url);
    $ch = curl_init();
	$options = array(
		'Header: text/html;charset=UTF-8\r\n',
		'Method: GET',
		'Cookie: mqtids=%2C; member_id=12695; member_id=12695; pass_hash=5b2be60c9ef5c9794189cf5eccf773da; ipsconnect_85082fd86c0e8cb0f60397a0ed4c9070=1; coppa=0; rteStatus=rte; modtids=%2C;'
	);
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $options);
 
    $raw=curl_exec($ch);
    curl_close($ch);
	return $raw;
}
function hide($url){
	$topicId = extract_topic_id($url);
	write_to_log("hiding $url with id $topicId");
	$ch = curl_init();
	$options = http_build_query(array(
		'auth_key' => '16d9f2fb777d275f2d769371e2e195c4',
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
		'Header: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*;q=0.8\r\n',
		'Method: POST',
		'Cookie: mqtids=%2C; member_id=12695; member_id=12695; pass_hash=5b2be60c9ef5c9794189cf5eccf773da; ipsconnect_85082fd86c0e8cb0f60397a0ed4c9070=1; coppa=0; rteStatus=rte; modtids=%2C;'
	);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $options);

	// receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec ($ch);
	curl_close ($ch);
}
function process_new_topics($raw){
	write_to_log("begin processing new topics ".strlen($raw));
	$pattern = "/<tr[^>]*class=[^>]*unread[^>]*>.*?<h4><a href='(.*?)'[^>]*>.*?<\/tr>/s";
	if(preg_match_all($pattern, $raw, $matches)){
		write_to_log("found " . count($matches[1])." new topics");
		for($i=0;$i<count($matches[1]);$i++){
			$rawTopic = httpGet($matches[1][$i]);
			$topic = extract_topic_content($rawTopic);
			if(contain_unfriendly_url($topic)){
				write_to_log($matches[1][$i]." is ok");
			} else {
				write_to_log($matches[1][$i]." is bad");
				hide($matches[1][$i]);
			}
		}
	} else {
		write_to_log("found no new topics");
	}
}
function extract_new_authors($raw){
	$pattern = "/<tr[^>]*class=[^>]*unread[^>]*>.*?Тему начал: <a[^>]*href='(.*?)'[^>]*>.*?<\/tr>/s";
	if(preg_match_all($pattern, $raw, $matches)){
		for($i=0;$i<count($matches[1]);$i++){
			echo $matches[1][$i];
			echo "</br>";
		}
	}
}
function extract_topic_id($raw){
	$pattern = "/index.php\?\/topic\/(\d*)/s";
	if(preg_match($pattern, $raw, $matches)){
		return $matches[1];
	}
}
function extract_topic_content($raw){
	write_to_log("begin processing ".strlen($raw));
	$pattern = "/<div[^>]*class='post entry-content[^>]*>(.*?)<\/div>/s";
	if(preg_match($pattern, $raw, $matches)){
		return $matches[1];
	}
}
function contain_unfriendly_url($content){
	write_to_log("check topic for illegal url " .strlen($content));
	$pattern = "/<a[^>]*?href=[\"\'][http|https]+:\/\/([^>]*?)(\/[^>]*?)*[\?\"\'][^>]*?>.*?<\/a>/s";
	$friends = array(
		"forum.lsonline.ru",
		"lstc.wc.lt",
		"billing.lost-sector.com",
		"radikale.ru",
		"fastpic.ru",
		"lsonline.ru",
		"steamcommunity.com",
		"en.idcgames.com",
		"www.youtube.com",
		"youtu.be",
		"ybex.com"
	);
	if(preg_match_all($pattern, $content, $matches)){
		write_to_log("found " . count($matches[1]) . " urls");
		var_dump($matches[1]);
		for($j = 0; $j < count($matches[1]);$j++){
			//write_to_log($matches[1][$j]);
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
		write_to_log("found no urls");
		return true;
	}
}

$url = "http://forum.lsonline.ru/index.php?/topic/11027-%D0%BF%D0%B8%D1%81%D1%82%D0%BE%D0%BB%D0%B5%D1%82-steyr-l-a1/";
$raw = httpGet($url);
$topic = extract_topic_content($raw);
if(contain_unfriendly_url($topic)){
  write_to_log("$url is ok");
} else {
  write_to_log("$url is bad");
  hide($url);
}*/

if (isset($_FILES['upfile']['error']) &&
	!is_array($_FILES['upfile']['error'])
) {
	write_to_log($_SERVER['HTTP_USER_AGENT']);
	$new_filename = handle_upload();
	$log_entries = extract_entries_from_temp_file($new_filename);
	$event_data = load_event_data();
	$result = "";
	foreach ($log_entries as $entry){
		$found = false;
		for ($j = 0; $j < count($event_data); $j++){
			if ($entry->id == $event_data[$j]["id"]){
				$result .= makeResultEntry($entry,$event_data[$j]);
				$found = true;
				break;
			}
		}
		if (!$found){
			$result .= makeResultEntryNoEvent($entry);
		}
	}?>
	<div>
	<textarea id="message" rows='10' cols='100'><?php echo $result ;?></textarea>
	<button id="btn" data-clipboard-target="#message">
		<img src="../images/clippy.svg" width="200" height="200" alt="Copy to clipboard">
	</button>
	</div>
	<script src="../js/clipboard.js"></script>
	<script>new Clipboard("#btn") </script>
<?php } ?>
</body>
</html>
