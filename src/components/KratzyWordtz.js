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
      wordCardStyle: [],
      descCardStyle: [],
      roundWordsAndDescs: [],
      shuffledRoundDescs: [],
      shuffledRoundWords: [],
      dataCons: [],
      dataVows: [],
      coloredCardStyles: [{ backgroundColor: "#78cf78" }, { backgroundColor: "#7878cf" }, { backgroundColor: "#cf7878" },
      { backgroundColor: "#333333" }, { backgroundColor: "#444444" }, { backgroundColor: "#555555" },
      { backgroundColor: "#666666" }, { backgroundColor: "#777777" }],
      selectedCardColorWords: [],
      selectedCardColorDescs: [],
      wordClicked: false,
      descClicked: false,
      newPair: true
    };
  }

  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({ consText: 'Konsonanten: ' + data.consonants, vowsText: 'Vokale: ' + data.vowels, descText: 'Beschreibung: ' + data.desc, dataCons: data.consonants, dataVows: data.vowels });
  }

  loadRoundWordsAndDescs = async () => {
    const getUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/state';
    const response = await fetch(getUrl);
    const data = await response.json();
    this.setState({ roundWordsAndDescs: data });

    this.shuffleWordsAndDesc(data);
  }

  shuffleWordsAndDesc = (data) => {
    let descs = [];
    data.forEach(element => {
      descs.push(element.desc);
    });
    descs = this.shuffle(descs);

    let words = [];
    data.forEach(element => {
      words.push(element.word);
    });
    words = this.shuffle(words);
    this.setState({ shuffledRoundWords: words, shuffledRoundDescs: descs }, () => {
      this.initSelectedCardColors();
    });
  }

  initSelectedCardColors = () => {
    const sccw = this.state.selectedCardColorWords;
    for (let i = 0; i < this.state.shuffledRoundWords.length; i++) {
      sccw.push(0);
    }
    const sccd = this.state.selectedCardColorDescs;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      sccw.push(0);
    }

    const wcs = this.state.wordCardStyle;
    for (let i = 0; i < this.state.shuffledRoundWords.length; i++) {
      wcs.push(this.state.coloredCardStyles[0]);
    }
    const dcs = this.state.descCardStyle;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      dcs.push(this.state.coloredCardStyles[0]);
    }

    this.setState({ selectedCardColorWords: sccw, selectedCardColorDescs: sccd, wordCardStyle: wcs, descCardStyle: dcs });
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  updateGameState = () => {
    const gameState = this.state.gameState;
    if (gameState < 3) {
      this.setState({ gameState: gameState + 1 });
    } else {
      this.setState({ gameState: 1 });
    }
  }

  manageCardStyles = (isWord, k) => {
    if (isWord) {
      const cs = this.state.wordCardStyle;
      const sccw = this.state.selectedCardColorWords;
      sccw[k] = sccw[k] + 1;
      cs[k] = this.state.coloredCardStyles[sccw[k] + 1];
      this.setState({
        wordCardStyle: cs,
        selectedCardColorWords: sccw
      });
    } else /* is a Desc */ {
      const cs = this.state.descCardStyle;
      const i = this.state.selectedCardColorDescs[k];
      cs[k] = this.state.coloredCardStyles[i + 1];
      this.setState({
        descCardStyle: cs,
        selectedCardColorDescs: i + 1
      });
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
        let cards = [];
        let i = 0;
        let j = 0;
        while (i < this.state.dataCons.length) {
          cards.push(<ClickableCard name={this.state.dataCons[i]} className="large-text" id={"0" + i} />);
          i++;
        };
        while (j < this.state.dataVows.length) {
          cards.push(<ClickableCard name={this.state.dataVows[j]} className="large-text" id={"1" + j} />);
          j++;
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
              <TextCard name={this.state.wordText} className="eingabefeld" />
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
            }} />
          </div>
        );
        break;
      case 2:
        let roundCards = [];
        let k = 0;
        for (let k = 0; k < this.state.shuffledRoundWords.length; k++) {
          roundCards.push(
            <ClickableCard name={this.state.shuffledRoundWords[k]} className="large-text"
              style={this.state.wordCardStyle[k]} onClick={() => {
                this.manageCardStyles(true, k);
              }} />
          );
          roundCards.push(
            <ClickableCard name={this.state.shuffledRoundDescs[k]} className="large-text"
              style={this.state.descCardStyle[k]} onClick={() => {
                this.manageCardStyles(false, k);
              }} />
          );
        };

        return (
          <div>
            <div className="select-result-grid">
              <p className="large-text">Wort</p>
              <p className="large-text">Bezeichnung</p>
              {roundCards}
            </div>
            <div>
              <Button name="Bestätigen" className="default-button" onClick={() => {
                this.updateGameState();
                this.setState({ wordCardStyle: [], descCardStyle: [] });
              }} />
              <Button name="Aktualisieren" className="default-button" onClick={() => {
                this.loadRoundWordsAndDescs();
              }} />
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
