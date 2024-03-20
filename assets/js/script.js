let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');
startSearchBtn.onclick = function() {
  modalBox.style.display = 'none';
}




searchBtn.addEventListener('click', search);
function search() { 
  let wikiSearch = document.getElementById('userInput').value;

fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${wikiSearch}&utf8=&format=json`)
  .then(response => response.json())
  .then(data => {
    const searchResults = data.query.search;
    let resultList = '';

    searchResults.forEach(item =>{
      resultList += `<li><a href="https://en.wikipedia.org/?curid=${item.pageid}" target="_blank`
    })
  })




}

