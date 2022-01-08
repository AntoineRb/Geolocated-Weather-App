import { cityApiKey, geolocateApiKey } from "./apiKey.js";
import { metersSecondToKmh } from "./utils.js"
import * as elem from "./elements.js";

let city            = '';
let citySave        = '';

let units           = 'metric';
let url = '';

let userLatitude;
let userLongitude;

export let userIsGeolocate = false;

export function checkGeolocation() {
    if( 'geolocation' in navigator ) {
        navigator.geolocation.watchPosition( ( position ) => {
            const lat  = position.coords.latitude;
            const long = position.coords.longitude;
            updateUserPosition( true, lat, long );
        });
    }
}

export function updateUserPosition( isGeolocate, lat = 0, long = 0 ) {
    if ( isGeolocate ) {
        userLatitude    = lat;
        userLongitude   = long;
        userIsGeolocate = true
        weatherInfo();
    } else { // If user is not Geolocate
        userIsGeolocate = isGeolocate;
    }
}

export function locationError( newCity ) {
    setNewCity( newCity );
    weatherInfo();
}

export function setNewCity( cityToDisplay ) {
    citySave = city;
    city     = cityToDisplay;
}

export async function weatherInfo() {

    if ( !userIsGeolocate ) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${cityApiKey}&units=${units}`;
    } else if ( userIsGeolocate ) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=${geolocateApiKey}&units=${units}`
    }
    

    const callApi = await fetch( url, {
        method: 'GET'
    });

    if ( !callApi.ok ) {
        alert( 'An error has occured !' );
        setNewCity( citySave );
    } else {
        const data = await callApi.json();
        const wind = metersSecondToKmh(data.wind.speed).toFixed(2);
        elem.tempLabel.textContent = data.main.temp;
        elem.windLabel.textContent = wind;
        elem.cityLabel.textContent = data.name;
    }
}