<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 3/23/2016
 * Time: 11:27 AM
 */

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$to = $request->to;
@$subject = $request->subject;
@$text = $request->text;
@$headers = $request->headers;

//returning the results of the query in json format
echo sendEmail($to, $subject, $text, $headers); //this will go back under "data" of angular call.

function sendEmail($to, $subject, $text, $headers){
    //$to = "kasa288@gmail.com";
    //$subject = "My subject";
    //$txt = "Hello world!";
    //$headers = "From: kasa288@gmail.com" . "\r\n" . "CC: kasa288@gmail.com";
    mail($to,$subject,$text,$headers);
}



?>
