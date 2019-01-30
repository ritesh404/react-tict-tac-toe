import React from "react";

const Footer = ({ onReset }) => (
  <div>
    <button className="button is-link" onClick={onReset}>
      Reset Game
    </button>
  </div>
);

export default Footer;
