import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';
import ClickableCard from './ClickableCard';
import GameLeader from './GameLeader';
import TextCard from './TextCard';
import Styles from '../constants/Styles';
import DesignConstants from '../constants/DesignConstants';
import CommunicationConstants from '../constants/CommunicationConstants';
import backspaceIcon from '../resources/images/icons/backspace_100px.png';

class KratzyWordtz extends Component {

  constructor() {
    super();
    this.state = {
      descText: '',
      gameState: 0,
      wordCardStyle: [],
      descCardStyle: [],
      roundWordsAndDescs: [],
      shuffledRoundDescs: [],
      shuffledRoundWords: [],
      selectedCardColorWords: [],
      selectedCardColorDescs: [],
      charCardStyle: [],
      dataChars: [],
      createdWord: [],
      disableAllCards: false,
      gameLeader: false
    };

    // this.coloredCardStyles = [{ backgroundColor: "#cfcb78" }, { backgroundColor: "#7878cf" }, { backgroundColor: "#cf7878" },
    // { backgroundColor: "#78cf78" }, { backgroundColor: "#78cfbf" }, { backgroundColor: "#cf9e78" },
    // { backgroundColor: "#a478cf" }, { backgroundColor: "#cf78c3" }];
    this.coloredCardStyles = [{ backgroundColor: "#ffadad" }, { backgroundColor: "#ffd6a5" }, { backgroundColor: "#fdffb6" },
    { backgroundColor: "#caffbf" }, { backgroundColor: "#9bf6ff" }, { backgroundColor: "#a0c4ff" },
    { backgroundColor: "#bdb2ff" }, { backgroundColor: "#ffc6ff" }, { backgroundColor: "#e5e5e5" }];
    // this.coloredCardStyles = [{ backgroundColor: "#ff0000" }, { backgroundColor: "#ff7b00" }, { backgroundColor: "#ffee00" },
    // { backgroundColor: "#9dff00" }, { backgroundColor: "#09ff00" }, { backgroundColor: "#00ffb3" },
    // { backgroundColor: "#00aeff" }, { backgroundColor: "#003cff" }, { backgroundColor: "#6200ff" }, { backgroundColor: "#ea00ff" }, { backgroundColor: "#ff0095" }];
    this.defaultCardStyle = { backgroundColor: "#ffffff" };
  }

  deleteState = async () => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_STATE, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  loadTask = async () => {
    const getWordUrl = CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_NEW_ROUND;
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({
      descText: data.desc,
      dataChars: data.consonants.concat(data.vowels)
    });
  }

  postResult = (desc, word) => {
    const postResultUrl = CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_RESULT;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ "desc": desc, "word": word });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(postResultUrl, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  loadRoundWordsAndDescs = async () => {
    const getUrl = CommunicationConstants.DOMAIN + CommunicationConstants.CRASY_WORDTZ_STATE;
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
      if (element.word) {
        words.push(element.word);
      }
    });
    words = this.shuffle(words);
    this.setState({ shuffledRoundWords: words, shuffledRoundDescs: descs }, () => {
      this.initSelectedCardColors();
    });
  }

  initSelectedCardColors = () => {
    const sccw = this.state.selectedCardColorWords;
    for (let i = 0; i < this.state.shuffledRoundWords.length; i++) {
      sccw.push(-1);
    }
    const sccd = this.state.selectedCardColorDescs;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      sccd.push(i);
    }

    const wcs = this.state.wordCardStyle;
    for (let i = 0; i < this.state.shuffledRoundWords.length; i++) {
      wcs.push(this.defaultCardStyle);
    }
    const dcs = this.state.descCardStyle;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      dcs.push(this.coloredCardStyles[this.state.selectedCardColorDescs[i]]);
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
      if (sccw[k] >= this.state.shuffledRoundDescs.length) {
        sccw[k] = 0;
      }
      cs[k] = this.coloredCardStyles[sccw[k]];
      this.setState({
        wordCardStyle: cs,
        selectedCardColorWords: sccw
      });
    } else /* is a Desc */ {
      const cs = this.state.descCardStyle;
      const sccw = this.state.selectedCardColorDescs;
      sccw[k] = sccw[k] + 1;
      if (sccw[k] >= this.state.shuffledRoundDescs.length) {
        sccw[k] = 0;
      }
      cs[k] = this.coloredCardStyles[sccw[k]];
      this.setState({
        descCardStyle: cs,
        selectedCardColorDescs: sccw
      });
    }
  }

  addChar = (i) => {
    this.setState({
      createdWord: this.state.createdWord.concat(this.state.dataChars[i])
    });
  }

  renderGame = () => {
    const isMobile = window.innerWidth <= 500;
    let textDependingOnMobileStyle = {
      fontSize: DesignConstants.mediumText,
    };
    if (isMobile) {
      textDependingOnMobileStyle = {
        fontSize: DesignConstants.smallText,
      };
    }

    switch (this.state.gameState) {
      case 0:
        return (
          <div className="kratzywordtz-default">
            <div>
              <h1 className="h1">Crasy Wordtz</h1>
              <h2 className="h2">Gleich geht's los!</h2>
            </div>
            <Button name="Spiel starten" className="default-button" style={{ marginTop: "3em" }} onClick={() => {
              this.loadTask();
              this.updateGameState();
            }} />
            <Button name="Spielleiterin werden" className="secondary-button" style={{ marginTop: "3em" }} onClick={() => {
              this.setState({
                gameLeader: true
              })
            }} />
          </div>
        );
        break;
      case 1:
        let charCards = [];
        const cs = this.state.charCardStyle;
        for (let i = 0; i < this.state.dataChars.length; i++) {
          charCards.push(<ClickableCard name={this.state.dataChars[i]} className="medium-text" onClick={() => {
            cs[i] = {
              color: "grey",
              transform: "none",
              boxShadow: "none"
            }
            this.setState({
              charCardStyle: cs
            })
            this.addChar(i);
          }}
            style={this.state.charCardStyle[i]}
          />);
        };

        return (
          <div className="kratzywordtz-default">
            <div>
              <p className="small-text">Beschreibung:</p>
              <p className="large-text" style={{ marginBottom: "2rem" }}>{this.state.descText}</p>
              <div className="char-cards-grid">
                {charCards}
              </div>
            </div>
            <div className="eingabe">
              <TextCard className="eingabefeld medium-text" name={this.state.createdWord} />
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  const deletedChar = this.state.createdWord.pop()
                  this.setState({
                    createdWord: this.state.createdWord
                  });
                  for (let i = 0; i < this.state.dataChars.length; i++) {
                    if (charCards[i].props.name === deletedChar) {
                      cs[i] = {}
                      this.setState({
                        charsCardStyle: cs
                      });
                    }
                  }
                }}>
                <img
                  src={backspaceIcon}
                  alt="backspace"
                  style={{ height: "40px" }}
                />
              </button>
            </div>
            <Button name="Absenden" className="default-button" style={{ marginBottom: "1.5em" }} onClick={() => {
              if (this.state.createdWord.length === 0) {
                alert("Bitte ein Wort eingeben");
              } else {
                this.updateGameState();
                const createdWordString = this.state.createdWord.join("");
                this.postResult(this.state.descText, createdWordString);
              }
            }} />
          </div>
        );
        break;
      case 2:
        let roundCards = [];
        let k = 0;
        for (let k = 0; k < this.state.shuffledRoundDescs.length; k++) {
          roundCards.push(
            <ClickableCard name={this.state.shuffledRoundDescs[k]} disabled={this.state.disableAllCards}
              style={{ ...this.state.descCardStyle[k], ...textDependingOnMobileStyle }} />
          );
          if (this.state.shuffledRoundWords[k]) {
            roundCards.push(
              <ClickableCard name={this.state.shuffledRoundWords[k]} disabled={this.state.disableAllCards}
                style={{ ...this.state.wordCardStyle[k], ...textDependingOnMobileStyle }} onClick={() => {
                  this.manageCardStyles(true, k);
                }} />
            );
          }
        };

        return (
          <div>
            <div className="select-result-grid">
              <p style={{ marginTop: "2em", ...textDependingOnMobileStyle }}>{(this.state.shuffledRoundDescs.length > 0) && "Bezeichnungen"}</p>
              <p style={{ marginTop: "2em", ...textDependingOnMobileStyle }}>{(this.state.shuffledRoundWords.length > 0) && "Wörter"}</p>
              {roundCards}
            </div>
            <div style={{ marginBottom: "1.5em" }} >
              {(!this.state.disableAllCards && this.state.shuffledRoundDescs.length === 0) &&
                <div>
                  <p className="small-text">Erst, wenn alle anderen bereit sind:</p>
                  <Button name={"Aktualisieren"} className="default-button" onClick={() => {
                    this.loadRoundWordsAndDescs();
                  }} />
                </div>}

              {!(this.state.shuffledRoundDescs.length === 0) &&
                <Button name={!this.state.disableAllCards ? "Bestätigen" : "Weiter"} className="default-button" style={{ marginTop: "1rem" }} onClick={() => {
                  if (!this.state.disableAllCards) {
                    this.setState({ disableAllCards: true });
                  } else {
                    this.updateGameState();
                    this.setState({ wordCardStyle: [], descCardStyle: [] });
                  }
                }} />
              }
            </div>
          </div>
        );
        break;
      case 3:
        return (
          <div>
            <p className="large-text">{/* Punktestand: ... */}</p>
            <Button name="Neue Runde" className="default-button" onClick={() => {
              this.setState({
                descText: '',
                wordCardStyle: [],
                descCardStyle: [],
                roundWordsAndDescs: [],
                shuffledRoundDescs: [],
                shuffledRoundWords: [],
                selectedCardColorWords: [],
                selectedCardColorDescs: [],
                charCardStyle: [],
                dataChars: [],
                createdWord: [],
                disableAllCards: false
              });
              this.deleteState()
                .then(this.loadTask());
              this.updateGameState();
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
        {!this.state.gameLeader &&
          this.renderGame()}
        {this.state.gameLeader &&
          <GameLeader />}
      </div>
    );
  }
}

export default KratzyWordtz;
