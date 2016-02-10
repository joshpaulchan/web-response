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

echo 'INDEX PAGE' . '<br/>';


require_once 'dbconnect.php';
require_once 'SelectQueries.php';
require_once 'browserinfo.php';

//$query = $allDepartments;
//$query = $allUsers;
$query = $allMessages;

if(!$result = $db_server->query($query)){
    //the query failed
    die('There was an error running the query [ ' . $db_server->error . ' ].');
}

//pringing the result set
$count = 1;
//using assoc here because it would be easier for future modifications
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

echo 'Result is freed and the connection is closed' . "<br/>";

/*
//code to rest the email.php code
require_once 'email.php';

echo 'total number of messages: ' . $total . '<br/>';
echo 'total number of recent messages: ' . $recent . '<br/>';4
*/

?>