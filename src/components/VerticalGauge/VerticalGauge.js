import React, { useRef, useEffect, useState } from "react";
import "./VerticalGauge.css";
import { AiFillCaretRight } from "react-icons/ai";

function VerticalGauge({ max, min, onChange }) {
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
		} else {
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
		}

		startYRef.current = event.clientY;
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	});

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		setSliderDistance(0);
		onChange(min);
	}, [min, max]);

	function UnixTimeToDate(unixTime) {
		const date = new Date(unixTime * 1000);

		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const humanDate = date.toLocaleDateString("en-US", options); // "Monday, February 21, 2022"

		return humanDate;
	}

	return (
		<div className="VerticalGauge" ref={containerRef}>
			{max != 0 && min != 0 ? (
				<div
					className="VerticalGauge__Indicator"
					style={{ top: sliderDistance }}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={() =>
						onChange(
							min -
								(min - max) *
									(sliderDistance /
										(windowSize.current[1] - 167))
						)
					}
				>
					{UnixTimeToDate(
						min -
							(min - max) *
								(sliderDistance / (windowSize.current[1] - 167))
					)}
					<AiFillCaretRight />
				</div>
			) : null}
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
