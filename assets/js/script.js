let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');
let searchInput = document.getElementById('userInput');


// click to close the modal
startSearchBtn.onclick = function() {
  modalBox.style.display = 'none';
}

// fetch youtube apis
function fetchYoutubeApis(searchInput) {
  let apiYoutube = 'AIzaSyCV46klfioEfdLOWaLJkxt9U3hk1tGGE_Q';
  let youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&type=video&part=snippet&q=${searchInput}`;

  fetch (youtubeUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log('ERROR Unable to connect');
    });
};


searchBtn.addEventListener('click', search);
function search(){ let wikiSearch = document.getElementById('userInput').value
fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${wikiSearch}&utf8=&format=json`)}



