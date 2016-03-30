<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/3/2016
 * Time: 1:34 PM
 */

//TODO categories need implementation
require_once '../../queries/SelectQueries.php';
require_once '';

//returning the results of the query in json format
echo getAll($allCategories); //this will go back under "data" of angular call.
?>
