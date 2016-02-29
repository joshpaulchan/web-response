<?php
/**
 * Created by PhpStorm.
 * User: Jaya Kasa
 * Date: 2/29/2016
 * Time: 3:38 PM
 */

//insert queries prefixes
//up to user to finish the queries
$insertDepartmentsPrefix = "insert into department (name, address, phonenumber, siteurl) Values (";
$insertUsersPrefix = "insert into user (username, password, admin, email, signature) values (";
$insertMessagesPrefix = "insert into message (name, email, subject, topic, comment, date, browserinfo, redirect) values (";
$insertCategoriesPrefix = "insert into category (topic) values (";
$insertEmployeesPrefix = "insert into employee (name, email, title, office, phonenumber) values (";
$insertEmploysPrefix = "insert into employs (department, email) values ((select name from department where name = ";
$insertEmploysMid = ", (select email from employee where email = ";
$insertTemplates = "insert into template (reciever, subject, message) values (";

?>