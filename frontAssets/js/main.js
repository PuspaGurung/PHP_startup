window.onload = handleGetArticles();

// Get DOM element
let domControl = {
  // Table
  articleWrapper: document.querySelector(".articles-wrapper"),
  tableArticle: document.querySelector(".articles-wrapper"),
  tableArticleHeader: document.querySelector(".table-article__head"),
  tableArticleBody: document.querySelector(".table-article__body"),
  linkCreateArticleForm: document.querySelector(".link-create-article-form"),
  tableHeaderRow: document.querySelector(".thead-row"),
  tableHeaderTh: document.querySelector(".thead-row__th"),

  // Sort element
  sort: document.querySelector(".sort"),
  sortAsc: document.querySelector(".sort__asc"),
  sortDesc: document.querySelector(".sort__desc"),
  sortAscTitle: document.querySelector(".sort__asc-title"),
  sortDescTitle: document.querySelector(".sort__desc-title"),
  sortAscPublished: document.querySelector(".sort__asc-published"),
  sortDescPublished: document.querySelector(".sort__desc-published"),
  sortAscSite: document.querySelector(".sort__asc-site"),
  sortDescSite: document.querySelector(".sort__desc-site"),
  sortAscAd: document.querySelector(".sort__asc-ad"),
  sortDescAd: document.querySelector(".sort__desc-ad"),
  sortAscBids: document.querySelector(".sort__asc-bids"),
  sortDescBids: document.querySelector(".sort__desc-bids"),
  sortAscSpending: document.querySelector(".sort__asc-spending"),
  sortDescSpending: document.querySelector(".sort__desc-spending"),
  sortAscWin: document.querySelector(".sort__asc-Win"),
  sortDescWin: document.querySelector(".sort__desc-Win"),
  sortAscImpressions: document.querySelector(".sort__asc-Impressions"),
  sortDescImpressions: document.querySelector(".sort__desc-Impressions"),
  sortAscClicks: document.querySelector(".sort__asc-Clicks"),
  sortDescClicks: document.querySelector(".sort__desc-Clicks"),
  sortAscCtr: document.querySelector(".sort__asc-ctr"),
  sortDescCtr: document.querySelector(".sort__desc-ctr"),

  // Link to submit form
  linkCreateArticle: document.querySelector('.link-create-article '),
  // Popup
  popupOverlay: document.querySelector('#popup-overlay'),
  closePopup: document.querySelector('.popup-close'),
  //Submit form
  submitArticleForm: document.querySelector('#submit-article'),
  // Submit message
  submitMessage: document.querySelector('.submit-message'),
  // Cancel submit message
  clearSubmitForm: document.querySelector('.form-group__btn-cancel')
};

//Get All Articles
function handleGetArticles() {
  let url = "http://localhost/PHP_liveArticle/backAssets/api/getArticles.php";
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let arrObjArticle = data.articles;
      let sortAsc = document.querySelectorAll(".sort__asc");
      let hello = document.querySelector(".hello");

      for (let i = 0; i < sortAsc.length; i++) {
        sortAsc[i].addEventListener("click", x => {
          console.log(x.target.value);
        });
      }
      let displayArticle = "";
      arrObjArticle.map((objArticle, i) => {

        displayArticle = displayArticle.concat(`
        <tr class="tbody-row">
        <td ><a title="Go to Article ${objArticle.article_title}" href=#" class="link-article move-right">${objArticle.article_title}</a></td>
        <td >${objArticle.article_published}</td>
        <td >${objArticle.article_site}</td>
        <td ><a title="Go to Ad group ${objArticle.article_ad_group}" href="" class="link-article move-right">${objArticle.article_ad_group}</a></td>
        <td >${objArticle.article_bids}</td>
        <td >${objArticle.article_spending}</td>
        <td >${objArticle.article_win_rate} %</td>
        <td >${objArticle.article_impressions}</td>
        <td >${objArticle.article_clicks}</td>
        <td >${objArticle.article_ctr} %</td>
        </tr>
        `);
      });
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
      domControl.submitMessage.innerHTML = data.message;
      //Empty the form after submit
      domControl.submitArticleForm.reset();

      // Call handleGetArticles function
      handleGetArticles();
    })
    .catch(err => console.log(err));
  return false; //prevent form from posting (element.preventDefault())
}

// STYLESHEET ******************************************************************/
// ColSpan=full (td 100% witdth) for td element in the table
let tdNode = document.querySelectorAll(["col-span-full"]);
Array.from(document.querySelectorAll("[col-span-full]")).forEach(td => {
  let tbl = td;
  while (tbl && tbl.nodeName !== "TABLE") {
    tbl = tbl.parentNode;
  }
  td.colSpan = Array.from(tbl.querySelector("tr").children).reduce(
    (x, child) => x + child.colSpan,
    0
  );
});

// Close popup box
domControl.closePopup.addEventListener('click', (e) => {
  e.preventDefault();
  domControl.popupOverlay.style.top = '-105%';
})
// Display popup box (submit form)
domControl.linkCreateArticle.addEventListener('click', (e) => {
  e.preventDefault();
  let stylePopupOverlay = {
    top: 0
  };
  let addStylePopupOverlay = domControl.popupOverlay.style;
  for (let style in stylePopupOverlay) {
    addStylePopupOverlay[style] = stylePopupOverlay[style];
  }
});
// Clear submit form
domControl.clearSubmitForm.addEventListener('click', (e) => {
  e.preventDefault();
  domControl.submitArticleForm.reset();
})