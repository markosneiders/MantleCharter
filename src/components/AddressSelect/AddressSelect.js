import React, { useEffect, useState } from "react";
import "./AddressSelect.css";
import makeBlockie from "ethereum-blockies-base64";
import TextInput from "../TextInput/TextInput";

function AddressSelect({ isOpen, onClose, address, onChange }) {
	const [text, setText] = useState(address);

	const handleInputChange = (newText) => {
		setText(newText);
	};
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
		if (event.keyCode === 13) {
			onClose();
			if (text != "") {
				onChange(text);
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleEsc, false);

		return () => {
			document.removeEventListener("keydown", handleEsc, false);
		};
	}, [handleEsc]);

	const img = new Image();
	if (text != "") {
		img.src = makeBlockie(`${text}`);
	} else {
		img.src = makeBlockie("0");
	}

	//Connects to metamask
	const handleConnect = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				const accounts = await window.ethereum.request({
					method: "eth_accounts",
				});
				setText(accounts[0]);
				onChange(accounts[0]);
				onClose();
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<div
			className={`AddressSelect ${isOpen ? "visible" : "hidden"}`}
			onClick={handleParentClick}
			onAbort={onClose}
		>
			<div className="AddressSelect__content">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<p
							style={{ fontSize: "16px" }}
						>{`Currently viewing:\n`}</p>
						<TextInput
							placeholder={"Enter new address..."}
							value={text}
							onChange={handleInputChange}
						/>
					</div>

					<img
						src={img.src}
						style={{
							width: "56px",
							height: "56px",
							backgroundColor: "#002140",
							padding: "4px",
							margin: "8px",
							marginLeft: "16px",
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						padding: "4px",
					}}
				>
					<div
						className="AddressSelect__content-button"
						onClick={() => {
							onClose();
							if (text != "") {
								onChange(text);
							}
						}}
						style={{
							marginRight: "32px",
						}}
					>
						Confirm
					</div>
					<div
						className="AddressSelect__content-button"
						onClick={handleConnect}
					>
						MetaMask
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
							style={{
								width: "32px",
								height: "32px",
								marginLeft: "8px",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddressSelect;
