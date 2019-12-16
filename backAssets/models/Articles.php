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

//Constructor
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
article_site = :article_site,
article_ad_group = :article_ad_group,
article_bids = :article_bids,
article_spending = :article_spending,
article_win_rate = :article_win_rate,
article_impressions = :article_impressions,
article_clicks = :article_clicks,
article_ctr = :article_ctr';

//Prepare statement
$stmt = $this->conn->prepare($query);

//Convert predefined characters to HTML elements (clean the code)
$this->article_title = htmlspecialchars(strip_tags($this->article_title));
$this->article_published = htmlspecialchars(strip_tags($this->article_published));
$this->article_site = htmlspecialchars(strip_tags($this->article_site));
$this->article_ad_group = htmlspecialchars(strip_tags($this->article_ad_group));
$this->article_bids = htmlspecialchars(strip_tags($this->article_bids));
$this->article_spending = htmlspecialchars(strip_tags($this->article_spending));
$this->article_win_rate = htmlspecialchars(strip_tags($this->article_win_rate));
$this->article_impressions = htmlspecialchars(strip_tags($this->article_impressions));
$this->article_clicks = htmlspecialchars(strip_tags($this->article_clicks));
$this->article_ctr = htmlspecialchars(strip_tags($this->article_ctr));

//Bind Article data
$stmt->bindParam(':article_title', $this->article_title);
$stmt->bindParam(':article_published', $this->article_published);
$stmt->bindParam(':article_site', $this->article_site);
$stmt->bindParam(':article_ad_group', $this->article_ad_group);
$stmt->bindParam(':article_bids', $this->article_bids);
$stmt->bindParam(':article_spending', $this->article_spending);
$stmt->bindParam(':article_win_rate', $this->article_win_rate);
$stmt->bindParam(':article_impressions', $this->article_impressions);
$stmt->bindParam(':article_clicks', $this->article_clicks);
$stmt->bindParam(':article_ctr', $this->article_ctr);

//Execute the Query
if($stmt->execute()){
return true;
}else{
  printf("Error:", $stmt->error);
  return false;
}
}

//Get all article from the database
public function getAllArticles(){
  //Create Query
  //Get articles by Ascending order in terms of article title
  $query = 'SELECT article_id, article_title, article_published, article_site, article_ad_group, article_bids, article_spending, article_win_rate, article_impressions, article_clicks, article_ctr
            FROM ' . $this->table_name . ' ORDER BY article_title ASC';

//prepare statement
$stmt = $this->conn->prepare($query);

//Execute Query
$stmt->execute();

return $stmt;
} //EOF getAllArticle()

}// EOF Class
 ?>
