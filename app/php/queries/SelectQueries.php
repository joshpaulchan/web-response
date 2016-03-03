<?php
/**
 * Created by PhpStorm.
 * @author Jaya Kasa
 * Date: 2/8/2016
 * Time: 2:40 PM
 */

//select all queries
$allDepartments = "select * from department";

$allUsers = "select * from user";

$allMessages = "select * from message";

$allCategories = "select * from category";

$allEmployees = "select * from employee";

$allEmpByDept = "select * from employs";

$allTemplates = "select * from template";

//select specific values or a range of values

//for message
$messageByEmail = "select * from message where email like ";
$messageBySubject = "select * from message where subject like ";
$messageByLocation = "select * from message where redirect like ";
$messageByBrowser = "select * from message where browserinfo like ";
$messageByDate = "select * from message where date like ";

//for user
$userPassAdminwordByUsername = "select password, admin from user where username = ";
$userEmailSignatureByUsername = "select email,signature from user where username = ";

//for template
$templateByReceiver = "select * from template where reciever = ";

//for employee


//logging in
$login = 'select * from user where username = ';
$loginp2 = ' and password = '
?>
