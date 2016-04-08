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

 function utf8ize($d) {
     if (is_array($d)) {
         foreach ($d as $k => $v) {
             $d[$k] = utf8ize($v);
         }
     } else if (is_string ($d)) {
         return utf8_encode($d);
     }
     return $d;
 }

function getAll($paginate, $group_num){

    return json_encode(utf8ize($paginate->loadData($group_num)));

}
?>
