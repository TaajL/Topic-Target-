let ytBox = document.getElementById("youtube-box");
let wkBox = document.getElementById("wiki-box");
let DeleteBtn = document.getElementById("delete-button");

// function display save list from local storage
function displayLists() {
  let saveYtItems = localStorage.getItem("youtube");
  let saveWkItems = localStorage.getItem("wiki");
  let saveYtData = JSON.parse(saveYtItems);
  let saveWkData = JSON.parse(saveWkItems);

  for (let i = 0; i < saveYtData.length; i++) {
    let youtubeCard = document.createElement("div");
    let ytTitleEl = document.createElement("h4");
    let youtubeIdEl = document.createElement("a");
    let ytThumbnailEl = document.createElement("img");

    let ytTitle = saveYtData[i].snippet.title;
    let ytThumbnail = saveYtData[i].snippet.thumbnails.high.url;
    let youtubeId = saveYtData[i].id.videoId;

    ytTitleEl.textContent = ytTitle;
    ytThumbnailEl.src = ytThumbnail;
    youtubeIdEl.href = `https://www.youtube.com/watch?v=${youtubeId}`;

    ytBox.appendChild(youtubeCard);
    youtubeCard.append(ytTitleEl, youtubeIdEl);
    youtubeIdEl.append(ytThumbnailEl);
  }
  for (let i = 0; i < saveWkData.length; i++) {
    // console.log(ytTitle);
    let wikiCard = document.createElement("div");
    let wikiTitleEl = document.createElement("h4");
    let wikiIdEl = document.createElement("a");

    let wikiTitle = saveWkData[i].title;
    let wikiId = saveWkData[i].pageid;

    wikiTitleEl.textContent = wikiTitle;
    wikiIdEl.href = `http://www.wikipedia.org/?curid=${wikiId}`;
    wikiIdEl.textContent = `http://www.wikipedia.org/?curid=${wikiId}`;

    wkBox.appendChild(wikiCard);
    wikiCard.append(wikiTitleEl, wikiIdEl);
  }
}

// call deleteAll function when click
DeleteBtn.addEventListener("click", deleteAll);

// delete all save list in Local storage
function deleteAll() {
  localStorage.removeItem("youtube");
  localStorage.removeItem("wiki");
  location.reload();
}

displayLists();
