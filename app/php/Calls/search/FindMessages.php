<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/30/2016
 * Time: 5:11 PM
 */


// TODO finish general search method for messages
// Use the old DB setup
/**
 * Method for searching for messages on old DB
 *
 * @param $name
 * @param $email
 * @param $subject
 * @param $comment
 * @param $redirect
 * @param $browserinfo
 * @param $topic
 * @param $date
 */
function searchMessages($name, $email, $subject, $comment, $redirect, $browserinfo, $topic, $date){
    require_once '../../queries/SelectQueries.php';
    require_once '../../db/dbconnect.php';

    $query = $generalMessageSearchP1;
    $prefix = False;

    if(!empty($name)){
        $query = $query . $generalMessageSearchP2 . $name . $generalMessageSearchP0;
        $prefix = True;
    }
    if(!empty($email)){
        $query = $query . $generalMessageSearchP3;
    }
    if(!empty($subject)){
        $query = $query . $generalMessageSearchP4;
    }
    if(!empty($comment)){
        $query = $query . $generalMessageSearchP5;
    }
    if(!empty($redirect)){
        $query = $query . $generalMessageSearchP6;
    }
    if(!empty($browserinfo)){
        $query = $query . $generalMessageSearchP7;
    }
    if(!empty($topic)){
        $query = $query . $generalMessageSearchP8;
    }
    if(!empty($date)){
        $query = $query . $generalMessageSearchP9;
    }
}
?>
