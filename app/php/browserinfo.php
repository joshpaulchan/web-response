<?php
/**
 * Created by PhpStorm.
 * User: kasa2
 * Date: 2/8/2016
 * Time: 5:23 PM
 */

echo $_SERVER['HTTP_USER_AGENT'] . "<br/>";

$browser = get_browser(null, true);
foreach($browser as $value){
    echo $value .'<br/>';
}
echo '<br/>';
//print_r($browser);
?>