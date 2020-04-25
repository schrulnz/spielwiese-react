import React from 'react';

const Button = (props) => {

	return (
		<div className="container grow">
			<form method="GET">
				<button
					type="button"
					className="default-button"
					onClick={props.onClick}>
					{props.name}
				</button>
			</form>
		</div>
	)
}

export default Button;