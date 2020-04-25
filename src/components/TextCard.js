import React from 'react';

const TextCard = (props) => {
  return (
  	<div className="TextCard">
  		<p className={props.className}>{props.name}</p>
  	</div>
  	)
}

export default TextCard;