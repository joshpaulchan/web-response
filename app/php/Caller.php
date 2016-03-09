<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/3/2016
 * Time: 1:35 PM
 */

/**
 * Method to query database
 *
 * @param $query
 * @param $db_server
 * @return string
 */
function getall($query){
    //scope issue if I place this line outside the function
    require_once 'db/dbconnect.php';

    if(!$result = $db_server->query($query)){
        //the query failed
        die('There was an error running the query [ ' . $db_server->error . ' ].');
    }

    $json_result = array();
//$return_arr = array();

//using assoc here because it would be easier for future modifications
    while($row = $result->fetch_assoc()){
        /*
        $row_array['entry#'] = $row['entry#'];
        $row_array['name'] = $row['name'];
        $row_array['email'] = $row['email'];
        $row_array['subject'] = $row['subject'];
        $row_array['comment'] = $row['comment'];
        $row_array['redirect'] = $row['redirect'];
        $row_array['browserinfo'] = $row['browserinfo'];
        $row_array['topic'] = $row['topic'];
        $row_array['date'] = $row['date'];

        array_push($return_arr,$row_array);
         */

        $json_result[] = $row;
    }

    //returning the results of the query in json format
    return json_encode($json_result); //this will go back under "data" of angular call.

    //not sure if this is unreachable code
    //leaving this here for now
    $result->free();
}

// TODO CAS authentication should probably done in this method
function login($username, $password){
    require_once 'queries/SelectQueries.php';
    require_once 'db/dbconnect.php';

    $query = $login . '\'' . $username . '\' ' . $loginp2 . '\'' . $password . '\'';

    if(!$result = $db_server->query($query)){
        //the query failed
        die('There was an error running the query [ ' . $db_server->error . ' ].');
    }

    // TODO password authentication
    if(!($password == $result[$password])){
        die('Password incorrect.');
    }

    //using assoc here because it would be easier for future modifications
    while($row = $result->fetch_assoc()){
        /*
        $row_array['entry#'] = $row['entry#'];
        $row_array['name'] = $row['name'];
        $row_array['email'] = $row['email'];
        $row_array['subject'] = $row['subject'];
        $row_array['comment'] = $row['comment'];
        $row_array['redirect'] = $row['redirect'];
        $row_array['browserinfo'] = $row['browserinfo'];
        $row_array['topic'] = $row['topic'];
        $row_array['date'] = $row['date'];

        array_push($return_arr,$row_array);
         */

        $json_result[] = $row;
    }

    //returning the results of the query in json format
    return json_encode($json_result); //this will go back under "data" of angular call.

    //not sure if this is unreachable code
    //leaving this here for now
    $result->free();
}

// TODO finish general search method for messages
// Use the old DB setup
function searchMessages($name, $email, $subject, $comment, $redirect, $browserinfo, $topic, $date){
    require_once 'queries/SelectQueries.php';
    require_once 'db/dbconnect.php';

    $query = $generalMessageSearchP1;
    $prefix = False;

    if(!empty($name)){
        $query = $query . $generalMessageSearchP2 . $name . $generalMessageSearchP0;
        $prefix = True;
    }
    if(!empty($email)){
        $query = $query . $generalMessageSearchP3;
    }
    if(!empty($subject)){
        $query = $query . $generalMessageSearchP4;
    }
    if(!empty($comment)){
        $query = $query . $generalMessageSearchP5;
    }
    if(!empty($redirect)){
        $query = $query . $generalMessageSearchP6;
    }
    if(!empty($browserinfo)){
        $query = $query . $generalMessageSearchP7;
    }
    if(!empty($topic)){
        $query = $query . $generalMessageSearchP8;
    }
    if(!empty($date)){
        $query = $query . $generalMessageSearchP9;
    }
}

function deleteMessages($message_id){
    require_once "db/dbconnectOld.php";
    require_once "queries/DeleteQueries.php";

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
