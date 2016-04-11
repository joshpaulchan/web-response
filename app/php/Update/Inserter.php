<?php
/**
 * Created by PhpStorm.
 * User: Jaya Kasa
 * Date: 2/29/2016
 * Time: 5:03 PM
 */

//require_once 'queries/InsertQueries.php';
require_once '../db/dbconnect.php';

function inserter($query){
    if ($db_server->query($query) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $query . "<br>" . $db_server->error;
    }

    $db_server->close();
}

?>
