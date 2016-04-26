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

// TODO: update DB

// $query="SELECT f.descr as folder_name, f.folder_id from folder f, message m where f.folder_id=m.folder_id and m.message_id='".$_POST[message_id]."'";
// $result=mysql_query($query) or die(mysql_error());
// $folder=mysql_fetch_array($result, MYSQL_ASSOC);
//
// if (isset($_POST["draft_id"]))
//     $query="UPDATE response set `status_ind`='S',`to`='".$_POST["to"]."',`cc`='".$_POST["cc"]."',`bcc`='".$_POST["bcc"]
//     ."',`subject`='".$_POST["subject"]."', `descr`='".$_POST["message"]."',`last_modified_by`='".$_SESSION[id]."' WHERE response_id='".$_POST["draft_id"]."'";
// else
//     $query="INSERT into response(`message_id`,`user_id`,`status_ind`,`to`,`cc`,`bcc`,`subject`,`descr`,`last_modified_by`,`created`)
//     VALUES('".$_POST[message_id]."','".$_SESSION[id]."','S','".$_POST["to"]."','".$_POST[cc]."','".$_POST[bcc]."','".htmlentities($_POST[subject])."','".htmlentities($_POST["message"])."','".$_SESSION[id]."',NOW())";
//
//
// $result=mysql_query($query) or die(mysql_error());
//
// $query="UPDATE message set status_ind='R' where message_id='".$_POST[message_id]."'";
// mysql_query($query) or die(mysql_error());
//
// if ($result) {
//     echo "<p class=arialBody>Your response has successfully been and sent and saved.</p><p class=arialBody>Return to <a href=\"index.php?form=folder&f=$folder[folder_id]\">$folder[folder_name]</a></p>";
//     return;
// }
// else {
//     echo "<p class=arialBody>Your message has been sent, but could not be saved to the Web Response system. Please note the message to which you were replying and alert an administrator.</p>";
//     return;
// }

function sendEmail($to, $subject, $text, $headers){
    //$to = "kasa288@gmail.com";
    //$subject = "My subject";
    //$txt = "Hello world!";
    //$headers = "From: kasa288@gmail.com" . "\r\n" . "CC: kasa288@gmail.com";
    mail($to,$subject,$text,$headers);
}



?>
