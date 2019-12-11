window.onload = handleGetArticles();

// Get DOM element
let domControl = {
  articleWrapper: document.querySelector('.articles-wrapper'),
  tableArticle: document.querySelector('.articles-wrapper'),

  tableArticleHeader: document.querySelector('.table-article__head'),
  tableArticleBody: document.querySelector('.table-article__body'),

  linkCreateArticleForm: document.querySelector('.link-create-article-form'),

  tableHeaderRow: document.querySelector('.thead-row'),
  tableHeaderTh: document.querySelector('.thead-row__th'),

  sort: document.querySelector('.sort'),

  sortAscTitle: document.querySelector('.sort__asc-title'),
  sortDescTitle: document.querySelector('.sort__desc-title'),
  sortAscPublished: document.querySelector('.sort__asc-published'),
  sortDescPublished: document.querySelector('.sort__desc-published'),
  sortAscSite: document.querySelector('.sort__asc-site'),
  sortDescSite: document.querySelector('.sort__desc-site'),
  sortAscAd: document.querySelector('.sort__asc-ad'),
  sortDescAd: document.querySelector('.sort__desc-ad'),
  sortAscBids: document.querySelector('.sort__asc-bids'),
  sortDescBids: document.querySelector('.sort__desc-bids'),
  sortAscSpending: document.querySelector('.sort__asc-spending'),
  sortDescSpending: document.querySelector('.sort__desc-spending'),
  sortAscWin: document.querySelector('.sort__asc-Win'),
  sortDescWin: document.querySelector('.sort__desc-Win'),
  sortAscImpressions: document.querySelector('.sort__asc-Impressions'),
  sortDescImpressions: document.querySelector('.sort__desc-Impressions'),
  sortAscClicks: document.querySelector('.sort__asc-Clicks'),
  sortDescClicks: document.querySelector('.sort__desc-Clicks'),
  sortAscCtr: document.querySelector('.sort__asc-ctr'),
  sortDescCtr: document.querySelector('.sort__desc-ctr'),
}
//Get All Articles
function handleGetArticles() {
  let url = 'http://localhost/PHP_liveArticle/backAssets/api/getArticles.php';
  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(data => {
      let arrObjArticle = data.articles;

      let displayArticle = "";
      arrObjArticle.map(objArticle => {

        displayArticle = displayArticle.concat(`
        <tr class="tbody-row">
        <td class="tbody-row__col">${objArticle.article_title}</td>
        <td class="tbody-row__col">${objArticle.article_published}</td>
        <td class="tbody-row__col">${objArticle.article_site}</td>
        <td class="tbody-row__col">${objArticle.article_ad_group}</td>
        <td class="tbody-row__col">${objArticle.article_bids}</td>
        <td class="tbody-row__col">${objArticle.article_spending}</td>
        <td class="tbody-row__col">${objArticle.article_win_rate}</td>
        <td class="tbody-row__col">${objArticle.article_impressions}</td>
        <td class="tbody-row__col">${objArticle.article_clicks}</td>
        <td class="tbody-row__col">${objArticle.article_ctr}</td>
        </tr>
        `);
      })
      domControl.tableArticleBody.innerHTML = displayArticle;
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
      console.log(data)
      document.querySelector(".heading-secondary").innerHTML = data.message;
      //Empty the form after submit
      document.getElementById("submit-article").reset();
      // Call handleGetArticles function
      handleGetArticles();
    })
    .catch(err => console.log(err));
  return false; //prevent form from posting (element.preventDefault())
}