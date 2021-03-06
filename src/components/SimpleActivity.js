import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';
import TextCard from './TextCard';
import paintPic from '../resources/images/paint.png';
import pantomimePic from '../resources/images/pantomime.png';
import describePic from '../resources/images/describe.png';
import CommunicationConstants from '../constants/CommunicationConstants';

class SimpleActivity extends Component {
  constructor() {
    super();
    this.state = {
      wordText: 'Simple Activity',
      categoryText: 'Wortgenerator',
      picUrl: ''
    };
  }



  getActivity = async () => {
    const getWordUrl = CommunicationConstants.DOMAIN + CommunicationConstants.ACTIVITY_WORD;
    const response = await fetch(getWordUrl);
    const data = await response.json();

    let pic = '';
    switch (data.category) {
      case "paint": pic = paintPic;
        break;
      case "pantomime": pic = pantomimePic;
        break;
      case "describe": pic = describePic;
        break;
      default: pic = "";
    }

    this.setState({ wordText: data.word, categoryText: data.category, picUrl: pic });
  }

  render() {
    if (this.state.picUrl === '') {
      return (
        <div className="default-background">
          <div>
            <h1 className="h1">Simple Activity</h1>
            <h2 className="h2">Gleich geht's los!</h2>
          </div>
          <Button name="Spiel starten" onClick={this.getActivity} className="default-button" />
        </div>
      );
    } else {
      return (
        <div className="default-background">
          <div>
            <TextCard name={this.state.wordText} className="large-text" />
            <div className="activity-image-container">
              <img src={this.state.picUrl} className="activity-image" alt={this.state.categoryText} />
            </div>
          </div>
          <Button name="Neues Wort" onClick={this.getActivity} className="default-button" />
        </div>
      );
    }
  }
}

export default SimpleActivity;