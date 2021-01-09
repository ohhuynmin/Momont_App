const weather = document.querySelector('.js-weather');
const COORDS= 'coords';
const API_KEY = '19be32c2da568a9364570e6547862420';


function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(response=>{
        return response.json(); 
    }).then(json=>{
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature}℃ @ ${place}`;
    })
    
}

function saveLocation(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj ={
        latitude: latitude,
        longitude: longitude
    }
    saveLocation(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log('Can not access geo location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        // getWeather(JSON.parse(localStorage.getItem(COORDS)).latitude,JSON.parse(localStorage.getItem(COORDS)).longitude);
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}
init();