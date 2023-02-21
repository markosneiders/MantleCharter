import "./CurrentView.css";
import makeBlockie from "ethereum-blockies-base64";
function CurrentView({ address, onClick }) {
	const img = new Image();
	img.src = makeBlockie(`${address || "0"}`);
	return (
		<div className="CurrentView" onClick={onClick}>
			<div className="CurrentView--address">
				{`Currently viewing: ${
					address.substring(0, 6) +
					"..." +
					address.substring(address.length - 4)
				}`}
			</div>

			<img
				src={img.src}
				alt="Current address blockies icon"
				style={{
					width: 32,
					height: 32,
					backgroundColor: "#0054b4",
					padding: "4px",
				}}
			/>
		</div>
	);
}
export default CurrentView;
