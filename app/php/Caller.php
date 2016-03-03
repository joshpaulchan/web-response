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
?>
