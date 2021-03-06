import React from 'react';

const ClickableCard = (props) => {
	return (
		<button className="clickableCard" onClick={props.onClick} disabled={props.disabled} style={props.style}>
			{/* <p className={props.className}>{props.name}</p> */}
			{props.name}
		</button>
	)
}

export default ClickableCard;