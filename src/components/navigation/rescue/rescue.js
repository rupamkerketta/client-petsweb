import React from 'react';

const Rescue = () => {
    const style = {
		fontFamily: 'Poppins',
		fontSize: '2em',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};
	return (
		<div className="rescue-module" style={{ height: '50vh' }}>
			<h2 style={style}>Rescue</h2>
		</div>
	);
}

export default Rescue;