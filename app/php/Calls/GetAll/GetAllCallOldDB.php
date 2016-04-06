<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/3/2016
 * Time: 1:35 PM
 */


/**
 * Method connects to old DB and returns all messages
 *
 * @param $paginate
 * @param $group_num
 * @return mixed
 */
function getAll($paginate, $group_num){

    return $paginate->loadData($group_num);

}
?>
