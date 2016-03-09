<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/1/2016
 * Time: 9:48 AM
 */

require_once '../../queries/SelectQueries.php';
require_once '../../Caller.php';

//returning the results of the query in json format
echo getAll($allMessages); //this will go back under "data" of angular call.
?>
