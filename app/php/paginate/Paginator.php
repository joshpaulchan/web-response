<?php
/**
 * Created by IntelliJ IDEA.
 * User: Joshua Chan
 * Date: 4/22/2016
 */

class Paginator {
    private $_limit;
    private $_page;
    private $_total;
    private $_groups;

    private $_conn;
    private $_query;

    private $_table;

    /**
     * Paginator constructor.
     *
     * @param $db_conn
     * @param $countQuery
     * @param $limit
     */
    public function __construct($db_conn, $table, $limit){
        //setting the db connection
        $this->_conn = $db_conn;
        $this->_table = $table;
        $this->_limit = $limit;

        //calculate the total number of rows
        if(!$result = $this->_conn->query("SELECT COUNT(*) FROM `" . $table . "`")){
            //the query failed
            die('Paginator Constructor There was an error running the query [ ' . $this->_conn->error . ' ].');
        }

        $row = $result->fetch_array();
        $result->free();
        $this->_total = $row[0];

        //if limit is all, then there will only be 1 group
        if(is_numeric($limit)) {
            $this->_groups = ceil($this->_total / $limit);
        }
        else{
            $this->_groups = 1;
        }

        //setting the query
        $this->_query = "SELECT * FROM `" . $this->_table . "`";
    }

    /**
     *  Method to get the data from the DB.
     *  param limit cal also be 'all' if you wish to get all results at once
     *
     * @param int $limit default 10
     * @param int $page default 1
     */
    public function load($group_num){
        $query = $this->_query;
        if($this->_limit != 'all'){
            //setup the limited query
            //throw HTTP error if group number is not valid
            if(!is_numeric($group_num)){
                header('HTTP/1.1 500 Paginator: Invalid Group number!');
                exit();
            }

            //get current starting point of records
            $position = ($group_num * $this->_limit);

            //Limit our results within a specified range.
            $query = $query . " LIMIT " . $this->_limit . " OFFSET " . $position;
        }

        //getting the results
        if(!$result = $this->_conn->query($query)){
            //the query failed
            die('Paginator LoadData There was an error running the query [ ' . $this->_conn->error . ' ].');
        }

        //creating the array that will be returned in json format
        $json_result = array();

        //using assoc here because it would be easier for future modifications
        while($row = $result->fetch_assoc()){
            $json_result[] = $row;
            //echo "<script>console.log(" . $row . ");</script>";
        }
        $result->free();

        return $json_result; //this will go back under "data" of angular call.
    }
}
?>
