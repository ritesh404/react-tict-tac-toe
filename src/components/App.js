import React from "react";
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

// TODO: Get rid of prop drilling (Use redux or react Context)
const App = ({
  currentPlayer,
  setCurrentPlayer,
  board,
  setBoard,
  gameState,
  setGameState
}) => (
  <div className="App">
    <Header currentPlayer={currentPlayer} />
    <div className="game-section">
      {gameState.cata({
        Playable: _ => (
          <GameBoard
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            gameState={gameState}
            setGameState={setGameState}
          />
        ),
        Win: player => `${player} Won!`,
        Draw: _ => "Its a Draw!"
      })}
    </div>

    <Footer
      onReset={_ => {
        setGameState(GameState.Playable);
        setBoard(defaultBoard);
      }}
    />
  </div>
);

export default enhance(App);
