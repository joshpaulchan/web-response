<?php
/**
 * PHP script for accessing the email server.
 * Use this page to create a connection.
 * Make sure to set the hostname, username, password before using this otherwise there will be an error.
 *
 * Created by PhpStorm.
 * @author Jaya Kasa
 * Date: 2/8/2016
 * Time: 4:01 PM
 */

$hostname = '{imap.gmail.com:993/imap/ssl/novalidate-cert}INBOX';;
$username = 'kasa288@gmail.com';
$password = 'carbon15';

$hostname = '';;
$username = '';
$password = '';

//echo $username . '<br/>';

// connect to email or die
//imap_last_error() returns the last error that occurred
$inbox = imap_open($hostname, $username, $password) or die('Cannot connect to Gmail: ' . imap_last_error());

//grab total number of messages in the mailbox
$total = imap_num_msg($inbox);
//echo 'total number of messages: ' . $total . '<br/>';

//grab total number of recent messages in the mailbox
$recent = imap_num_recent($inbox);
//echo 'total number of recent messages: ' . $recent . '<br/>';


//imap_body(); --> reads the message body
//imap_createmailbox(); --> create a specific mailbox to hold all ucm messages
//imap_fetchheader() --> Returns header for a message
//imap_mail() --> use this to send a specific message
//imap_search() --> http://php.net/manual/en/function.imap-search.php


//closing the connection
imap_close($inbox);

?>