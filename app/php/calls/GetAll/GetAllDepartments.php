<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/3/2016
 * Time: 1:12 PM
 */

require_once '../../queries/SelectQueries.php';
require_once 'GetAllCallNewDB.php';
//require_once 'GetAllCallLocalDB.php';

//returning the results of the query in json format
echo getAll($allDepartments); //this will go back under "data" of angular call.
?>
