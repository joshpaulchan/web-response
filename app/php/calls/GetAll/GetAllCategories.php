<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/3/2016
 * Time: 1:34 PM
 */

require_once '../../queries/SelectQueries.php';
//require_once 'GetAllCallNewDB.php';
require_once 'GetAllCallLocalDB.php';
require_once '../../paginate/Paginator.php';
//require_once '../../db/dbtestlocal.php';
require_once '../../db/dbconnect.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$group_num = $request->group_num;

static $paginate = null;

if($paginate == null){
    $query = "select count(*) from category";
    $paginate = new Paginator($db_server, $query, 25, $allCategories);
}

//returning the results of the query in json format
echo getAll($paginate, $group_num); //this will go back under "data" of angular call.

?>
