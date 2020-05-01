import React from 'react';

const TextCard = (props) => {
	return (
		<div className="text-card" style={props.style}>
			<p className={props.className} style={props.textStyle}>{props.name}</p>
		</div>
	)
}

export default TextCard;