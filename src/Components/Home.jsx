import React, { useState, useEffect } from 'react';
import logo from "../images/logo.png"
import error from "../images/error.png"
import WeatherDisplay from './WeatherDisplay.jsx';
import ForecastDisplay from './ForecastDisplay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

import './Home.css';


const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [errorPage ,setErrorPage]=useState(false);


  const handleSearch = () => {
    setSubmitButtonPressed(true);
  };

  // Handled unit changes for celsius and fahrenheit
const handleUnitChange = (selectedUnit) => {
  setUnit((prevUnit) => {
    if (prevUnit !== selectedUnit) {
      setSubmitButtonPressed(true);
    }
    return selectedUnit;
  });
}

// Handled Enter key press
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};

 useEffect(() => {

  // Fetching weather data
    const fetchWeatherData = async () => {

    try {
      
      const apiKey =process.env.REACT_APP_APIKEY;
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      ).then((resp) => resp.json());
      
    if (weatherResponse.cod && weatherResponse.cod !== 200) {

       toast.error("City does not exist ",{ className: 'foo-bar'});
       setErrorPage(true);
    }else{
setWeatherData(weatherResponse);
setErrorPage(false);
    }
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      
    }
  };

  // Fetching forecast Data

  const fetchForecastData = async () => {
    try {
      const apiKey = process.env.REACT_APP_APIKEY
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      ).then((resp) => resp.json());


      const uniqueDays = [];
      const filteredForecastData = forecastResponse.list.filter((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!uniqueDays.includes(date) ) {
          uniqueDays.push(date);
          return true;
        }
        return false;
      });

      setForecastData(filteredForecastData.slice(1, 6));
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };
    const fetchData = async () => {
      try {
        if (submitButtonPressed) {
          await fetchWeatherData();
          await fetchForecastData();
        }
        setSubmitButtonPressed(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [submitButtonPressed, unit, city]);

  return (
    <div className="weather-app">
     <div className='main-head'>
       <img src={logo} alt="logo" className='logo'/>
        <h1 className="heading">Weather Studio </h1>
      </div>
   <div className='search-module'>
   <div className='city-search'>
        <input
        className="input-city"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
          
      />
      <button className="search-button" onClick={handleSearch}>
       <FontAwesomeIcon icon={faSearch} />
      </button>
   </div>
   {
    (!errorPage && weatherData) &&
      <div className="unit-toggle">
      <div
        className={`toggle-option ${unit === 'metric' ? 'active' : ''}`}
        onClick={() => handleUnitChange('metric')}
          
      >
        °C
      </div>
      <div
        className={`toggle-option ${unit === 'imperial' ? 'active' : ''}`}
        onClick={() => handleUnitChange('imperial')} > °F
      </div>
    </div>
   }
       
   </div>
   {
 
    errorPage ? <div className='error'>
      <img src={error} alt="logo" className='errorimage'/>
     <div className='errortext'> No city exist's
      </div></div>:
      <div className='container'>
        <WeatherDisplay weatherData={weatherData} unit={unit}  />
        <ForecastDisplay forecastData={forecastData} unit={unit}  />
   </div>

   }
 
    </div>
  );
};

export default Home;
