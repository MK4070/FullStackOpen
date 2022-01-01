import React, { useState } from "react";
import CountryData from "./CountryData";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {country.name.common + " "}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <CountryData country={country} />}
    </>
  );
};

export default Country;
