<?php
 class Database{

   private $host = "localhost";
   private $db_name = "articles_db";
   private $username = "root";
   private $password = "";
   public $conn;

   //Databse connection
   public function getDbConnection(){
     $this->conn = NULL;

     try{
       $this->conn = new PDO('mysql:host=' . $this->host .';dbname=' .$this->db_name, $this->username, $this->password);
       $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     }catch(PDOException $exception){
        echo "Connection error: " . $exception->getMessage();
     }
     return $this->conn;

   }//EOF getDbConnection()

 }// EOF Class Databse
 ?>
