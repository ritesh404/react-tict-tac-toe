import React from "react";

//TODO: Add Reset Button
const Footer = ({ onReset }) => (
  <div>
    <button className="button is-link" onClick={onReset}>
      Reset Game
    </button>
  </div>
);

export default Footer;
