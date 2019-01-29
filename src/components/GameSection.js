import React from "react";
import GameBoard from "./GameBoard";
import { playerToString } from "../lib/helpers";

const GameSection = ({
  gameState,
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  setGameState
}) => (
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
      Win: player => `Player ${playerToString(player)} Won!`,
      Draw: _ => "Its a Draw!"
    })}
  </div>
);

export default GameSection;
