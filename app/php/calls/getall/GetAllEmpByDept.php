<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/3/2016
 * Time: 1:51 PM
 */
require_once '../../queries/SelectQueries.php';
require_once '../../Caller.php';

//returning the results of the query in json format
echo getAll($allEmpByDept); //this will go back under "data" of angular call.
?>

