<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/1/2016
 * Time: 9:48 AM
 */

require_once '../../queries/SelectQueries.php';
require_once 'GetAllCallOldDB.php';

require_once '../../paginate/Paginator.php';
//TODO change this later to the new db
//require_once '../../db/dbtestlocal.php';
require_once '../../db/dbconnect.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$group_num = $request->group_num;

static $paginate = null;
$query = "select count(*) from message";

if($paginate == null){
    $paginate = new Paginator($db_server, $query, 25, $allUsers);
}

//returning the results of the query in json format
echo getAll($paginate, $allMessages); //this will go back under "data" of angular call.
?>
