<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/9/2016
 * Time: 3:22 PM
 */

require_once '../../Caller.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$message_id = $message_id;

//returning the results of the query in json format
echo deleteMessages($message_id); //this will go back under "data" of angular call.
?>
