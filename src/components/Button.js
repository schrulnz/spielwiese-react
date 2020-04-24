import React from 'react';
import './Button.css';

const Button = (props) => {

  return (
  	<div className="container grow">
  		<form method="GET">
	  		<button type="button" className="spielstart" >
	  			{props.name}
	  		</button>
	  	</form>
  	</div>
  )
}

export default Button;