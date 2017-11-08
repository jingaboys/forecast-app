/**
 * Your forecast.io key: c729b061493463872cfdafd023e452c6
 * Your forecast URL: https://api.forecast.io/forecast
 * Your google maps URL: http://maps.googleapis.com/maps/api/geocode/json?address=
 *
 */

function getWeather() {
    var suburb = document.getElementById("location").value;
    var locationUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${suburb}`;
    var weatherUrlBase = `https://api.darksky.net/forecast/c729b061493463872cfdafd023e452c6`;

    fetch(locationUrl).then((response) => {
        return response.json()
    }).then((dataAsJson) => {
        return dataAsJson.results[0].geometry.location
    }).then((mylocation) => {
        console.log(mylocation)
        var forecastUrl = `${weatherUrlBase}/${mylocation.lat},${mylocation.lng}?units=si`
        fetch(forecastUrl).then((response) => {
            return response.json()
        }).then((dataAsJson) => {
            var forecastResult = document.getElementById("forecast-result")
            forecastResult.style.visibility = "visible"
            forecastResult.innerHTML = `In <strong>${suburb}</strong> (${mylocation.lat}, ${mylocation.lng}) the weather is <strong>${dataAsJson.currently.summary}</strong> and the temperature is <strong>${dataAsJson.currently.temperature}</strong> degrees Celsius.`
        })
    })
}
