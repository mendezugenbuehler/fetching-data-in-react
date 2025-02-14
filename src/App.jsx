import { useState, useEffect } from 'react'
import './App.css'
import * as weatherService from './services/weatherService';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';

const App = () => {
  const [weather, setWeather] = useState({});

  const fetchData = async (city) => {
    const data = await weatherService.show(city);  // Fix here, use the 'city' parameter
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    };
    setWeather(newWeatherState);
  };
  console.log('State', weather);

  useEffect(() => {
    const fetchDefaultData = async () => {
      const data = await weatherService.show('New York');
      const newWeatherState = {
        location: data.location.name,
        temperature: data.current.temp_f,
        condition: data.current.condition.text,
      };
      setWeather(newWeatherState);
    };

    fetchDefaultData();
  }, []);

  return (
    <main>
      <h1>Weather API</h1>
      <WeatherSearch fetchData={fetchData} /> {/* Pass fetchData as a prop */}
      <WeatherDetails weather={weather} />
    </main>
  );
};

export default App;
