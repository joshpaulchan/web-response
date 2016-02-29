<?php
/**
 * Created by PhpStorm.
 * User: Jaya Kasa
 * Date: 2/29/2016
 * Time: 5:12 PM
 */

require_once 'queries/SelectQueries.php';
require_once 'dbconnect.php';

/*
   * Collect all Details from Angular HTTP Request.
   */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// TODO: check with Josh if there is a way to access php variable from services.js
@$type = $request->query;


if(!$result = $db_server->query($query)){
    //the query failed
    die('There was an error running the query [ ' . $db_server->error . ' ].');
}

echo $result; //this will go back under "data" of angular call.
$result->free();
?>