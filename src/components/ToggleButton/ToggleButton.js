import React, { useState, useEffect } from "react";
import "./ToggleButton.css";
import ToolTip from "../ToolTip/ToolTip";

const ToggleButton = ({ children, toggle, func, hover, index }) => {
	const [hovered, setHovered] = useState(false);
	const [deepHover, setDeepHover] = useState(false);

	useEffect(() => {
		let timeoutId;
		if (hovered) {
			timeoutId = setTimeout(() => {
				hover(index);
				setDeepHover(true);
			}, 500);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [hovered]);

	return (
		<div>
			<button
				onClick={func}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => {
					setHovered(false);
					if (deepHover) {
						setDeepHover(false);
						hover(index);
					}
				}}
				className={`toggle-button ${toggle ? toggle : null}`}
			>
				{children}
			</button>
			{/* <ToolTip
				active={true}
				children={
					<div className="toggle-button-tooltip">Center on graph</div>
				}
			/> */}
		</div>
	);
};

export default ToggleButton;
