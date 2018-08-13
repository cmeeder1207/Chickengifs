
var chickenSound = document.createElement('audio')
chickenSound.setAttribute("src","assets/chicken - chicken.mp3")

$('.chicken').on("click",function(){chickenSound.play()});

var wonkaSound = document.createElement('audio')
wonkaSound.setAttribute("src","assets/wonka.mp3")

$('.wonka').on("click",function(){wonkaSound.play()});

var thomasSound = document.createElement('audio')
thomasSound.setAttribute("src","assets/thomas.mp3")

$('.thomas').on("click",function(){thomasSound.play()});

var kermitSound = document.createElement('audio')
kermitSound.setAttribute("src","assets/kermit.mp3")

$('.kermit').on("click",function(){kermitSound.play()});



  // Initial array of movies
  var movies = ["Kermit The Frog", "Thomas The Engine", "Chicken", "The Truman Show"];

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayMovieInfo() {

    var term=$(this).attr("data-name");
  //
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + term;


    


   // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // After the data from the AJAX request comes back
    .then(function(response) {
    console.log(response) 
    // Saving the image_original_url property
      var stillUrl = response.data.images.fixed_height_still.url;
      var moveUrl = response.data.images.fixed_height.url;

      // Creating and storing an image tag
      var catImage = $("<img class='img-responsive kitty' style='height: 300px;'>");

      // Setting the catImage src attribute to imageUrl
      catImage.attr("src", stillUrl);
      catImage.attr("data-still", stillUrl);
      catImage.attr("data-animate", moveUrl);
      catImage.attr('data-state', "still");
      catImage.attr("alt", "cat image");

      // Prepending the catImage to the images div
      $("#images").prepend(catImage);
    });
};

$(document).on('click', function(){
  var state = $(this).attr('data-state');
  var moving = $(this).attr('data-animate');
  var still = $(this).attr('data-still');

  if(state === "still"){
    $(this).attr('src', moving);
    $(this).attr('data-state', 'animate');
  }
  else{
    $(this).attr('src', still);
    $(this).attr('data-state', 'still');
  }
})


  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("movie-btn btn btn-danger ml-4 mb-3");
      // Adding a data-attribute
      a.attr("data-name", movies[i]);
      // Providing the initial button text
      a.text(movies[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var movie = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
