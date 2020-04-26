import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';
import ClickableCard from './ClickableCard';
import TextCard from './TextCard';
import backspaceIcon from '../resources/images/icons/backspace_100px.png';

class KratzyWordtz extends Component {

  constructor() {
    super();
    this.state = {
      consText: 'Unten klicken,',
      descText: 'um das Spiel zu starten',
      gameState: 0,
      dataCons: [],
      dataVows: []
    };
  }


  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    console.log(data);
    this.setState({ consText: 'Konsonanten: ' + data.consonants, vowsText: 'Vokale: ' + data.vowels, descText: 'Beschreibung: ' + data.desc, dataCons: data.consonants, dataVows: data.vowels });
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
            <Button name="Spiel beginnen" className="default-button" onClick={() => {
              this.loadTask();
              this.updateGameState();
            }} />
          </div>
        );
        break;
      case 1:
      	let cards = [];
       	let i=0;
      	while(i < this.state.dataCons.length) {
      		cards.push(<ClickableCard name={this.state.dataCons[i]}  className="large-text" id={i} onClick={() => {
              disabled='true';
            }}/>);
      		i++;
      	};
        i=i-this.state.dataCons.length;
      	while(i < this.state.dataVows.length) {
      		cards.push(<ClickableCard name={this.state.dataVows[i]} className="large-text" id={i} />);
      		i++;
      	};

        return (
          <div className="kratzywordtz-default">
            <div>
              <p className="large-text">{this.state.descText}</p>
              <div>
              	{cards}
              </div>
            </div>

            <div className="eingabe">
              <TextCard className="eingabefeld" />
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
            <Button name="Absenden" className="default-button" onClick={this.updateGameState} />
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
          <div />
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
