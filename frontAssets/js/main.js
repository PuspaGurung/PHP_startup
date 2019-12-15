window.onload = handleGetArticles();

// Get DOM element
let DOMcontrol = {
  articleWrapper: document.querySelector(".articles-wrapper"),
  // Table 
  tableArticle: document.querySelector(".articles-wrapper"),
  // Table head
  tableArticleHeader: document.querySelector(".table-article__head"),
  tableHeaderRow: document.querySelector(".thead-row"),
  tableHeaderTh: document.querySelector(".thead-row__th"),
  linkCreateArticleForm: document.querySelector(".link-create-article-form"),
  // Table body
  tableArticleBody: document.querySelector(".table-article__body"),
  // Table foot
  btnLoadMore: document.querySelector(".more-article"),
  totalArticleNumber: document.querySelector('.total-article-number'),
  totalLoadedArticleNumber: document.querySelector('.loaded-article-number'),

  // Sort element
  sort: document.querySelector(".sort"),
  sortAsc: document.querySelector(".sort__asc"),
  sortDesc: document.querySelector(".sort__desc"),

  // Link to submit form
  linkCreateArticle: document.querySelector(".link-create-article "),
  // Popup
  popupOverlay: document.querySelector("#popup-overlay"),
  closePopupOverlay: document.querySelector(".popup-close"),
  //Submit form
  submitArticleForm: document.querySelector("#submit-article"),
  // Submit message
  submitMessage: document.querySelector(".submit-message-box"),
  // Cancel submit message
  clearSubmitForm: document.querySelector(".form-group__btn-cancel"),

  // Submit form
  inputWinRate: document.getElementById("article_win_rate"),
  inputCTR: document.getElementById("article_ctr")
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
      // Pass arrObjArticle to HandleArticlesOutput class
      new HandleArticlesOutput(arrObjArticle);
    })
    .catch(err => console.log(err));
}

class HandleArticlesOutput {
  constructor(articles) {
    this.articles = articles;
    // For pagination
    this.totalArticlesLength = this.articles.length;
    this.showDefaultLength = 6;
    this.showIncrementLengthBy = 4;

    this.displayArticle();
    this.controlPagination();
    this.sortArticle();
  }
  controlPagination() {
    let currentShow = 0;
    this.show = 0;
    // Show number of total articles
    DOMcontrol.totalArticleNumber.innerHTML = this.totalArticlesLength;
    // Show number of default loaded article number 
    DOMcontrol.totalLoadedArticleNumber.innerHTML = this.showDefaultLength;
    DOMcontrol.btnLoadMore.addEventListener("click", e => {
      e.preventDefault();
      this.showMore = currentShow + this.showIncrementLengthBy;
      currentShow = currentShow + this.showIncrementLengthBy;
      //Control increment length if increment length greater then total length of articles 
      this.show = (this.showMore + this.showDefaultLength > this.articles.length) ? this.articles.length - this.showDefaultLength : this.showMore;

      // Show number of loaded articles
      DOMcontrol.totalLoadedArticleNumber.innerHTML = this.showDefaultLength + this.show;
      //Update the :: displayArticle() :: each time user click on 'Load more' button  
      this.displayArticle();
    });
  }; // EOF controlPagination

  displayArticle() {
    // Condition: before user click on 'Load more' button and after click it
    let showMore = (this.show) ? this.show : 0;
    let showArticleLength = this.showDefaultLength + showMore;
    let displayArticle = "";
    for (let i = 0; i < showArticleLength; i++) {
      displayArticle = displayArticle.concat(`
        <tr class="tbody-row">
        <td ><a title="Go to Article ${this.articles[i].article_title}" href=#" class="link-article move-right">${this.articles[i].article_title}</a></td>
        <td >${this.articles[i].article_published}</td>
        <td >${this.articles[i].article_site}</td>
        <td ><a title="Go to Ad group ${this.articles[i].article_ad_group}" href="" class="link-article move-right">${this.articles[i].article_ad_group}</a></td>
        <td class="text-center" >${this.articles[i].article_bids}</td>
        <td class="text-center" >${this.articles[i].article_spending}</td>
        <td class="text-center" >${this.articles[i].article_win_rate} %</td>
        <td class="text-center" >${this.articles[i].article_impressions}</td>
        <td class="text-center" >${this.articles[i].article_clicks}</td>
        <td class="text-center">${this.articles[i].article_ctr} %</td>
        </tr>
        `);
    }
    // :::::: RENDER DATA USING MAP METHOD :::: 
    // this.articles.map((objArticle, i) => {
    //   displayArticle = displayArticle.concat(`
    //     <tr class="tbody-row">
    //     <td ><a title="Go to Article ${objArticle.article_title}" href=#" class="link-article move-right">${objArticle.article_title}</a></td>
    //     <td >${objArticle.article_published}</td>
    //     <td >${objArticle.article_site}</td>
    //     <td ><a title="Go to Ad group ${objArticle.article_ad_group}" href="" class="link-article move-right">${objArticle.article_ad_group}</a></td>
    //     <td class="text-center" >${objArticle.article_bids}</td>
    //     <td class="text-center" >${objArticle.article_spending}</td>
    //     <td class="text-center" >${objArticle.article_win_rate} %</td>
    //     <td class="text-center" >${objArticle.article_impressions}</td>
    //     <td class="text-center" >${objArticle.article_clicks}</td>
    //     <td class="text-center">${objArticle.article_ctr} %</td>
    //     </tr>
    //     `);
    // });
    DOMcontrol.tableArticleBody.innerHTML = displayArticle;
  }; // EOF displayArticles

  sortArticle() {
    let sortAscItems = document.querySelectorAll(".sort__asc");
    for (let i = 0; i < sortAscItems.length; i++) {
      sortAscItems[i].addEventListener("click", e => {
        let sortBy = e.target.getAttribute("name");
        console.log(sortBy);
        let array = sortArt(this.articles, sortBy);
        this.displayArticle();
      });
    }

    function sortArt(array, sortBy) {
      array.sort(function (a, b) {
        let x = a[sortBy];
        ///a[sortBy] > b[sortBy] ? 1 : -1;
        if (a[sortBy] > b[sortBy]) {
          return 1;
        } else {
          return -1;
        }
      });
      return array;
    }

  }

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
      // Display success or failure message

      DOMcontrol.submitMessage.innerHTML = `<span class="submit-message">${data.message}</span>`;
      // Remove message after two second
      setTimeout(() => {
        DOMcontrol.submitMessage.innerHTML = "";
      }, 2000);

      //Empty the form after submit
      DOMcontrol.submitArticleForm.reset();

      // Call handleGetArticles function
      handleGetArticles();
    })
    .catch(err => console.log(err));
  return false; //prevent form from posting (element.preventDefault())
}

// ******************************** HANDLESTYLESHEET **********************************/
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

class HandleStylePopupOverlay {
  constructor() {
    this.stylesheet = {
      show: {
        top: 0,
        display: "block"
      },
      hide: {
        top: "-150%"
      }
    };
    this.applyStylesheet();
  }

  applyStylesheet() {
    // Show popUp overlay
    DOMcontrol.linkCreateArticle.addEventListener("click", e => {
      e.preventDefault();
      let addStyle = DOMcontrol.popupOverlay.style;
      for (let style in this.stylesheet.show) {
        addStyle[style] = this.stylesheet.show[style];
      }
    });

    // Hide and Display non popUp overlay
    DOMcontrol.closePopupOverlay.addEventListener("click", e => {
      e.preventDefault();
      let addStyle = DOMcontrol.popupOverlay.style;
      for (let style in this.stylesheet.hide) {
        addStyle[style] = this.stylesheet.hide[style];
      }
    });
  }
}
new HandleStylePopupOverlay();
// EOF class HandleStylePopupOverlay

//****************** FORM VALIDATION *************/
// Validate submit form:: Input value in percentage
function validateInputValueInPercentage(e) {
  // if input value is > 100 (Note: percent should be less or equal to 100)
  if (e.value > 100) {
    e.value = e.value.slice(0, 2);
  }
  // if the input value in negative (Note: percentage should be +ve numer)
  if (e.value < 0) {
    e.value = e.value.slice(1);
  }
}

// Clear submit form
DOMcontrol.clearSubmitForm.addEventListener("click", e => {
  e.preventDefault();
  DOMcontrol.submitArticleForm.reset();
});