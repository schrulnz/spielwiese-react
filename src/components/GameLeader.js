import React, { Component } from 'react';
import Button from './Button';

class GameLeader extends Component {

   constructor() {
      super();
      this.state = {
         resultStartNewRound: ' ',
         resultResetAlreadyUsed: ' ',
      };
   }

   startNewRound = async () => {
      this.setState({ resultStartNewRound: '...' });
      this.setState({ resultResetAlreadyUsed: ' ' });
      const requestOptions = {
         method: 'DELETE',
         redirect: 'follow'
      };

      fetch("https://fierce-hollows-70925.herokuapp.com/kratzywordtz/state", requestOptions)
         .then(response => response.text())
         .then((result) => {
            this.setState({ resultStartNewRound: result });
         })
         .catch((error) => {
            console.log('error', error);
            this.setState({ resultStartNewRound: 'error' });
         });
   }

   resetAlreadyUsed = async () => {
      this.setState({ resultResetAlreadyUsed: '...' });
      this.setState({ resultStartNewRound: ' ' });
      const requestOptions = {
         method: 'DELETE',
         redirect: 'follow'
      };

      fetch("https://fierce-hollows-70925.herokuapp.com/kratzywordtz/already-used", requestOptions)
         .then(response => response.text())
         .then((result) => {
            this.setState({ resultResetAlreadyUsed: result });
         })
         .catch((error) => {
            console.log('error', error);
            this.setState({ resultResetAlreadyUsed: 'error' });
         });
   }

   render() {
      return (
         <div>
            <h4 style={{ marginLeft: "2em", marginRight: "2em" }}>Um gleichzeitig mitzuspielen, bitte das eigentliche Spiel in einem zweiten Tab öffnen.</h4>
            <div>
               <Button name="Neue Runde starten" className="default-button" style={{ height: "6rem", width: "20rem", marginTop: "3em" }} onClick={() => {
                  this.startNewRound();
               }} />
               <p style={{ marginTop: "1em" }} >{this.state.resultStartNewRound}</p>
            </div>
            <div>
               <Button name="Beschreibungen zurücksetzen" className="default-button" style={{ height: "6rem", width: "20rem", marginTop: "3em" }} onClick={() => {
                  this.resetAlreadyUsed();
               }} />
               <p style={{ marginTop: "1em" }} >{this.state.resultResetAlreadyUsed}</p>
            </div>
         </div>
      );
   }
}

export default GameLeader;