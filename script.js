//global variables
var apiKey = "6c8bace821ea4c6237ba931d1ab4ccf9";
var placesArr = [];

// all functions
init();
//weather function
function weatherApi(city) {
    var queryURL = " http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".temp").text(response.main.temp + "°F");
        $(".humidity").text(response.main.humidity);
        $(".wind-speed").text(response.wind.speed);
        uvIndex(response.coord.lat, response.coord.lon);
    })
}

function forecastApi(city) {
    var queryURL = " http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var forecast = response.list.filter(function (element) {
            return (element.dt_txt.split(" ")[1] === "15:00:00")
        });
        $(".temp1").text(forecast[0].main.temp);
        $(".temp2").text(forecast[1].main.temp);
        $(".temp3").text(forecast[2].main.temp);
        $(".temp4").text(forecast[3].main.temp);
        $(".temp5").text(forecast[4].main.temp);
        $(".humidity1").text(forecast[0].main.humidity);
        $(".humidity2").text(forecast[1].main.humidity);
        $(".humidity3").text(forecast[2].main.humidity);
        $(".humidity4").text(forecast[3].main.humidity);
        $(".humidity5").text(forecast[4].main.humidity);
        var iconCode1 = forecast[0].weather[0].icon;
        var iconCode2 = forecast[1].weather[0].icon;
        var iconCode3 = forecast[2].weather[0].icon;
        var iconCode4 = forecast[3].weather[0].icon;
        var iconCode5 = forecast[4].weather[0].icon;
        var iconURL1 = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
        var iconURL2 = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
        var iconURL3 = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
        var iconURL4 = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
        var iconURL5 = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
        $(".icon1").attr("src", iconURL1);
        $(".icon2").attr("src", iconURL2);
        $(".icon3").attr("src", iconURL3);
        $(".icon4").attr("src", iconURL4);
        $(".icon5").attr("src", iconURL5);
    })

    $(".data-input").val("");

}
function forecastDate(city) {
    var queryURL = " http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var forecast = response.list.map(function (element) {
            return (element.dt_txt.split(" ")[0])
        });
        $(".date1").text(forecast[2]);
        $(".date2").text(forecast[10]);
        $(".date3").text(forecast[19]);
        $(".date4").text(forecast[30]);
        $(".date5").text(forecast[38]);

    })
}


//uv function
function uvIndex(lat, lon) {
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var uvIndex = response.value;
        $(".uv-index").text(uvIndex)

        if (uvIndex <= 3) {
            $(".uv-index").css("background-color", "green")
            $(".uv-index").css("padding", "5px")
            $(".uv-index").css("color", "white")
        }
        else if ((uvIndex > 4) && (uvIndex <= 7)) {
            $(".uv-index").css("background-color", "yellow")
            $(".uv-index").css("padding", "5px")
        }
        else if (uvIndex > 8) {
            $(".uv-index").css("background-color", "red")
            $(".uv-index").css("padding", "5px")
        }
    })
}

function renderPastSearchList() {
    $(".past-search").empty();
    for (var p = 0; p < placesArr.length; p++) {
        var placeDiv = $("<div>");
        placeDiv.attr("value", [p]);
        placeDiv.addClass("past-search-list");
        placeDiv.text(placesArr[p]);
        placeDiv.css("border-style", "solid");
        placeDiv.css("border-color", "#E0E3E7");
        placeDiv.css("padding", "5px");
        placeDiv.css("background-color", "white");
        $(".past-search").append(placeDiv);
    }
}

function saveLocalStorage(){
    localStorage.setItem("placesArr", JSON.stringify(placesArr));
}

function init(){
    var storedCities = JSON.parse(localStorage.getItem("placesArr"));
    if (storedCities !==null){
        placesArr = storedCities;
        renderPastSearchList();
    }
}

//click events
$(".submit-button").on("click", function (event) {
    event.preventDefault();
    var userInput = $(".data-input").val().trim();
    if(userInput===""){
        return;
    }
    placesArr.push(userInput);
    $(".city-name").text(userInput);
    weatherApi(userInput);
    forecastApi(userInput);
    forecastDate(userInput);
    renderPastSearchList();
    saveLocalStorage();
})


$(document).on("click", ".past-search-list", function(){
    var userInput= $(this).text().trim();
    $(".city-name").text(userInput);
    weatherApi(userInput);
    forecastApi(userInput);
    forecastDate(userInput);
    renderPastSearchList(userInput);
    localStorage.getItem(JSON.parse("cities"))
})

