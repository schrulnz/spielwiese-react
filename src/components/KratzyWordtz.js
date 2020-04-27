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
      disableAllCards: false
    };

    this.coloredCardStyles = [{ backgroundColor: "#cfcb78" }, { backgroundColor: "#7878cf" }, { backgroundColor: "#cf7878" },
    { backgroundColor: "#78cf78" }, { backgroundColor: "#78cfbf" }, { backgroundColor: "#cf9e78" },
    { backgroundColor: "#a478cf" }, { backgroundColor: "#cf78c3" }];
    this.defaultCardStyle = { backgroundColor: "#ffffff" };
  }


  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({
      descText: data.desc,
      dataChars: data.consonants.concat(data.vowels)
    });
  }

  postResult = async (desc, word) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ "desc": desc, "word": word });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://fierce-hollows-70925.herokuapp.com/kratzywordtz/result", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
    switch (this.state.gameState) {
      case 0:
        return (
          <div className="kratzywordtz-default">
            <div>
              <h1>Kratzy Wordtz</h1>
              <h2>Gleich geht's los!</h2>
            </div>
            <Button name="Spiel starten" className="default-button" style={{ marginTop: "3em" }} onClick={() => {
              this.loadTask();
              this.updateGameState();
            }} />
          </div>
        );
        break;
      case 1:
        let charCards = [];
        const cs = this.state.charCardStyle;
        for (let i = 0; i < this.state.dataChars.length; i++) {
          charCards.push(<ClickableCard name={this.state.dataChars[i]} className="large-text" onClick={() => {
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
              <p className="large-text">Beschreibung:</p>
              <p className="large-text">{this.state.descText}</p>
              <div className="char-cards-grid">
                {charCards}
              </div>
            </div>
            <div className="eingabe">
              <TextCard className="eingabefeld large-text" name={this.state.createdWord} />
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
              this.updateGameState();
              const createdWordString = this.state.createdWord.join("");
              this.postResult(this.state.descText, createdWordString);
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
            className="medium-text" style={this.state.descCardStyle[k]} />
          );
          if (this.state.shuffledRoundWords[k]) {
            roundCards.push(
              <ClickableCard name={this.state.shuffledRoundWords[k]} disabled={this.state.disableAllCards} 
              className="large-text" style={this.state.wordCardStyle[k]} onClick={() => {
                  this.manageCardStyles(true, k);
                }} />
            );
          }
        };

        return (
          <div>
            <div className="select-result-grid">
              <p style={{ marginTop: "1.5em" }} className="large-text">{(this.state.shuffledRoundDescs.length > 0) && "Bezeichnungen"}</p>
              <p style={{ marginTop: "1.5em" }} className="large-text">{(this.state.shuffledRoundWords.length > 0) && "Wörter"}</p>
              {roundCards}
            </div>
            <div style={{ marginBottom: "1.5em" }} >
              {!this.state.disableAllCards &&
                <Button name={"Aktualisieren"} className="default-button" onClick={() => {
                  this.loadRoundWordsAndDescs();
                }} />}

              <Button name={!this.state.disableAllCards ? "Bestätigen" : "Weiter"} className="default-button" onClick={() => {
                if (!this.state.disableAllCards) {
                  this.setState({ disableAllCards: true });
                } else {
                  this.updateGameState();
                  this.setState({ wordCardStyle: [], descCardStyle: [] });
                }
              }} />
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
