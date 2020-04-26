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
      coloredCardStyles: [{ backgroundColor: "#cfcb78" }, { backgroundColor: "#7878cf" }, { backgroundColor: "#cf7878" },
      { backgroundColor: "#78cf78" }, { backgroundColor: "#78cfbf" }, { backgroundColor: "#78cfbf" },
      { backgroundColor: "#a478cf" }, { backgroundColor: "#cf78c3" }],
      selectedCardColorWords: [],
      selectedCardColorDescs: [],
      wordClicked: false,
      descClicked: false,
      newPair: true,
      charCardStyle: [],
      dataChars: [],
      createdWord: []
    };
  }

  loadTask = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({
      descText: 'Beschreibung: ' + data.desc, 
      dataChars: data.consonants.concat(data.vowels)
    });
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
      sccw.push(i);
    }
    const sccd = this.state.selectedCardColorDescs;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      sccd.push(0);
    }

    const wcs = this.state.wordCardStyle;
    for (let i = 0; i < this.state.shuffledRoundWords.length; i++) {
      wcs.push(this.state.coloredCardStyles[this.state.selectedCardColorWords[i]]);
    }
    const dcs = this.state.descCardStyle;
    for (let i = 0; i < this.state.shuffledRoundDescs.length; i++) {
      dcs.push(this.state.coloredCardStyles[this.state.selectedCardColorDescs[i]]);
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
      if (sccw[k] >= this.state.shuffledRoundWords.length) {
        sccw[k] = 0;
      }
      cs[k] = this.state.coloredCardStyles[sccw[k]];
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
      cs[k] = this.state.coloredCardStyles[sccw[k]];
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
              <p className="large-text">Klicken, um das</p>
              <p className="large-text">Spiel zu beginnen</p>
            </div>
            <Button name="Spiel beginnen" className="default-button" onClick={() => {
              this.loadTask();
              this.updateGameState();
            }} />
          </div>
        );
        break;
      case 1:
        let charCards = [];
        const cs = this.state.charCardStyle;
      	for(let i=0; i < this.state.dataChars.length; i++) {
      		charCards.push(<ClickableCard name={this.state.dataChars[i]}  className="large-text" onClick={() => {
            cs[i]={ color: "grey",
                    transform: "none",
                    boxShadow: "none"} 
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
              <p className="large-text">{this.state.descText}</p>
              <div>
                {charCards}
              </div>
            </div>
            <div className="eingabe">
              <TextCard className="eingabefeld large-text" name={this.state.createdWord}/>
              <button
                type="button"
                className="icon-button"
                onClick = {() => {
                  const deletedChar = this.state.createdWord.pop()
                  this.setState({
                    createdWord: this.state.createdWord
                  });
                  for(let i=0; i < this.state.dataChars.length; i++){
                    if(charCards[i].props.name === deletedChar){
                        cs[i]={ }
                        this.setState({
                          charsCardStyle: cs
                        });
                    }
                  }
                }}>
                <img
                  src={backspaceIcon}
                  alt="backspace"
                  className="logo-icon"
                />
              </button>
            </div>
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
              style={this.state.wordCardStyle[k]} />
          );
          roundCards.push(
            <ClickableCard name={this.state.shuffledRoundDescs[k]} className="medium-text"
              style={this.state.descCardStyle[k]} onClick={() => {
                this.manageCardStyles(false, k);
                console.log(this.state.selectedCardColorWords);
                console.log(this.state.selectedCardColorDescs);
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
              this.setState({
                      charCardStyle: [],
                      dataChars: [],
                      createdWord: [], });
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
