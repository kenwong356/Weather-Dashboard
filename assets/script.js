var apiKey = "3a2f992d7c98ad42c73c60a1d0a1aacb";
$(document).ready(function () {
    $("#search-button").on("click", function () {
      var searchTerm = $("#search-value").val();
      $("#search-value").val("");
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    });
  
    $("#clear-history").on("click", function () {
      history = [];
      localStorage.removeItem("history");
        $(".history").empty();
    });
  
    var history = JSON.parse(localStorage.getItem("history")) || [];
      function createRow(text) {
      var listItem = $("<li>").addClass("list-group-item").text(text);
      $(".history").append(listItem);
    }
  
  for (var i = 0; i < history.length; i++) {
        createRow(history[i]);
      }
    $(".history").on("click", "li", function () {
      weatherFunction($(this).text());
      weatherForecast($(this).text());
    });
    
    function createRow(searchTerm) {
      var capitalizedCity = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1); 
      var historyList = $(".history");
      if (!historyList.find("li:contains(" + capitalizedCity + ")").length) {
          var listItem = $("<li>").addClass("list-group-item").text(capitalizedCity);
            historyList.append(listItem);
      }
  }


  function showError(message) {
    var errorMessage = $("<div>").addClass("alert alert-danger").text(message);
    $(".error-message").empty().append(errorMessage);
    setTimeout(function () {
      $(".error-message").empty();
    }, 1000); 
  }

  function weatherFunction(searchTerm) {
    if (!searchTerm) {
      showError("Please enter a valid city.");
      return;
    }
    $.ajax({
        method: "GET",
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey,
    

        }).then(function (data) {
          $("#today").empty();
    
          var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
          var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
          var card = $("<div>").addClass("card");
          var cardBody = $("<div>").addClass("card-body");
          var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
          var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
          var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
          title.append(img);
          cardBody.append(title, temp, humid, wind);
          card.append(cardBody);
          $("#today").append(card);
          console.log(data);
        });
    }
    
    function weatherForecast(searchTerm) {
        $.ajax({
        method: "GET",
          url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + apiKey + "&units=imperial",
        }).then(function (data) {
          console.log(data);
          $("#forecast").html("<div class=\"forecast-container\">");
      
          var heading = $("<h2>").text("5 Day Forecast:");
          $("#forecast .forecast-container").append(heading);
          var cardRow = $("<div>").addClass("row");
      
          for (var i = 0; i < data.list.length; i++) {
              if (new Date(data.list[i].dt_txt).getHours() === 15) {
    
              var titleFive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
              var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
              var colFive = $("<div>").addClass("col-md-2.5");
              var cardFive = $("<div>").addClass("card bg-primary text-white");
              var cardBodyFive = $("<div>").addClass("card-body p-2");
              var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
              var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
              var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[i].wind.speed + " mph");
      
              colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, windSpeed, humidFive)));
              cardRow.append(colFive);
            }
          }
      
          $("#forecast .forecast-container").append(cardRow);  
        });
}
});