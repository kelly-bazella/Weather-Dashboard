//global variables
var apiKey = "6c8bace821ea4c6237ba931d1ab4ccf9"
// all functions

//weather function
function weatherApi(city) {
    var queryURL = " http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $(".temp").text(response.main.temp+"°F");
        $(".humidity").text(response.main.humidity);
        $(".wind-speed").text(response.wind.speed);
        uvIndex(response.coord.lat, response.coord.lon);
    })
}
//forecast
function forecastApi(city){
    var queryURL = " http://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var forecast = response.list.filter(function(element){
            return(element.dt_txt.split(" ")[1]==="15:00:00")
        });
        console.log(forecast);
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
        // console.log(forecast[0].weather[0].icon)
        // var iconURL = "http://openweathermap.org/img/w/"+iconCode+".png";
        // var iconCode = forecast[0].weather[0].icon;
        // $(".icon1").attr("src",iconURL);
    })
    $(".data-input").val("")
}

// function weatherIcon (iconCode){
//     for (var i = 0; i<=4;i++){
//         var iconCode = forecast[i].weather[0].icon
//     }
//     var iconURL = "http://openweathermap.org/img/w/"+iconCode+".png";
//     $.ajax({
//         url: iconURL,
//         method: "GET"
//     }).then(function (iconCode) {
//         var forecast = response.list.filter(function(element){
//             return(element.dt_txt.split(" ")[1]==="15:00:00")
//             $(".icon1").attr("src",iconCode)
//         }); 
        
//     })
// }

//uv function
function uvIndex(lat, lon){
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat="+lat+ "&lon="+lon;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".uv-index").text(response.value)
        $(".city-name").text(userInput)
    })
}
//click events
$("button").on("click", function (event) {
    event.preventDefault();
    var userInput = $(".data-input").val();
    $(".city-name").text(userInput);
    console.log(userInput)
    weatherApi(userInput);
    forecastApi(userInput);
    // weatherIcon();
})
