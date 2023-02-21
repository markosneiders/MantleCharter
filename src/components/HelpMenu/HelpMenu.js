import React, { useEffect } from "react";
import "./HelpMenu.css";
import { AiOutlineClose } from "react-icons/ai";
import TxCard from "../TxCard/TxCard";
function HelpMenu({ isOpen, onClose }) {
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
			className={`HelpMenu ${isOpen ? "visible" : "hidden"}`}
			onClick={handleParentClick}
			onAbort={onClose}
		>
			<div className="HelpMenu__content">
				<div className="HelpMenu__content-close" onClick={onClose}>
					<AiOutlineClose />
				</div>
			</div>
		</div>
	);
}

export default HelpMenu;
