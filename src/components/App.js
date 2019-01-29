import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { withState, compose } from "recompose";
import { defaultBoard, Player, GameState } from "../lib/constants";
import GameSection from "./GameSection";

const enhance = compose(
  withState("currentPlayer", "setCurrentPlayer", Player.X),
  withState("board", "setBoard", defaultBoard),
  withState("gameState", "setGameState", GameState.Playable)
);

// TODO: Get rid of prop drilling (Use redux(or any state management tool) or react Context)
const App = ({
  currentPlayer,
  setCurrentPlayer,
  board,
  setBoard,
  gameState,
  setGameState
}) => (
  <div className="App">
    <Header currentPlayer={currentPlayer} gameState={gameState} />
    <GameSection
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
      gameState={gameState}
      setGameState={setGameState}
    />
    <Footer
      onReset={_ => {
        setGameState(GameState.Playable);
        setBoard(defaultBoard);
      }}
    />
  </div>
);

export default enhance(App);
