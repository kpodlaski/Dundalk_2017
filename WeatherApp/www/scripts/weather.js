var OWAppKey = "64c7b98c91f425ed4bd193334c0bd9d6";


function watherZipCode() {
    var zip = $('#zip-code-input').val();
    $('#download-data-btn').click(watherZipCode);
    var adres =
      'http://api.openweathermap.org/data/2.5/weather?zip='
      + zip + ',pl&appid=' + OWAppKey +'&units=metric';
    console.log('adres ' + adres);
    $.getJSON(adres, function (results) {

        showWeather(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("ERROR :( " + jqXHR.statusText);
    });

    return false;
}

function showWeather(results) {
    var iconURL = 'http://openweathermap.org/img/w/';
    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#name').text(results.name);
        $('#temp').text(results.main.temp);
        $('#pressure').text(results.main.pressure);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $("#weather-icon").attr("src", iconURL + results.weather[0].icon + '.png');
        console.log(iconURL + results.weather[0].icon + '.png');
        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#srise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("ERROR. ");
    }
}

function weatherGPS() {

    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
      { enableHighAccuracy: true });

    /*var options = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true,
    }

    var watchID = navigator.geolocation.watchPosition(onGetLocationSuccess, onGetLocationError, options);
    Console.log(watchID);
    */
    $('#error-msg').show();
    $('#error-msg').text('Obtaining GPS data...');

    $('#download-data-btn').prop('disabled', true);
}
function onGetLocationSuccess(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var adres =
      'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + OWAppKey + '&units=metric';
    console.log('adres ' + adres);

    $.getJSON(adres, function (results) {

        showWeather(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });

}
function onGetLocationError(error) {

    $('#error-msg').text('Error getting location');
}