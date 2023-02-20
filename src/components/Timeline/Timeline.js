import React, { useEffect } from "react";
import "./Timeline.css";
import { AiOutlineClose } from "react-icons/ai";
import TxCard from "../TxCard/TxCard";
function Timeline({ isOpen, onClose }) {
	const handleParentClick = (event) => {
		event.preventDefault();

		if (event.target === event.currentTarget) {
			onClose();
		}
	};
	const handleEsc = (event) => {
		if (event.keyCode === 27) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleEsc, false);

		return () => {
			document.removeEventListener("keydown", handleEsc, false);
		};
	}, [handleEsc]);
	return (
		<div
			className={`Timeline ${isOpen ? "visible" : "hidden"}`}
			onClick={handleParentClick}
			onAbort={onClose}
		>
			<div className="Timeline__content">
				<div className="Timeline__content-close" onClick={onClose}>
					<AiOutlineClose />
				</div>
				<TxCard />
			</div>
		</div>
	);
}

export default Timeline;
