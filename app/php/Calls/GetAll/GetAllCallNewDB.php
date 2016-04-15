<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
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
function getAll($paginate, $group_num){
    require_once "../../util/utf8ize.php";

    return json_encode(utf8ize($paginate->loadData($group_num)));
}

?>
