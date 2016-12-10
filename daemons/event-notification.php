<?php $GLOBALS['MAX_FILE_SIZE'] = 5000000; ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
</head>
<body>
<form enctype="multipart/form-data" action="event-notification.php" method="POST">
	<input type="hidden" name="MAX_FILE_SIZE" value="<?php echo $GLOBALS['MAX_FILE_SIZE']; ?>" />
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
			die('No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			die('Exceeded filesize limit.');
		default:
			die('Unknown errors.');
	}
	if ($_FILES['upfile']['size'] > $GLOBALS['MAX_FILE_SIZE']) {
		die('Exceeded filesize limit.');
	}
	if (!file_exists('./uploads')){
		mkdir('./uploads');
	}
	$base_filename = './uploads/log_' . date("Y-m-d") . '_' . sha1_file($_FILES['upfile']['tmp_name']);
	if (!move_uploaded_file($_FILES['upfile']['tmp_name'], $base_filename . ".raw")) {
		die('Failed to move uploaded file.');
	}
	$filecontent = mb_convert_encoding(file_get_contents($base_filename . ".raw"), "UTF-8", "UCS-2");
	unlink($base_filename . ".raw");
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
	return "[size=5][b]" . $log_entry->date . "[/b] " . $log_entry->raw_name . "[/size]\n";
}

if (isset($_FILES['upfile']['error']) &&
	!is_array($_FILES['upfile']['error'])
) {
	write_to_log($_SERVER['HTTP_USER_AGENT']);
	$filecontent = handle_upload();
	$log_entries = extract_entries_from_temp_file($filecontent);
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
