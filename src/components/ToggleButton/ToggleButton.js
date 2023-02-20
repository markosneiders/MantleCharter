import React, { useState, useEffect } from "react";
import "./ToggleButton.css";
import ToolTip from "../ToolTip/ToolTip";

const ToggleButton = ({ children, toggle, func, hover, index, startState }) => {
	const [hovered, setHovered] = useState(false);
	const [deepHover, setDeepHover] = useState(false);
	const [toggled, setToggled] = useState(startState);
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

	const handleClick = () => {
		setToggled(!toggled);
		func();
	};
	return (
		<div>
			<button
				onClick={handleClick}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => {
					setHovered(false);
					if (deepHover) {
						setDeepHover(false);
						hover(index);
					}
				}}
				className={`toggle-button`}
				style={{
					color: toggle ? (toggled ? "#fff" : "#656565") : "#fff",
				}}
			>
				{children}
			</button>
		</div>
	);
};

export default ToggleButton;
