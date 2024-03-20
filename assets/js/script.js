let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');
let searchInput = document.getElementById('userInput').value;

startSearchBtn.onclick = function() {
  modalBox.style.display = 'none';
}

function search() {
  fetchYoutubeApis();
  fetchWikiapi();
}


searchBtn.addEventListener('click', search);
function fetchWikiapi() { 
fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&utf8=&format=json`)
  .then(response => response.json())
  .then(data => {
    

    })
}






