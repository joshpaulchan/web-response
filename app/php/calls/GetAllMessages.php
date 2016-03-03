<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/1/2016
 * Time: 9:48 AM
 */

require_once "../dbconnect.php";
require_once '../queries/SelectQueries.php';

/*
   * Collect all Details from Angular HTTP Request.
*/

if(!$result = $db_server->query($allMessages)){
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
echo json_encode($json_result); //this will go back under "data" of angular call.
$result->free();
?>
