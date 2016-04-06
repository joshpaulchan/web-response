<?php
/**
 * Created by IntelliJ IDEA.
 * User: Jaya Kasa
 * Date: 4/6/2016
 * Time: 1:40 PM
 */
class Paginator{
    private $_limit;
    private $_page;
    private $_total;
    private $_groups;

    private $_conn;
    private $_query;

    /**
     * Paginator constructor.
     *
     * @param $conn
     * @param $countQuery
     * @param $limit
     */
    public function __construct($conn, $countQuery, $limit, $query){
        //setting the db connection
        $this->_conn = $conn;

        //calculate the total number of rows
        if(!$result = $this->_conn->query($countQuery)){
            //the query failed
            die('Paginator Constructor There was an error running the query [ ' . $this->_conn->error . ' ].');
        }

        $row = $result->fetch_array();
        $result->free();
        $this->_total = $row[0];

        $this->_limit = $limit;

        //if limit is all, then there will only be 1 group
        if(is_numeric($limit)) {
            $this->_groups = ceil($this->_total / $limit);
        }
        else{
            $this->_groups = 1;
        }

        //setting the query
        $this->_query = $query;
    }

    /**
     *  Method to get the data from the DB.
     *  param limit cal also be 'all' if you wish to get all results at once
     *
     * @param int $limit default 10
     * @param int $page default 1
     */
    public function loadData($group_num){
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
            $query = $query . " limit " . $this->_limit . " offset " . $position;
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

        return json_encode($json_result); //this will go back under "data" of angular call.

        /**
         * echo '<ul class="page_result">';
        while($results->fetch()){ //fetch values
        echo '<li id="item_'.$id.'"><span class="page_name">'.$id.') '.$name.'</span><span class="page_message">'.$message.'</span></li>';
        }
        echo '</ul>';

        $mysqli->close();
         */
    }

    /**
     * Method to create links for pagination. NOT DYNAMIC
     *
     * @param $link
     * @param $list_class
     * @return string
     */
    public function createLinks($link, $list_class){
        if($this->_limit == 'all'){
            return '';
        }

        $last = ceil($this->_total / $this->_limit);

        $start = (($this->page - $link) > 0) ? $this->_page - $link : 1;
        $end = (($this->_page + $link)  < $last) ? $this->_page + $link:$last;

        $html = '<ul class ="' . $list_class . '">';

        $class = ($this->_page == 1) ? "disabled": "";

        $html .= '<li class = "' . $class . '"><a href="?limit=' . $this->_limit .
            '&page=' . ($this->_page - 1) . '">&laquo;</a></li>"';

        if ( $start > 1 ) {
            $html   .= '<li><a href="?limit=' . $this->_limit . '&page=1">1</a></li>';
            $html   .= '<li class="disabled"><span>...</span></li>';
        }

        for ( $i = $start ; $i <= $end; $i++ ) {
            $class  = ( $this->_page == $i ) ? "active" : "";
            $html   .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . $i . '">' . $i . '</a></li>';
        }

        if ( $end < $last ) {
            $html   .= '<li class="disabled"><span>...</span></li>';
            $html   .= '<li><a href="?limit=' . $this->_limit . '&page=' . $last . '">' . $last . '</a></li>';
        }

        $class      = ( $this->_page == $last ) ? "disabled" : "";
        $html       .= '<li class="' . $class . '"><a href="?limit=' . $this->_limit . '&page=' . ( $this->_page + 1 ) . '">&raquo;</a></li>';

        $html       .= '</ul>';

        return $html;
    }

    /**
     * Method to get the total number of groups.
     * For usage in Javascript
     *
     * @return float
     */
    public function getGroups(){
        return $this->_groups;
    }
}
?>


