import axios from "axios";
import React, { useState, useEffect } from "react";

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState({});

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${api_key}`
      )
      .then((res) => {
        setWeather({
          temp: res.data.main.feels_like,
          speed: res.data.wind.speed,
          deg: res.data.wind.deg,
          description: res.data.weather[0].description,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="150" />
      <h3>Weather at {country.capital[0]}</h3>
      <p>
        <b>Temperature:</b> {weather.temp} Celcius
      </p>
      <p>
        <b>Description:</b> {weather.description}
      </p>
      <p>
        <b>Wind:</b> {weather.speed} kmph <b>Direction:</b> {weather.deg}
      </p>
    </>
  );
};

export default CountryData;
