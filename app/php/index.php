<?php
/**
 * Created by PhpStorm.
 * Author: Jaya Kasa
 * Date: 2/4/2016
 * Time: 12:34 PM
 *
 * This in a test landing page.
 * DELETE WHEN PROJECT IS COMPLETE.
 *
 */
require_once 'dbconnect.php';

$query = "select * from department";

if(!$result = $db_server->query($query)){
    //the query failed
    die('There was an error running the query [ ' . $db_server->error . ' ].');
}

//pringing the result set
$count = 1;
while($row = $result->fetch_assoc()){
    echo $count . ')<br/>';
    foreach($row as $value){
        echo $value .'<br/>';
    }
    echo '<br/>';
    $count++;
}

$result->free();
$db_server->close();

echo 'Result is freed and the connection is closed';

?>