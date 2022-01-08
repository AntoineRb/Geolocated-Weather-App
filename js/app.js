import { setNewCity, weatherInfo, updateUserPosition, checkGeolocation,userIsGeolocate  } from './modules/callApi.js';
import { checkUserInput} from './modules/utils.js';


checkGeolocation();

if ( !userIsGeolocate ) {
    setNewCity( 'Paris' );
    weatherInfo();
}

document.querySelector('#change').addEventListener('click', () => {
    updateUserPosition(false)
    let newCity = prompt("Choisissez une ville !");
    newCity = checkUserInput( newCity );
    setNewCity( newCity );
    weatherInfo();
});