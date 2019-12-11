window.onload = handleGetArticles();

//Get All Posts
function handleGetArticles() {
  fetch("http://localhost/PHP_liveArticle/backAssets/api/getArticles.php")
    .then(res => res.json())
    .then(articles => {
      articles.article.map(function (article) {
        console.log(article);
      });
    })
    .catch(err => console.log(err));
}

//Create Article
function handleCreateArticle(formData) {
  let data = new FormData(formData);
  fetch(formData.action, {
      method: formData.method,
      body: data
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById("article-table").innerHTML = data.message;
      //Empty the form after submit
      document.getElementById("submit-article").reset();
      handleGetArticles(); // calling get posts function
    })
    .catch(err => console.log(err));
  return false; //prevent form from posting (element.preventDefault())
}