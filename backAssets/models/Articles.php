<?php
class Articles{
//Database connection and Table
private $conn;
private $table_name = "articles_table";

//Article table properties
public $article_id;
public $article_title;
public $article_published;
public $article_site;

//constructor with debug
public function __construct($db){
$this->conn = $db;
}

//Create article
public function createArticle(){
//Query to insert article information into articles_table 
$query = 'INSERT INTO ' . $this->table_name .'
SET
article_title = :article_title,
article_published = :article_published,
article_site = :article_site';

//Prepare statement
$stmt = $this->conn->prepare($query);

//Convert predefined characters to HTML elements (clean the code)
$this->article_title = htmlspecialchars(strip_tags($this->article_title));
$this->article_published = htmlspecialchars(strip_tags($this->article_published));
$this->article_site = htmlspecialchars(strip_tags($this->article_site));

//Bind data
$stmt->bindParam(':article_title', $this->article_title);
$stmt->bindParam(':article_published', $this->article_published);
$stmt->bindParam(':article_site', $this->article_site);

//Execute the Query
if($stmt->execute()){
return true;
}else{
  printf("Error:", $stmt->error);
  return false;
}
}

//Get all article from the database
public function getAllArticle(){
  //create Query
  $query = 'SELECT article_id, article_title, article_published, article_site
            FROM ' . $this->table_name . ' ORDER BY article_id DESC';

//prepare statement
$stmt = $this->conn->prepare($query);

//Execute Query
$stmt->execute();

return $stmt;
} //EOF getAllArticle()

}// EOF Class
 ?>
