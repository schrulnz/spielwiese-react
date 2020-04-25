import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';
import backspaceIcon from '../resources/images/icons/backspace_100px.png';

class KratzyWordtz extends Component {

  constructor() {
    super();
    this.state = {
      consText: 'Unten klicken,',
      descText: 'um das Spiel zu starten',
      gameState: 0
    };
  }

  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    console.log(data);
    this.setState({ consText: 'Konsonanten: ' + data.consonants, vowsText: 'Vokale: ' + data.vowels, descText: 'Beschreibung: ' + data.desc });
  }

  renderGame = () => {
    switch (this.state.gameState) {
      case 0:
        return (
          <div className="kratzywordtz-default">
            <div>
              <p className="large-text">{this.state.consText}</p>
              <p className="large-text">{this.state.vowsText}</p>
              <p className="large-text">{this.state.descText}</p>
            </div>
            <Button name="Spiel beginnen" onClick={() => {
              this.loadTask();
              this.updateGameState();
            }} />
          </div>
        );
        break;
      case 1:
        return (
          <div className="kratzywordtz-default">
            <div>
              <p className="large-text">{this.state.consText}</p>
              <p className="large-text">{this.state.vowsText}</p>
              <p className="large-text">{this.state.descText}</p>
            </div>
            <div>
              <button
                type="button"
                className="icon-button"
                onClick={() => { }}>
                <img
                  src={backspaceIcon}
                  alt="backspace"
                  className="logo-icon"
                />
              </button>
            </div>
            {/* Card for the Word */}
            <Button name="Absenden" onClick={this.updateGameState} />
          </div>
        );
        break;
      case 2:
        return (
          <div>
            <p className="large-text">{"Test Game State 2"}</p>
          </div>
        );
        break;
      case 3:
        return (
          <div>
            <p className="large-text">{"Test Game State 3"}</p>
          </div>
        );
        break;
      default:
        return (
          <div>

          </div>
        );
    }
  }

  updateGameState = () => {
    const gameState = this.state.gameState;
    if (gameState < 3) {
      this.setState({ gameState: gameState + 1 });
    } else {
      this.setState({ gameState: 0 });
    }

  }

  render() {


    return (
      <div className="default-background">
        {this.renderGame()}
      </div>
    );
  }
}

export default KratzyWordtz;
