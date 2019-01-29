import React, { Component } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import Footer from "./Footer";
import { withState, compose } from "recompose";
import { defaultBoard, Player, GameState } from "../lib/constants";

const enhance = compose(
  withState("currentPlayer", "setCurrentPlayer", Player.X),
  withState("board", "setBoard", defaultBoard),
  withState("gameState", "setGameState", GameState.Playable)
);

// TODO: Get rid of prop drilling (Use redux)
const App = ({ currentPlayer, setCurrentPlayer, board, setBoard }) => (
  <div className="App">
    <Header currentPlayer={currentPlayer} />
    <GameBoard
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
    />
    <Footer />
  </div>
);

export default enhance(App);
