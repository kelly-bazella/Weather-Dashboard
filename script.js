<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    var userInput = $(".user-input").val()
    var apiKey="6c8bace821ea4c6237ba931d1ab4ccf9"
    var queryURL = " http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&APPID=" + apiKey
    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(response){

    })