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
				<div style={{ marginTop: "0px" }}>
					<div className="HelpMenu__content-Header">
						What is MantleCharter?
					</div>
					<div className="HelpMenu__content-Text">
						MantleCharter let's you view any mantle testnet
						addresses transaction history in a intuitive graphical
						way.
					</div>
					<div className="HelpMenu__content-Header">
						How to use MantleCharter?
					</div>
					<div className="HelpMenu__content-SubTitle">
						Address entry
					</div>
					<div className="HelpMenu__content-Text">
						Simply enter and address by clicking the top card on the
						screen to open the address selector. Here you can enter
						a custom address or connect your metamask wallet to
						easily view yours.
					</div>
					<div className="HelpMenu__content-SubTitle">
						Reading the graph
					</div>
					<div className="HelpMenu__content-Text">
						After a short loading period, if the address is valid, a
						graph will be displayed in the middle of the screen.
						Here each node is represented as an address and a
						connection is a transaction, the direction of the
						particles indicates the direction of the transaction.
					</div>
					<div className="HelpMenu__content-SubTitle">
						Depth VerticalGauge
					</div>
					<div className="HelpMenu__content-Text">
						By default the graph only shows the most recent
						transaction. To view older ones drag the date slider on
						the right side of the screen downwards and release.
					</div>
					<div className="HelpMenu__content-SubTitle">ToolBar</div>
					<div className="HelpMenu__content-Text">
						On the left side is a toolbar with multiple functions.
						Hovering over each button will reveal what they do.
					</div>
					<div className="HelpMenu__content-SubTitle">Timeline</div>
					<div className="HelpMenu__content-Text">
						Clicking on the bar graph icon in the toolbar will open
						the timeline view. Here you can see all the transactions
						displayed in a list. And a graph of the transaction
						volume.
					</div>
				</div>
			</div>
		</div>
	);
}

export default HelpMenu;
