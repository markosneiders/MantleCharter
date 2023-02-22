import React, { useState } from "react";
import { BsChevronDoubleRight, BsXDiamond, BsSnow } from "react-icons/bs";
import { IoLocate, IoHelp, IoReload } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToolTip from "../ToolTip/ToolTip";
import "./ToolBar.css";

function Toolbar({ func0, func1, func2, func3, func4, func5 }) {
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
			<ToolTip
				active={hover[1]}
				children={
					<div className="toggle-button-tooltip">Timeline view</div>
				}
			/>
			<ToolTip
				active={hover[2]}
				children={
					<div className="toggle-button-tooltip">
						Toggle Blockies (Disable if encountering performance
						issues)
					</div>
				}
			/>
			<ToolTip
				active={hover[3]}
				children={
					<div className="toggle-button-tooltip">
						Freeze nodes after dragging
					</div>
				}
			/>
			<ToolTip
				active={hover[4]}
				children={
					<div className="toggle-button-tooltip">Relaod graph</div>
				}
			/>
			<ToolTip
				active={hover[5]}
				children={<div className="toggle-button-tooltip">Help</div>}
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
						func={func0}
						hover={handleHover}
						index={0}
					/>
					<ToggleButton
						children={<VscGraph />}
						func={func1}
						hover={handleHover}
						index={1}
					/>
					<ToggleButton
						children={<BsXDiamond />}
						func={func2}
						hover={handleHover}
						index={2}
						toggle={true}
						startState={true}
					/>
					<ToggleButton
						children={<BsSnow />}
						func={func3}
						hover={handleHover}
						index={3}
						toggle={true}
					/>
					<ToggleButton
						children={<IoReload />}
						func={func4}
						hover={handleHover}
						index={4}
					/>
					<ToggleButton
						children={<IoHelp />}
						func={func5}
						hover={handleHover}
						index={5}
					/>
				</div>
			</div>
		</div>
	);
}

export default Toolbar;
