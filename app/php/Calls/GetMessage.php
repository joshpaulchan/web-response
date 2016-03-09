<?php
/**
 * Created by Atom
 * User: Joshua Chan
 */

/*
   * Collect all Details from Angular HTTP Request.
*/

$result = array(
    "id" => 0,
    "subject" => "Aerospace Engineering",
    "createdAt" => "Jan 5, 2016",
    "createdBy" => "khushbudarji@rocketmail.com",
    "folder" => "inbox",
    "status" => array(
        "selected" => false,
        "unread"  => false,
        "repliedTo" => true
    ),
    "thread" => array(
        array(
            "email" => "khushbudarji@rocketmail.com",
            "createdAt" => "Jan 5, 2016",
            "content" => "Hello ,\r\nI want to get some information about course at your university .\r\n\r\nI'm from India and studying last semester of master degree in communication and system.\r\nSo , can I apply there for aerospace engineering course\r\nAnd can you please guide me some about it .\r\nI hope you will reply positively\r\n\r\nThank you\r\nGave a nice day\r\n\r\n"
        ),
        array(
            "email" => "person@example.com",
            "createdAt" => "later on 13 AM",
            "content" => "Ah,\r\nyes."
        )
    )
);

//returning the results of the query in json format
echo json_encode($result); //this will go back under "data" of angular call.
$result->free();
?>
