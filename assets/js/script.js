let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');

startSearchBtn.onclick = function() {
  modalBox.style.display = 'none';
}

function search() {
  let searchInput = document.getElementById('userInput').value;
  const youtube = fetchYoutubeApis(searchInput);
  const wiki = fetchWikiapi(searchInput);
  Promise.all([youtube, wiki])
    .then(data => {
      displayResults(data);
    })
}

searchBtn.addEventListener('click', search);

function fetchWikiapi(searchInput) { 
return fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&format=json&origin=*`)
  .then(response => response.json())
  .then(data => { return data;
    

    })
}


// fetch youtube apis
function fetchYoutubeApis(searchInput) {
  let apiYoutube = 'AIzaSyCV46klfioEfdLOWaLJkxt9U3hk1tGGE_Q';
  let youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&type=video&part=snippet&q=${searchInput}`;

  return  fetch (youtubeUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log('ERROR Unable to connect');
    });
};

function displayResults(data) {
  //for (let i = 0; i < data.length; i++);
    let ytTitle = data[0].items[0].snippet.title;
    let ytThumbnail = data[0].items[0].snippet.thumbnails.high.url;
    console.log(ytTitle);
    console.log(ytThumbnail);
    console.log(data[0], data[1]);
    // http://en.wikipedia.org/?curid=
    
}



let DeleteBtn = document.getElementById('delete-button');
DeleteBtn.addEventListener('click', deleteAll);

function deleteAll(){
  localStorage.clear();
}
