import reddit from "./redditapi";

let searchContainer = document.getElementById("search-container");
let search = document.getElementById("search");
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let button = document.querySelector("button");
let results = document.getElementById("results");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  results.innerHTML = null;
  let searchTerm = searchInput.value;
  let sortBy = document.querySelector('input[name="sortby"]:checked').value;
  let searchLimit = document.getElementById("limit").value;

  if (!searchTerm) {
    alertMessage("Please Input Valid Content", "alert-danger");
  }
  // fetch data
  fetchData(searchTerm, sortBy, searchLimit);
});

searchInput.addEventListener("focus", e => {
  e.preventDefault();
  searchInput.value = "";
});

function alertMessage(message, className) {
  let output = document.createElement("div");
  output.classList.add("alert", className);
  output.appendChild(document.createTextNode(message));
  searchContainer.insertBefore(output, search);

  // ban button
  button.disabled = "disabled";
  setTimeout(() => {
    searchContainer.removeChild(output);
    button.disabled = "";
  }, 3000);
}

function cutOffWords(words, num) {
  let shortended = words.indexOf(" ", num);
  if (shortended === -1) {
    return words;
  }
  return words.substring(0, shortended);
}

function fetchData(searchTerm, sortBy, searchLimit) {
  let cards = document.createElement("div");
  reddit.search(searchTerm, sortBy, searchLimit).then(data => {
    cards.classList.add("card-columns", "container");
    data.forEach(result => {
      let image = result.preview
        ? result.preview.images[0].source.url
        : "https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F1352860597%2Ficons%2Fon_color_large.png%3Fversion%3D0?ixlib=rails-2.1.3&w=240&h=240&auto=compress&s=14be39acc55fbe4638b776011273dfd5";
      let card = `
        <div class="card" style="width: 18rem;">
          <img src= "${image}"" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${result.title}</h5>
                <p class="card-text">${cutOffWords(result.selftext, 100)}</p>
                  <a href="${
                    result.url
                  }" target="_blank"  class="btn btn-primary">Read More</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit: ${
                    result.subreddit
                  }</span> 
                  <span class="badge badge-dark">Score: ${result.score}</span>
            </div>
        </div>
        `;
      cards.innerHTML += card;
      results.appendChild(cards);
    });
  });
}
