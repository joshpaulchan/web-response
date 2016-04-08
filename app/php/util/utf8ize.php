<?php
/**
 * Created by IntelliJ IDEA.
 * User: Joshua Chan
 * Date: 4/8/2016
 * Time: 4:25 PM
 */

/**
 * Method returns data in utf8 format
 *
 * @param $data
 * @return string
 */
function utf8ize($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $d[$key] = utf8ize($value);
        }
    } else if (is_string ($data)) {
        return utf8_encode($data);
    }
    return $data;
}

?>
