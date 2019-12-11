<?php
include_once '../database/Database.php';
include_once '../models/Articles.php';

//Instantiate databse & connection
$database = new Database();
$db = $database->getDbConnection();

//Instantiate Articles object
$article = new Articles($db);

//Query of the Articles
$result = $article->getAllArticles();
// Get number of Row
$numRow = $result->rowCount();

//checking records
if($numRow > 0)
{
  //Article array
  $articleArray = array();
  $articleArray['article'] = array();

  while($row = $result->fetch(PDO::FETCH_ASSOC)){
    extract($row);

    $articleItems = array(
      'article_id' => $article_id,
      'article_title' => $article_title,
      'article_published' => $article_published,
       'article_site' => $article_site,

       'article_ad_group' => $article_ad_group,
      'article_bids' => $article_bids,
      'article_spending' => $article_spending,
       'article_win_rate' => $article_win_rate,

       'article_impressions' => $article_impressions,
       'article_clicks' => $article_clicks,
      'article_ctr' => $article_ctr,
       

    );

    // Push to array article
    array_push($articleArray['article'], $articleItems);
  }

  //turn to JSON and output
  echo json_encode($articleArray);
}else{
  echo json_encode(array(
    'message' => 'No articles Available'
  ));
}
?>
