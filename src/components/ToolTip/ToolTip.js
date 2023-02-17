import React, { useState, useEffect } from "react";
import "./ToolTip.css";
const ToolTip = ({ active, children }) => {
	const [position, setPosition] = useState({ left: 0, top: 0 });

	useEffect(() => {
		const handleMouseMove = (e) => {
			setPosition({ left: e.clientX, top: e.clientY });
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div
			className="ToolTip"
			style={{
				position: "absolute",
				left: active ? position.left + 10 : -100,
				top: active ? position.top - 10 : -100,
			}}
		>
			{active ? children : null}
		</div>
	);
};

export default ToolTip;
