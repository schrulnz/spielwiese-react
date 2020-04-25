import React from 'react';

const ClickableCard = (props) => {
  return (
  	<button className="ClickableCard" onClick = {props.onClick}>
  		<p className={props.className}>{props.name}</p>
  	</button>
  	)
}

export default ClickableCard;