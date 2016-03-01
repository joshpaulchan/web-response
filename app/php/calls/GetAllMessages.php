<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/1/2016
 * Time: 9:48 AM
 */

require_once 'dbconnect.php';
require_once 'queries/SelectQueries.php';

/*
   * Collect all Details from Angular HTTP Request.
*/

if(!$result = $db_server->query($allMessages)){
    //the query failed
    die('There was an error running the query [ ' . $db_server->error . ' ].');
}

echo $result; //this will go back under "data" of angular call.
$result->free();
?>
