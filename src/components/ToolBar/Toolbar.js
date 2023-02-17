import React, { useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import { IoLocate } from "react-icons/io5";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToolTip from "../ToolTip/ToolTip";
import "./ToolBar.css";

function Toolbar({ func1 }) {
	const [visible, setVisible] = useState(true);
	const [hover, setHover] = useState(new Array(10).fill(false));

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleHover = (i) => {
		const newArray = [...hover];
		newArray[i] = !hover[i];
		setHover(newArray);
	};

	return (
		<div className="container">
			<ToolTip
				active={hover[0]}
				children={
					<div className="toggle-button-tooltip">Center on graph</div>
				}
			/>
			<div
				className={`button ${visible ? "visible" : "hidden"}`}
				onClick={toggleVisibility}
			>
				<BsChevronDoubleRight
					size={24}
					style={
						visible
							? { transition: "0.5s", transform: "scaleX(-1)" }
							: { transition: "0.5s" }
					}
				/>
			</div>
			<div className={`toolbar ${visible ? "visible" : "hidden"}`}>
				<div className="content">
					<ToggleButton
						children={<IoLocate />}
						func={func1}
						hover={handleHover}
						index={0}
					/>
					<ToggleButton />
				</div>
			</div>
		</div>
	);
}

export default Toolbar;
