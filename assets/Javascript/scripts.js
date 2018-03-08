var topics = ["Bleach", "Tokyo Ghoul", "Haikyuu!", "Shokugeki no Souma", "Your Lie In April", "Gundam", "Sword Art Online", "Dragon Ball Z", "Death Parade", "Pokemon"];
var newTopic;
var results;
printBtn();
displayGifs();
$(document).on("click", ".newGif", pausePlayGifs)

$("#add-category").on("click", function(e) {
  event.preventDefault();
  newTopic = $("#new-category")
    .val()
    .trim();
  topics.push(newTopic);
  printBtn();
  displayGifs();
  console.log(newTopic);
});

function displayGifs() {
  $(".btn-md").on("click", function(e) {
    $("#gifs").empty();
    var topic = this.id;
    topic = topic.replace(/ /g, "-");
    console.log(topic);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&r=&api_key=SMayeNAw6IGmJ6rhSdoHHNNp4gus4Q5m";
    
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        for (var i = 0; i < 10; i++) {
        console.log(response);
        results = response.data[i];
        console.log(results);

        var newGif = $("<div class='newGif'>");

        var rating = results.rating;
        var animatedSrc = results.images.fixed_height.url;
        var staticSrc = results.images.fixed_height_still.url;
        var Image = $("<img>");
        var p = $("<p>").text("Rating: " + rating);

        Image.attr("src", staticSrc);
        Image.addClass("newGif");
        Image.attr("data-state", "still");
        Image.attr("data-still", staticSrc);
        Image.attr("data-animate", animatedSrc);
        newGif.append(p);
        newGif.append(Image);
        $("#gifs").prepend(newGif);
        }
      });
    ;
    
  });
};

function printBtn() {
  $("#btns-holder").empty();

  for (var i = 0; i < topics.length; i++) {
    var btns = $("<button>");
    $(btns)
      .attr({
        type: "button",
        id: topics[i],
        class: "btn btn-info btn-md"
      })
      .text(topics[i]);
    $("#btns-holder").append(btns);
  };
};

function pausePlayGifs(){
  if ($(this).attr('data-state') === 'still'){
    $(this).attr('data-state', 'animate');
    var move = $(this).attr('data-animate');
    $(this).attr('src', move);
    console.log(this);
  }
  else {
    var stop = $(this).attr('data-still');
    $(this).attr('data-state', 'still');
    $(this).attr('src', stop);
  };
};
