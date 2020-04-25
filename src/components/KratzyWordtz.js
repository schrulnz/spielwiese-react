import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Button from './Button';

class KratzyWordtz extends Component {
  
  constructor(){
  	super();
  	this.state = {
  		consText: 'Unten klicken,',
  		descText: 'um das Spiel zu starten'
  	};
  }

  getKW = async () => {
    const getWordUrl = 'https://fierce-hollows-70925.herokuapp.com/kratzywordtz/new-round';
    const response = await fetch(getWordUrl);
    const data = await response.json();
    console.log(data);
    this.setState({ consText: 'Konsonanten: ' + data.consonants, vowsText: 'Vokale: ' + data.vowels, descText: 'Beschreibung: ' + data.desc })
  }

  render(){
  return (
    <div className="default-background">
    	<div>
	      <p className="large-text">{this.state.consText}</p>
	      <p className="large-text">{this.state.vowsText}</p>
	      <p className="large-text">{this.state.descText}</p>
	    </div>
        <Button name="Spiel beginnen" onClick={this.getKW} />
	</div>
  );
}
}

export default KratzyWordtz;
