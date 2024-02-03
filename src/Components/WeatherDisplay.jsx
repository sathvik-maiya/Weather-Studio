import React from 'react'
import "./WeatherDisplay.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet , faTemperatureArrowUp  ,faTemperatureArrowDown, faWind} from '@fortawesome/free-solid-svg-icons';


function WeatherDisplay({ weatherData, unit }) {
  return (
    <div className='cont1'>

       {/* Fetching city name,temperature,description along with an appropriate weather icon */}
       {weatherData.main && (
          <div>
           <span className='today'>Today</span>
           <div className='city'>{weatherData.name}</div>
           <p className='temperature'>{Math.round(weatherData.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
           </p>
           <p className='desc'>{weatherData.weather[0].description}       <img
           className='weather-logo'
           src={weatherData.weather[0].icon
           ? require(`../images/${weatherData.weather[0].icon}.svg`)
           : require('../images/01d.svg')
           }
           alt='sunlogo'
           /> </p>
           </div>
          )}


          {/* Fetching Humidity,Max and Min Temperature */}
    <div className='cont2'>
          <div>
           {weatherData.main &&( 
          <div >
            <p className='humidity'>Humidity: {weatherData.main.humidity}%<FontAwesomeIcon icon={faDroplet} className='humi-image'/></p>
            <p className='humidity'>Max Temperature: {Math.round(weatherData.main.temp_max)}°{unit === 'metric' ? 'C' : 'F'}<FontAwesomeIcon icon={faTemperatureArrowUp} className='humi-image'/></p>
            <p className='humidity'>Min Temperature: {Math.round(weatherData.main.temp_min)}°{unit === 'metric' ? 'C' : 'F'}<FontAwesomeIcon icon={faTemperatureArrowDown} className='humi-image'/></p>
    
          </div>
        )}
    </div>
      {/* Fetching wind direction and wind speed */}
    <div>
         {weatherData.wind  &&( 
          <div>
            <p className='humidity'>Wind Direction: {weatherData.wind.deg}°</p>
            <p className='humidity'>Wind Speed: {weatherData.wind.speed} m/s<FontAwesomeIcon icon={faWind} className='humi-image'/></p>
          </div>
        )}
</div>
    </div>
       

    </div>
  )
}

export default WeatherDisplay
