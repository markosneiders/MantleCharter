import React from "react";
import "./TxCard.css";
import makeBlockie from "ethereum-blockies-base64";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { FiCopy } from "react-icons/fi";

function TxCard() {
	const source = new Image();
	source.src = makeBlockie(`${"SOURCE"}`);
	const other = new Image();
	other.src = makeBlockie(`${"OTHER"}`);
	const sender = true;
	const amount = 100;

	return (
		<div className="TxCard">
			<div className="TxCard__Header">
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
						>{`${amount}\n `}</p>
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
			<div className="TxCard__Body">
				<p style={{ marginTop: "6px" }}>From: </p>
				<div
					style={{ display: "flex", cursor: "pointer" }}
					onClick={() => navigator.clipboard.writeText("textToCopy")}
				>
					<p
						style={{
							fontSize: "14px",
							marginRight: "8px",
							marginTop: "4px",
						}}
					>
						0xBc22fDB25c8eC030D3aF0DdEfEF2E5A1058E89f7
					</p>
					<FiCopy />
				</div>

				<p style={{ marginTop: "6px" }}>To: </p>
				<div
					style={{ display: "flex", cursor: "pointer" }}
					onClick={() => navigator.clipboard.writeText("textToCopy")}
				>
					<p
						style={{
							fontSize: "14px",
							marginRight: "8px",
							marginTop: "4px",
						}}
					>
						0xBc22fDB25c8eC030D3aF0DdEfEF2E5A1058E89f7
					</p>
					<FiCopy />
				</div>
			</div>
		</div>
	);
}

export default TxCard;
