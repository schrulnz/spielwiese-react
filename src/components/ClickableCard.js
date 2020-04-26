import React from 'react';

const ClickableCard = (props) => {
  return (
  	<button className="clickableCard" onClick = {props.onClick} style = {props.style}>
  		<p className={props.className}>{props.name}</p>
  	</button>
  	)
}

export default ClickableCard;