<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/30/2016
 * Time: 5:07 PM
 */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$message_id = $request->message_id;

//returning the results of the query in json format
echo deleteMessages($message_id); //this will go back under "data" of angular call.

/**
 * Method for deleting messages on old DB
 *
 * @param $message_id
 * @return string
 */
function deleteMessages($message_id){
    require_once "../../db/dbconnectOld.php";
    require_once "../../queries/DeleteQueries.php";

    $query = $deleteMessageByID . '\'' . $message_id . '\'';

    if($db_server->query($query) === TRUE) {
        //the query failed
        return "Message Deleted";
    }
    else{
        die('There was an error running the query [ ' . $db_server->error . ' ].');
    }
}
?>
