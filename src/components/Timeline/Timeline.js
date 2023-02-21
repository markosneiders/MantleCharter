import React, { useEffect } from "react";
import "./Timeline.css";
import { AiOutlineClose } from "react-icons/ai";
import TxCard from "../TxCard/TxCard";
function Timeline({ isOpen, onClose, transactions }) {
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
				{transactions.map((transaction) => (
					<TxCard
						key={transaction.id}
						fromAddress={transaction.source}
						toAddress={transaction.target}
						timeStamp={transaction.timeStamp}
						txHash={transaction.txHash}
						txValue={transaction.txValue}
						gasUsed={transaction.gasUsed}
					/>
				))}
			</div>
		</div>
	);
}

export default Timeline;
