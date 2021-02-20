const weather = document.querySelector(".js-weather");

const WEATHER_API = "b41c4b8103479cf05554255b26d02a69";
const COORDS = "coordinates";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API}&units=metric`
    )
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}°C @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError()   {
    console.log("Can't get geo location.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoLocation, handleGeoError);
}

function loadCoords()  {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}



function init() {
    loadCoords();
}

init();
