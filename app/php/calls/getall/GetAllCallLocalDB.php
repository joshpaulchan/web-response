<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/30/2016
 * Time: 5:39 PM
 */


/**
 * Method connects to local DB and returns all messages
 *
 * @param $paginate
 * @param $group_num
 * @return mixed
 */
function getAll($paginate, $group_num){
    require_once "../../util/utf8ize.php";

    return json_encode(utf8ize($paginate->loadData($group_num)));

}
?>
