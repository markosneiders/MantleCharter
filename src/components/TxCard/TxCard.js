import React, { useEffect, useState } from "react";
import "./TxCard.css";
import makeBlockie from "ethereum-blockies-base64";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { FiCopy } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";

const TxCard = ({
	fromAddress,
	toAddress,
	timeStamp,
	txHash,
	txValue,
	gasUsed,
}) => {
	const [expanded, setExpanded] = useState(false);

	let source = new Image();
	let other = new Image();

	source.src = makeBlockie(`${fromAddress}`);
	other.src = makeBlockie(`${toAddress}`);

	function UnixTimeToDate(unixTime) {
		const date = new Date(unixTime * 1000);

		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: true,
			timeZoneName: "short",
		};
		const humanDate = date.toLocaleDateString("en-US", options); // "February 21, 2022 11:25:23 PM GMT+2"

		return humanDate;
	}

	return (
		<div
			className="TxCard"
			style={{
				height: `${expanded ? "min-content" : "92px"}`,
			}}
		>
			<div
				className={`TxCard__Header ${expanded ? "expanded" : ""}`}
				onClick={() => setExpanded(!expanded)}
			>
				<div
					style={{
						cursor: "pointer",
						marginRight: "16px",
						transform: `scaleY(${expanded ? "-1" : "1"})`,
					}}
				>
					<BsChevronDown fontSize={"30px"} />
				</div>
				<img
					src={source.src}
					alt="Source blockie"
					style={{
						width: 64,
						height: 64,
					}}
				/>
				<div
					style={{
						color: "#fff",
						fontSize: "48px",
						display: "flex",
						width: "60%",
						alignItems: "center",
						justifyContent: "space-evenly",
					}}
				>
					<HiOutlineArrowLongLeft />
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "min-content",
							fontSize: "22px",
							fontWeight: "100",
						}}
					>
						<p
							style={{
								fontSize: "40px",
								fontWeight: "900",
							}}
						>{`${txValue * 10 ** -18}\n `}</p>
						BIT
					</div>

					<HiOutlineArrowLongLeft />
				</div>
				<img
					src={other.src}
					alt="Other blockie"
					style={{
						width: 64,
						height: 64,
					}}
				/>
			</div>

			<div
				className="TxCard__Body"
				style={{
					transformOrigin: "top",
					transform: `scaleY(${expanded ? "1" : "0"})`,
				}}
			>
				<p style={{ marginTop: "6px" }}>From: </p>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigator.clipboard.writeText("textToCopy")}
				>
					<p
						style={{
							fontSize: "14px",
							marginTop: "3px",
						}}
					>
						{fromAddress} <FiCopy />
					</p>
				</div>

				<p style={{ marginTop: "10px" }}>To: </p>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigator.clipboard.writeText("textToCopy")}
				>
					<p
						style={{
							fontSize: "14px",
							marginTop: "3px",
						}}
					>
						{toAddress} <FiCopy />
					</p>
				</div>
				<p style={{ marginTop: "10px" }}>Timestamp: </p>
				<p
					style={{
						fontSize: "14px",
						marginTop: "3px",
					}}
				>
					{UnixTimeToDate(timeStamp)}
				</p>
				<p style={{ marginTop: "10px" }}>txHash: </p>
				<div
					style={{ cursor: "pointer" }}
					onClick={() => navigator.clipboard.writeText("textToCopy")}
				>
					<p
						style={{
							fontSize: "11px",
							marginTop: "3px",
						}}
					>
						{txHash} <FiCopy />
					</p>
				</div>
				<p style={{ marginTop: "10px" }}>gasUsed: </p>
				<p
					style={{
						fontSize: "14px",
						marginTop: "3px",
					}}
				>
					{gasUsed}
				</p>
			</div>
		</div>
	);
};

export default TxCard;
