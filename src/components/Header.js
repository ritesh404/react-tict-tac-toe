import React from "react";
import { playerToString } from "../lib/helpers";

const Header = ({ currentPlayer, gameState }) => (
  <div className="header">
    {gameState.cata({
      Playable: _ => `Current Player: ${playerToString(currentPlayer)}`,
      Win: _ => "Congratulations!",
      Draw: _ => "Game has concluded!"
    })}
  </div>
);

export default Header;
