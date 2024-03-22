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
    .catch(function () {
      Promise.all([fetchYoutubeBackup(), wiki])
      .then(data => {
        displayResults(data);
      })
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
      if (response.status < 400) {
        return response.json();
      }
      return youtubeBackupData;
    })
    .then(function (data) {
      
      // console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log('ERROR Unable to connect');
    });
  };
  
  function fetchYoutubeBackup() {
    return fetch('/assets/js/yt-data.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
  }
  
  // display both results
  function displayResults(data) {
    if (data.length === 0) {
      console.log('No data found!');
    } else {
      for (let i = 0; i < 10; i++) {
        let youtubeCard = document.createElement('div');
        let wikiCard = document.createElement('div');

        let ytTitleEl = document.createElement('h4');
        let youtubeIdEl = document.createElement('a');
        let ytThumbnailEl = document.createElement('img');
        let addYtListBtn = document.createElement('button');

        let wikiTitleEl = document.createElement('h4');
        let wikiIdEl = document.createElement('a');
        let addWikiListBtn = document.createElement('button');
        
        let ytTitle = data[0].items[i].snippet.title;
        let ytThumbnail = data[0].items[i].snippet.thumbnails.high.url;
        let youtubeId = data[0].items[i].id.videoId;
        let wikiTitle = data[1].query.search[i].title;
        let wikiId = data[1].query.search[i].pageid;
        
        
        ytTitleEl.textContent = ytTitle;
        ytThumbnailEl.src = ytThumbnail;
        youtubeIdEl.href = `https://www.youtube.com/watch?v=${youtubeId}`

        wikiTitleEl.textContent = wikiTitle;
        wikiIdEl.href = `http://www.wikipedia.org/?curid=${wikiId}`;
        wikiIdEl.textContent = `http://www.wikipedia.org/?curid=${wikiId}`;
        // http://en.wikipedia.org/?curid=

        addYtListBtn.textContent = 'Save to List';
        addWikiListBtn.textContent = 'Save to List';

        addYtListBtn.addEventListener('click', function() {
          console.log(data[0].items[i]);
        })

        addWikiListBtn.addEventListener('click', function() {
          console.log(data[1].query.search[i]);
        })

        youtubeCard.classList.add('card-box');
        wikiCard.classList.add('card-box');

        ytResultBox.append(youtubeCard);
        youtubeCard.append(ytTitleEl, youtubeIdEl);
        youtubeIdEl.append(ytThumbnailEl);
        youtubeCard.append(addYtListBtn);
        wkResultBox.append(wikiCard);
        wikiCard.append(wikiTitleEl, wikiIdEl, addWikiListBtn);
        // console.log(ytTitle);
        // console.log(wikiTitle);
        
      }
    }
    
}

// call deleteAll function when click
DeleteBtn.addEventListener('click', deleteAll);

// delete all save list in Local storage
function deleteAll(){
  localStorage.clear();
}

