import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';
import ClickableCard from './ClickableCard';
import backspaceIcon from '../resources/images/icons/backspace_100px.png';

class KratzyWordtz extends Component {

  constructor() {
    super();
    this.state = {
      consText: 'Unten klicken,',
      descText: 'um das Spiel zu starten',
      gameState: 0,
      cardStyle: [],
      roundWords: [{}, {}]
    };
  }

  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    console.log(data);
    this.setState({ consText: 'Konsonanten: ' + data.consonants, vowsText: 'Vokale: ' + data.vowels, descText: 'Beschreibung: ' + data.desc });
  }

  loadRoundWords = async () => {
    const getUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/state';
    const response = await fetch(getUrl);
    const data = await response.json();
    console.log(data);
    this.setState({ roundWords: data });
  }

  updateGameState = () => {
    const gameState = this.state.gameState;
    if (gameState < 3) {
      this.setState({ gameState: gameState + 1 });
    } else {
      this.setState({ gameState: 1 });
    }
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
        return (
          <div className="kratzywordtz-default">
            <div>
              <p className="large-text">{this.state.consText}</p>
              <p className="large-text">{this.state.vowsText}</p>
              <p className="large-text">{this.state.descText}</p>
            </div>
            <div>
              <ClickableCard name={"y"} className="large-text" />
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
            <Button name="Absenden" className="default-button" onClick={() => {
              this.updateGameState();
              this.loadRoundWords();
            }} />
          </div>
        );
        break;
      case 2:
        return (
          <div>
            <div className="select-result-grid">
              <p className="large-text">Wort</p>
              <p className="large-text">Bezeichnung</p>
              <ClickableCard name={this.state.roundWords[0].word} className="large-text" onClick={() => {
                const cs = this.state.cardStyle;
                cs[0] = "#78cf7c";
                this.setState({
                  cardStyle: cs
                })
              }}
                style={{ backgroundColor: this.state.cardStyle[0] }} />
              <ClickableCard name={this.state.roundWords[0].desc} className="large-text" onClick={() => {
                const cs = this.state.cardStyle;
                cs[1] = "#78cf7c";
                this.setState({
                  cardStyle: cs
                })
              }}
                style={{ backgroundColor: this.state.cardStyle[1] }} />
              <ClickableCard name={"xyzjuheeeeeeee"} className="large-text" />
              <ClickableCard name={"alphabeeeeeeet"} className="large-text" />
              <ClickableCard name={"bllub"} className="large-text" />
              <ClickableCard name={"xbbbbbbbbbbb"} className="large-text" />
              <ClickableCard name={"asdfasdfasdfas"} className="large-text" />
              <ClickableCard name={"asdfasdfasdfasdfasdf"} className="large-text" />
            </div>
            <div>
              <Button name="Bestätigen" className="default-button" onClick={this.updateGameState} />
            </div>
          </div>
        );
        break;
      case 3:
        return (
          <div>
            <p className="large-text">{"Punktestand: ..."}</p>
            <Button name="Neue Runde" className="default-button" onClick={() => {
              this.setState({ consText: '', vowsText: '', descText: '' });
              this.updateGameState();
              this.loadTask();
            }} />
          </div>
        );
        break;
      default:
        return (
          <div />
        );
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
