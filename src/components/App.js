import React, { Component } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import Footer from "./Footer";
import { withState, compose } from "recompose";
import {
  defaultBoard,
  Player,
  GameState,
  winningCells,
  NoPlayer
} from "../lib/constants";
import K from "fp-kudojs";
import * as R from "ramda";

const { Maybe, caseOf } = K;
const { Just, Nothing } = Maybe;

const enhance = compose(
  withState("currentPlayer", "setCurrentPlayer", Player.X),
  withState("board", "setBoard", defaultBoard),
  withState("gameState", "setGameState", GameState.Playable) // TODO: Nuke this
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
      Win: player => `${player} Won!`
    })}
    <Footer
      onReset={_ => {
        setGameState(GameState.Playable);
        setBoard(defaultBoard);
      }}
    />
  </div>
);

export default enhance(App);
