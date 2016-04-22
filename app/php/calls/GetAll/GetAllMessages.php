<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/1/2016
 * Time: 9:48 AM
 */

require_once '../../db/dbconnect.php';
require_once '../../paginate/Paginator.php';
require_once '../../queries/SelectQueries.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$page = $request->group_num;

static $paginate = null;

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

function getAll($paginate, $page){
    require_once "../../util/utf8ize.php";

    // get messages
    $messages = $paginate->load($page);

    // add responses
    $messages = array_map("insertResponses", $messages);

    // return
    return json_encode(utf8ize($messages));
}


if($paginate == null){
    $paginate = new Paginator($db_server, "message", 25);
}


//returning the results of the query in json format
echo getAll($paginate, $page); //this will go back under "data" of angular call.

$db_server->close();
?>
