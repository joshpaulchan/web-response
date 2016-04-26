<?php
/**
 * Created by Atom
 * User: Joshua Chan
 */

/*
   * Collect all Details from Angular HTTP Request.
*/

require_once '../db/dbconnect.php';

// $postdata = file_get_contents("php://input");
// $request = json_decode($postdata);
// @$m_id = $request->messageId;

$m_id = $_GET["messageId"];

function getResponses($m) {
    global $db_server;
    $result = $db_server->query("SELECT * FROM `response` WHERE `message_id` IN (" . $m["message_id"] . ") ORDER BY `created` DESC");
    // SELECT * FROM `response` WHERE `message_id` IN (158) ORDER BY `created` DESC
    $resp = array();

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

function getMessage($id){
    require_once "../util/utf8ize.php";
    global $db_server;

    // get message
    $result = $db_server->query("SELECT * FROM `message` WHERE `message_id` = " . $id );
    $message = $result->fetch_assoc();
    // TODO: count bc if null return error
    // http_response_code(404);
    // die("Message Id not found");

    // add responses
    $message = insertResponses($message);
    $result->free();

    // return
    return json_encode(utf8ize($message));
}

echo getMessage($m_id); //this will go back under "data" of angular call.

$db_server->close();
?>
