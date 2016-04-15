<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/3/2016
 * Time: 1:35 PM
 */


/**
 * Method connects to old DB and returns all messages
 *
 * @param $paginate
 * @param $group_num
 * @return mixed
 */

 // TODO: use server?
require_once '../../db/dbconnect.php';

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

function getResponses($m) {
    global $db_server;
    $result = $db_server->query("SELECT * FROM `response` WHERE `message_id` IN (" . $m["message_id"] . ") ORDER BY `created` DESC");
    // SELECT * FROM `response` WHERE `message_id` IN (158) ORDER BY `created` DESC
    $resp = array();

    // using assoc here because it would be easier for future modifications
    while($row = $result->fetch_assoc()){
        // reformat row
        $row["sentBy"] = $row["user_id"];
        $row["sentTo"] = $row["to"];
        $row["createdAt"] = $row["created"];
        $row["content"] = $row["descr"];
        $resp[] = $row;
    }
    $result->free();
    return ($resp);
}

function insertResponses($msg) {
    $responses = getResponses($msg);
    // insert original message
    $msg["thread"] = array(
        array(
            "sentBy" => $msg["email"],
            "sentTo" => "us",
            "createdAt" => $msg["created"],
            "content" => $msg["descr"]
        )
    );
    // add fetched responses
    $msg["thread"] = array_merge($msg["thread"], $responses);

    return ($msg);
};

function getAll($paginate, $group_num){
    // get messages
    $messages = $paginate->loadData($group_num);

    // add responses
    $messages = array_map("insertResponses", $messages);

    // return
    return json_encode(utf8ize($messages));

}
?>
