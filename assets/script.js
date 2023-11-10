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
});