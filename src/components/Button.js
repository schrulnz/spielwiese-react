import React from 'react';

const Button = (props) => {

	return (
		<div>
			<form method="GET">
				<button
					type="button"
					className={props.className}
					onClick={props.onClick}
					style={props.style}>
					{props.name}
				</button>
			</form>
		</div>
	)
}

export default Button;