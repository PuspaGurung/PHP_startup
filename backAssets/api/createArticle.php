<?php
include_once './../database/Database.php';
include_once './../models/Articles.php';

//Instantiate database & connection
$database = new Database();
$db = $database->getDbConnection();

//Instantiate Articles object
$article = new Articles($db);

//Get the new Articles properties by post method from the submit form 
$article->article_title = $_POST['article_title'];
$article->article_published = $_POST['article_published'];
$article->article_site = $_POST['article_site'];

$article->article_ad_group = $_POST['article_ad_group'];
$article->article_bids = $_POST['article_bids'];
$article->article_spending = $_POST['article_spending'];

$article->article_win_rate = $_POST['article_win_rate'];
$article->article_impressions = $_POST['article_impressions'];
$article->article_clicks = $_POST['article_clicks'];
$article->article_ctr = $_POST['article_ctr'];

//Create Article
if($article->createArticle()){
  echo json_encode(array(
    'message' => 'New Article  created'
  ));
}else{
  echo json_encode(array(
    'message' => 'Error encounter'
  ));
}
 ?>
