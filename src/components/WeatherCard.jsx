import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Chennai");
  const [error, setError] = useState("");

  const allIcons = {
    "01d": assets.clear_Icon,
    "01n": assets.clear_Icon,
    "02d": assets.cloud_Icon,
    "02n": assets.cloud_Icon,
    "03d": assets.cloud_Icon,
    "03n": assets.cloud_Icon,
    "04d": assets.drizzle_Icon,
    "04n": assets.drizzle_Icon,
    "09d": assets.rain_Icon,
    "09n": assets.rain_Icon,
    "10d": assets.rain_Icon,
    "10n": assets.rain_Icon,
    "13d": assets.snow_Icon,
    "13n": assets.snow_Icon,
  };

  const search = async (city) => {
    try {
      setError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      const icon = allIcons[data.weather[0]?.icon] || assets.clear_Icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      search(city);
    }
  };

  return (
    <div className="weatherContainer">
      <div className="weatherSearch">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search"
        />
        <img
          src={assets.searchIcon}
          alt="Search"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weatherIcon" />
          <p className="weatherTemp">{weatherData.temperature}°C</p>
          <p className="weatherLocation">{weatherData.location}</p>
          <div className="weatherData">
            <div className="col">
              <img src={assets.humidity_Icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={assets.wind_Icon} alt="Wind Icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
