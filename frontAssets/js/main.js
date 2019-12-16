/** DISPLAY ARTICLES TABLE WHEN WINDOW IS LOAD **/
window.onload = handleGetArticles();

/**GET DOM ELEMENT : OBJECT **/
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
  tableArticleBody: document.querySelector("#table-article__body"),
  // Table foot
  btnLoadMore: document.querySelector(".btn-load-more"),
  totalArticleNumber: document.querySelector(".total-article-number"),
  totalLoadedArticleNumber: document.querySelector(".loaded-article-number"),
  // Sort element
  sort: document.querySelector(".sort"),
  sortAsc: document.querySelectorAll(".sort__asc"),
  sortDesc: document.querySelectorAll(".sort__desc"),
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

/*** GET ALL ARTICLES : FUNCTION  ***/
function handleGetArticles() {
  let url = "http://localhost/PHP_liveArticle/backAssets/api/getArticles.php";
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let arrObjArticle = data.articles;
      // Pass arrObjArticle to HandleArticlesOutput Class
      new HandleArticlesOutput(arrObjArticle);
    })
    .catch(err => console.log(err));
}

/** HANDLE ARTICLES OUPTUP : CLASS **/
class HandleArticlesOutput {
  constructor(articles) {
    this.articlesArray = articles;
    // For pagination
    this.showDefaultLength = 6;
    this.showIncrementLengthBy = 6;

    // For Mobile Device:: User will see only three items at a time in mobile screen
    if (screen.width <= 600) {
      this.showDefaultLength = 2;
      this.showIncrementLengthBy = 2;
    }
    this.displayArticles();
    this.controlPagination();
    this.sortArticles();
  }
  controlPagination() {
    let currentShow = 0;
    this.show = 0;

    // Apply For small screen( width <=600px):: The showStartIndex increment by showDefaultLength each time user click on 'Load more' button
    this.showStartIndex = 0;

    // Display in browser
    DOMcontrol.totalArticleNumber.innerHTML = this.articlesArray.length;
    DOMcontrol.totalLoadedArticleNumber.innerHTML =
      this.articlesArray.length >= this.showDefaultLength
        ? this.showDefaultLength
        : this.articlesArray.length;

    DOMcontrol.btnLoadMore.addEventListener("click", e => {
      e.preventDefault();
      this.showMore = currentShow + this.showIncrementLengthBy;
      currentShow = currentShow + this.showIncrementLengthBy;
      //Control increment length if increment length greater then total length of articles
      this.show =
        this.showMore + this.showDefaultLength > this.articlesArray.length
          ? this.articlesArray.length - this.showDefaultLength
          : this.showMore;

      // Show number of loaded articles
      DOMcontrol.totalLoadedArticleNumber.innerHTML =
        this.showDefaultLength + this.show;
      this.showStartIndex = this.showStartIndex + this.showDefaultLength;
      //Update the :: displayArticles() :: each time when user click on 'Load more' button
      this.displayArticles();
    });
  } // EOF controlPagination

  displayArticles() {
    // Apply condition to start articles index (start loop) to display in in small screen device (screen size <=600px) and device with screen width >600px.
    let showFrom =
      screen.width <= 600 && this.showStartIndex ? this.showStartIndex : 0;

    // Condition: before and after click on 'Load more' button
    let showMore = this.show ? this.show : 0;
    let showArticleLength =
      this.articlesArray.length >= this.showDefaultLength
        ? this.showDefaultLength + showMore
        : this.articlesArray.length;
    let displayArticle = "";

    for (let i = showFrom; i < showArticleLength; i++) {
      displayArticle = displayArticle.concat(`
        <tr class="tbody__row">
        <td ><a title="Go to Article ${this.articlesArray[i].article_title}" href=#" class="link-article">${this.articlesArray[i].article_title}</a></td>
        <td >${this.articlesArray[i].article_published}</td>
        <td >${this.articlesArray[i].article_site}</td>
        <td ><a title="Go to Ad group ${this.articlesArray[i].article_ad_group}" href="" class="link-article">${this.articlesArray[i].article_ad_group}</a></td>
        <td  >${this.articlesArray[i].article_bids}</td>
        <td  >${this.articlesArray[i].article_spending}</td>
        <td  >${this.articlesArray[i].article_win_rate} %</td>
        <td  >${this.articlesArray[i].article_impressions}</td>
        <td  >${this.articlesArray[i].article_clicks}</td>
        <td >${this.articlesArray[i].article_ctr} %</td>
        </tr>
        `);
    }
    DOMcontrol.tableArticleBody.innerHTML = displayArticle;
  } // EOF displayArticles

  sortArticles() {
    /*NOTE: By default the article title is shown in ascending order with the help of SQL query

    /**SORT ASCENDING ORDER**/
    let getSortByAscElements = DOMcontrol.sortAsc;
    for (let i = 0; i < getSortByAscElements.length; i++) {
      getSortByAscElements[i].addEventListener("click", e => {
        let sortBy = e.target.getAttribute("name");
        sortAscending(this.articlesArray, sortBy);
        this.displayArticles();

        //Add active class on clicked sort element
        let active = document.querySelectorAll(".active");
        if (active.length > 0) {
          active[0].className = active[0].className.replace("active", "");
        }
        getSortByAscElements[i].classList.add("active");
      });
    }

    function sortAscending(array, sortBy) {
      array.sort(function(a, b) {
        //If number
        if (Math.floor(a[sortBy] % 1) == 0 && Math.floor(b[sortBy] % 1 == 0)) {
          return a[sortBy] - b[sortBy];
        }
        // If string
        else {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        }
      });
      return array;
    }

    /**SORT DECENDING ORDER**/
    let getSortByDescElements = DOMcontrol.sortDesc;
    for (let i = 0; i < getSortByDescElements.length; i++) {
      getSortByDescElements[i].addEventListener("click", e => {
        let sortBy = e.target.getAttribute("name");

        sortDescending(this.articlesArray, sortBy);
        this.displayArticles();

        //Add active class on clicked sort icon (element)
        let active = document.querySelectorAll(".active");
        if (active.length > 0) {
          active[0].className = active[0].className.replace("active", "");
        }
        getSortByDescElements[i].classList.add("active");
      });
    }

    function sortDescending(array, sortBy) {
      array.sort(function(a, b) {
        //If number
        if (Math.floor(a[sortBy] % 1) == 0 && Math.floor(b[sortBy] % 1 == 0)) {
          return b[sortBy] - a[sortBy];
        }
        // If string
        else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      return array;
    }
  }
} // EOF sortArticles

/** CREATE NEW ARTICLES : FUNCTION **/
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

/** HANDLE STYLESHEET : STYLESHEET FOR td WIDTH **/
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

/** HANDLE STYLESHEET : CLASS  :: STYLESHEET FOR POPUP BOX -> CREATE NEW ARTICLE FORM **/
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

    // Hide popUp overlay
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

/** FORM VALIDATION **/
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
