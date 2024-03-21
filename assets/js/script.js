let modalBox = document.getElementById('modal');
let startSearchBtn = document.getElementById('start-search');
const searchBtn = document.getElementById('search-button');
let returnBtn = document.getElementById('returnToSearchBtn');
let ytResultBox = document.getElementById('youtubeResultBox');
let wkResultBox = document.getElementById('wikiResultBox');

// close modal
startSearchBtn.addEventListener('click', function() {
  modalBox.style.display = 'none';
})

// go back without modal pop up
// returnBtn.onclick = function() {
// location.href = './index.html';
//   modalBox.style.display = 'none';
// }

// promise both output
function search() {
  let searchInput = document.getElementById('userInput').value;
  const youtube = fetchYoutubeApis(searchInput);
  const wiki = fetchWikiapi(searchInput);
  Promise.all([youtube, wiki])
    .then(data => {
      displayResults(data);
    })
}

// call search function when click
searchBtn.addEventListener('click', search);

// fetch wikipedia apis
function fetchWikiapi(searchInput) { 
return fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchInput}&format=json&origin=*`)
  .then(response => response.json())
  .then(data => { 
    // console.log(data);
    // console.log(data.query.search[0].title);
    // console.log(data.query.search[0].pageid);
    return data;

    })
}


// fetch youtube apis
function fetchYoutubeApis(searchInput) {
  let apiYoutube = 'AIzaSyCV46klfioEfdLOWaLJkxt9U3hk1tGGE_Q';
  let youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiYoutube}&type=video&part=snippet&maxResults=10&q=${searchInput}`;

  return  fetch (youtubeUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      // console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log('ERROR Unable to connect');
      
    });
  };
  
  // display both results
  function displayResults(data) {
    if (data.length === 0) {
      console.log('No data found!');
    } else {
      for (let i = 0; i < 10; i++) {
        // let cardIndex = i;
        let ytTitleEl = document.createElement('p');
        let youtubeIdEl = document.createElement('a');
        let ytThumbnailEl = document.createElement('img');

        let wikiTitleEl = document.createElement('h4');
        let wikiIdEl = document.createElement('a');
        
        let addListBtn = document.createElement('button');
        
        let ytTitle = data[0].items[i].snippet.title;
        let ytThumbnail = data[0].items[i].snippet.thumbnails.high.url;
        let youtubeId = data[0].items[i].id.videoId;
        let wikiTitle = data[1].query.search[i].title;
        let wikiId = data[1].query.search[i].pageid;
        
        
        ytTitleEl.textcontent = ytTitle;
        ytThumbnailEl.src = ytThumbnail;
        youtubeIdEl.href = `https://www.youtube.com/watch?v=${youtubeId}`

        wikiTitleEl.textContent = wikiTitle;
        wikiIdEl.href = `http://www.wikipedia.org/?curid=${wikiId}`;
        wikiIdEl.textContent = `http://www.wikipedia.org/?curid=${wikiId}`;

        addListBtn.textContent = 'Save to List';

        ytResultBox.append(ytTitleEl, youtubeIdEl, addListBtn);
        youtubeIdEl.append(ytThumbnailEl);
        wkResultBox.append(wikiTitleEl, wikiIdEl, addListBtn);
        console.log(ytTitle);
        // console.log(wikiTitle);
        
      }
    }
    // http://en.wikipedia.org/?curid=
    
}

// call deleteAll function when click
DeleteBtn.addEventListener('click', deleteAll);

// delete all save list in Local storage
function deleteAll(){
  localStorage.clear();
}
