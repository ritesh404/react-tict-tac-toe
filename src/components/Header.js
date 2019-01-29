import React from "react";

const Header = ({ currentPlayer }) => (
  <div className="header">
    Current Player:{" "}
    {currentPlayer.cata({
      X: _ => "X",
      O: _ => "O"
    })}
  </div>
);

export default Header;
