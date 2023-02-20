import React, { useEffect } from "react";
import "./Timeline.css";
import { AiOutlineClose } from "react-icons/ai";

function Timeline({ isOpen, onClose }) {
	const handleParentClick = (event) => {
		event.preventDefault();

		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", onClose, false);

		return () => {
			document.removeEventListener("keydown", onClose, false);
		};
	}, [onClose]);
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
			</div>
		</div>
	);
}

export default Timeline;
