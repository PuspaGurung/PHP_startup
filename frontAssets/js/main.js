//Create Article
function handleCreateArticle(formData) {
  let data = new FormData(formData);
  console.log(formData.action);
  fetch(formData.action, {
      method: formData.method,
      body: data
    })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById('article-table').innerHTML = data.message;
      //Empty the form after submit 
      document.getElementById('submit-article').reset();
    })
    .catch((err) => console.log(err))
  return false; //prevent form from posting (element.preventDefault())
}