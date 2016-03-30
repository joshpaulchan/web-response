<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$username = $request->username;
@$pass = $request->pass;

//returning the results of the query in json format
echo login($username, $pass); //this will go back under "data" of angular call.

// TODO CAS authentication should probably done in this method
/**
 * Method for logging into new webresponse system
 *
 * @param $username
 * @param $password
 * @return string
 */
function login($username, $password){
    require_once '../../queries/SelectQueries.php';
    require_once '../../db/dbconnect.php';

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
?>
