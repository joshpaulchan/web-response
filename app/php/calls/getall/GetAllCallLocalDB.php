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

    return $paginate->loadData($group_num);

}
?>
