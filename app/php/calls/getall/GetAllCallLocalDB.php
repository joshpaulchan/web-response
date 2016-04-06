<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/30/2016
 * Time: 5:39 PM
 */


/**
 * Method connects to old DB and returns all messages
 *
 * @param $query
 * @return string
 */
function getAll($query){

    //require_once  "../../db/dbconnect.php";
    require_once "../../db/dbtestlocal.php";

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
?>
