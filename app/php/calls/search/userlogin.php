<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/3/2016
 * Time: 3:28 PM
 */

require_once '../../Caller.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$username = $request->username;
@$pass = $request->pass;

//returning the results of the query in json format
echo login($username, $pass); //this will go back under "data" of angular call.
?>
