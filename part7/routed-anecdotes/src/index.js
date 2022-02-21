import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Footer from "./Components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <>
    <Router>
      <App />
    </Router>
    <br />
    <Footer />
  </>,
  document.getElementById("root")
);
