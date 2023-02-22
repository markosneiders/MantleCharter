import React, { useEffect } from "react";
import "./Timeline.css";
import { AiOutlineClose } from "react-icons/ai";
import TxCard from "../TxCard/TxCard";
import TxChart from "../TxChart/TxChart";

function Timeline({ isOpen, onClose, transactions, blockies }) {
	console.log(blockies);

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
				<div className="Timeline__content-wrapper">
					<div className="Timeline__content-left">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: "70px",
								position: "sticky",
								borderBottom: "solid 1px",
							}}
						>
							<h1
								style={{
									fontSize: "25px",
									marginLeft: "20px",
									fontWeight: "bolder",
								}}
							>
								Historical Chart
							</h1>
						</div>
						<div
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								zIndex: "100",
							}}
						>
							<TxChart passedData={transactions} />
						</div>
					</div>
					<div className="Timeline__content-right">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: "70px",
								position: "sticky",
								borderBottom: "solid 1px",
							}}
						>
							<h1
								style={{
									fontSize: "25px",
									marginLeft: "20px",
									fontWeight: "bolder",
								}}
							>
								Transactions
							</h1>
						</div>
						<div className="Timeline__content-right-list">
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
				</div>
			</div>
		</div>
	);
}

export default Timeline;

{
}
