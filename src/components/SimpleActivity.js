import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';

class SimpleActivity extends Component {
  constructor() {
    super();
    this.state = {
      wordText: 'Simple Activity',
      categoryText: 'Wortgenerator'
    };
  }

  getActivity = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/activity/word';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({ wordText: 'Wort: ' + data.word, categoryText: 'Kategorie: ' + data.category })
  }

  render() {

    return (
      <div className="default-background">
        <div>
          <p className="large-text">{this.state.wordText}</p>
          <p className="large-text">{this.state.categoryText}</p>
        </div>
        <Button name="Neues Wort" onClick={this.getActivity} />
      </div>
    );
  }
}

export default SimpleActivity;