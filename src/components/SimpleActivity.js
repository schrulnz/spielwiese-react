import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';

class SimpleActivity extends Component {
  constructor() {
    super();
    this.state = {
      wordText: '',
      categoryText: ''
    };
  }

  getActivity = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/activity/word';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    this.setState({ wordText: data.word, categoryText: data.category })
  }

  render() {

    return (
      <div className="simple-activity-grid">
        <div>
          <p className="large-text">Wort: {this.state.wordText}</p>
          <p className="large-text">Kategorie: {this.state.categoryText}</p>
        </div>
        <Button name="Neues Wort" onClick={this.getActivity} />
      </div>
    );
  }
}

export default SimpleActivity;