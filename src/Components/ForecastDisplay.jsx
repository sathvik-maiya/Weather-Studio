import React from 'react'
import "./ForecastDisplay.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

function ForecastDisplay({ forecastData, unit }) {
  return (
    <div className='cont3'>
        {forecastData.length > 0 && (
          <div className='cont4'>
            {forecastData.map((forecastItem) => (
              <div key={forecastItem.dt} className='cont5'> 

                {/* Fetching date in en-US fromat*/}
                 <p className='date'>{new Date(forecastItem.dt * 1000).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</p>

              {/* Fetching average temparature for a single day */}
                <p className='avgtemp'> Avg Temperature: {Math.round(forecastItem.main.temp)}°{unit === 'metric' ? 'C' : 'F'}<FontAwesomeIcon icon={faTemperatureHigh} className='avg-image'/></p>
              
               {/* Fetching description along  with an appropriate weather icon */}

                <p className='for-desc'>{forecastItem.weather[0].description} 
                     <img className='weather-for-logo' src={forecastItem.weather[0].icon
                                                ? require(`../images/${forecastItem.weather[0].icon}.svg`)
                                                : require('../images/01d.svg')
                                                      }
                                         alt='sunlogo'
                                       />
                        </p>
       
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default ForecastDisplay
