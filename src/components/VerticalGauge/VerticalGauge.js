import React, { useRef, useEffect, useState } from "react";
import "./VerticalGauge.css";
import { AiFillCaretRight } from "react-icons/ai";

function VerticalGauge({ value }) {
	const [sliderDistance, setSliderDistance] = useState(0);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef(null);
	const startYRef = useRef(null);
	const indicatorCount = 10;

	const handleMouseDown = (event) => {
		setIsDragging(true);
		startYRef.current = event.clientY;
	};

	const handleMouseMove = (event) => {
		if (!isDragging) {
			return;
		}
		const deltaY = event.clientY - startYRef.current;
		setSliderDistance((prevPosition) => {
			const newPosition = prevPosition + deltaY;
			const minPosition = 0;
			const maxPosition = windowSize.current[1] - 167;
			if (newPosition < minPosition) {
				return minPosition;
			}
			if (newPosition > maxPosition) {
				return maxPosition;
			}
			return newPosition;
		});
		startYRef.current = event.clientY;
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
		};
	});

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	return (
		<div className="VerticalGauge" ref={containerRef}>
			<div
				className="VerticalGauge__Indicator"
				style={{ top: sliderDistance }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
			>
				{`${sliderDistance}`}
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
