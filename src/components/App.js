import React, { Component } from "react";
import Header from "./Header";
import GameBoard from "./GameBoard";
import Footer from "./Footer";
import { withState, compose } from "recompose";

const enhance = compose(withState("currentPlayer", "setCurrentPlayer", "X"));

const App = ({ currentPlayer, setCurrentPlayer }) => (
  <div className="App">
    <Header currentPlayer={currentPlayer} />
    <GameBoard />
    <Footer />
  </div>
);

export default enhance(App);
