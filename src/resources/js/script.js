//
// server.js
//

var resultsContainer = document.getElementById("results_container");

function searchMovies() {
  
  // retreive + sanitize user input
  var searchText = document
    .getElementById("search_text")
    .value.trim()
    .replace(/ /g, "+")
    .toLowerCase();

  // omdb api url
  var url = `https://www.omdbapi.com/?apikey=979aac39&t=${searchText}&type=movie`;

  $.ajax({ url: url, dataType: "json" }).then(function (data) {
    if (data.Response == "False") {
      document.getElementById("error_message").innerHTML =
        '<div class="alert alert-secondary alert-dismissible fade show"><strong>Error:</strong> No movies found! Try another search</div>';
      return;
    } else {
      document.getElementById("error_message").innerHTML = "";
    }

    // empty cards variable
    var cards = "";

    // movie variables
    var movieName = data.Title;
    var moviePoster = data.Poster;
    var movieActors = data.Actors;
    var movieGenre = data.Genre;
    var moviePlot = data.Plot;
    var releaseDate = data.Released;

    // ratings
    var movieRatingImdb = data.Ratings[0].Value;
    var movieRatingRt = data.Ratings[1].Value;
    var movieRatingMeta = data.Ratings[2].Value;

    // this is where the movie card is rendered
    cards += `
      		<div class="card mb-4 border-0" >
      			<div class="row no-gutters">
      				<div class="col-md-4">
              <br>
      					<img src="${moviePoster || "-"} class="card-img float-right" style="max-width:260px">
      				</div>

      				<div class="col-md-7">
      					<div class="card-body">

      						<h4 class="card-title movie-title">${movieName || "-"}</h4>
							
      						<h6 class="card-title">Cast</h6>
      						<p class="card-text mb-16">${movieActors || "-"}</p>
					
      						<h6 class="card-title">Genre</h6>
      						<p class="card-text mb-16">${movieGenre || "-"}</p>

      						<h6 class="card-title">Plot</h6>
      						<p class="card-text mb-16">${moviePlot || "-"}</p>

      						<h6 class="card-title">Release Date</h6>
      						<p class="card-text mb-16">${releaseDate || "-"}</p>

      						<h6 class="card-title">Ratings</h6>
      						<p class="card-text">Internet Movie Database: ${movieRatingImdb|| "-"}</p>
                  <p class="card-text">Rotten Tomatoes: ${movieRatingRt|| "-"}</p>
                  <p class="card-text">Metacritic: ${movieRatingMeta|| "-"}</p>
      						<br>
                  <a href="#movie_modal" id="modal_button" class="btn btn-primary btn-sm float-left" data-toggle="modal">Add Review</a>
      						<br>
      					</div>
      				</div>
      			</div>
      		</div>`;

    resultsContainer.innerHTML = cards;
  });
}

// get search_button off the dom
var searchButton = document.getElementById("search_button");

// search movies button
searchButton.addEventListener("click", function () {
  searchMovies();
});

// load currMovie variable
resultsContainer.addEventListener("click", function (event) {
  var currMovie = event.target.parentElement.children[0].innerText;
  var modalMovieName = document.getElementById("movie_name");
  modalMovieName.value = currMovie;
});
