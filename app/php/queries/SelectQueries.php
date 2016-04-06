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

$allMessages = "select * from message ORDER BY `created` DESC";

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

//for employee by department
$selectDeptByName = "select name from department where name like "; //may be unnecessary
$allempofdept = "select * from employs where department like ";
$empbyemail = "select * from employee where email = ";

//all messages for a specific topic
$messagesByCategory = "select * from message where topic = ";

//all messages by browser
$messagesByCategory = "select * from message where bros = ";

//general message search
$generalMessageSearchP1 = "select * from message where (";
$generalMessageSearchP2 = "(name like \'%'";
$generalMessageSearchP3 = "(subject like \'%";
$generalMessageSearchP4 = "(comment like \'%";
$generalMessageSearchP5 = "(redirect like \'%";
$generalMessageSearchP6 = "(browserinfo like \'%";
$generalMessageSearchP7 = "(topic like \'%";
$generalMessageSearchP8 = "(date like \'%";
$generalMessageSearchP9 = ")";
$generalMessageSearchP10 = "%\')";
$generalMessageSearchP0 = "%\') or ";


//logging in
$login = "select * from user where username = ";
$loginp2 = " and password = ";
?>
