import React, { useState, useEffect } from "react";
import Country from "./components/Country";
import axios from "axios";
import CountryData from "./components/CountryData";
/////////////////////////////////////

const Input = ({ text, value, onChange }) => {
  return (
    <div>
      {text}
      <input value={value} onChange={onChange} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const countriesFiltered = countries.filter(
    (c) => c.name.common.toLowerCase().search(RegExp(filter)) >= 0
  );

  return (
    <>
      <Input
        text="find countries "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {countriesFiltered.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countriesFiltered.length > 1 &&
        countriesFiltered.length < 11 &&
        countriesFiltered.map((c) => {
          return (
            <div key={c.name.common}>
              <Country country={c} />
            </div>
          );
        })}
      {countriesFiltered.length === 1 && (
        <CountryData country={countriesFiltered[0]} />
      )}
    </>
  );
};

export default App;
