import React, { Component } from 'react';
import CommunicationConstants from '../constants/CommunicationConstants';
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
    const stateUrl = CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_STATE;
    this.setState({ resultStartNewRound: '...' });
      this.setState({ resultResetAlreadyUsed: ' ' });
      const requestOptions = {
         method: 'DELETE',
         redirect: 'follow'
      };

      fetch(stateUrl, requestOptions)
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
    const url = CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_ALREADY_USED;
    this.setState({ resultResetAlreadyUsed: '...' });
      this.setState({ resultStartNewRound: ' ' });
      const requestOptions = {
         method: 'DELETE',
         redirect: 'follow'
      };

      fetch(url, requestOptions)
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
            <h4 className="h4" style={{ marginLeft: "2em", marginRight: "2em" }}>Um gleichzeitig mitzuspielen, bitte das eigentliche Spiel in einem zweiten Tab öffnen.</h4>
            <div>
               <Button name="Neue Runde starten" className="default-button" style={{ height: "6rem", width: "20rem", marginTop: "3em" }} onClick={() => {
                  this.startNewRound();
               }} />
               <p style={{ marginTop: "1em", color: "white" }} >{this.state.resultStartNewRound}</p>
            </div>
            <div>
               <Button name="Beschreibungen zurücksetzen" className="secondary-button" style={{ height: "4rem"}} onClick={() => {
                  this.resetAlreadyUsed();
               }} />
               <p style={{ marginTop: "1em", color: "white" }} >{this.state.resultResetAlreadyUsed}</p>
            </div>
         </div>
      );
   }
}

export default GameLeader;