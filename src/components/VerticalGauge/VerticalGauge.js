import React from "react";
import "./VerticalGauge.css";
import { AiFillCaretRight } from "react-icons/ai";

function VerticalGauge({ value }) {
	//Converts incoming 0-100 value to use in moving chevron
	const percentage = Math.min(Math.max(value * 0.955, 0), 95.5);

	const indicatorCount = 10; // Or something else

	return (
		<div className="VerticalGauge">
			<div
				className="VerticalGauge__Line"
				style={{ top: `${percentage}%` }}
			>
				{value}
				<AiFillCaretRight />
			</div>
			<div className="VerticalGauge__Container">
				<div className="VerticalGauge__Container__Markers">
					{[...Array(indicatorCount)].map((e, i) => (
						<div className="VerticalGauge__Container__Markers-marker" />
					))}
				</div>
			</div>
		</div>
	);
}

export default VerticalGauge;
