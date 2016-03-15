<?php
/**
 * Created by IntelliJ IDEA.
 * User: kasa2
 * Date: 3/9/2016
 * Time: 3:19 PM
 */

/**
 * get the variables from the login.php page
 *
 * $db_hostname
 * $db_database
 * $db_username
 * $db_password
 */

require_once 'ucmlogin.php';

/**
 * Create connection to database
 * Using a mysqli object
 * mysql_connect is deprecated as of php 7
 * Option: use mysqli_connect(String host, String username, String password, String dbname(optional))
 * returns a connection to db
 * mysqli_select_db(String dbname)
 * lets you explicitly pick a database if you want
 * Must remember to explicitly close with mysqli_close(connection)
 *
 * This project is being compiled using php 7
 *
 * mysqli(String hostname, String username, String password, String DBName, int port(optional), String socket(optional))
 *
 */
$db_server = new mysqli($db_hostname, $db_username, $db_password, $db_database);

// Check connection
if ($db_server->connect_error) {
    //connection failed and printing the reason for failure
    die("Connection failed: " . $db_server->connect_error);
}
//echo "Connected successfully";

/**
 * closing the connection
 * no resource leak
 * comment out if you want to keep the $db_server connection open for other classes to use.
 */
//$db_server->close();

//echo "Connection Closed";
?>
