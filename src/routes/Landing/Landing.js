import "./Landing.css";
import Wave from "react-wavify";
import { RiCompasses2Line } from "react-icons/ri";
import { BsChevronDoubleDown } from "react-icons/bs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Landing() {
	const [dive, setDive] = useState(false);
	const navigate = useNavigate();

	const handleClick = () => {
		setDive(!dive);
		setTimeout(() => {
			navigate("/explore");
		}, 2000);
	};
	return (
		<div className="Landing">
			<div className="Landing__Title">
				<h1 className="Landing__Title-Title">
					<RiCompasses2Line />
					MantleCharter
				</h1>
				<h1 className="Landing__Title-SubTitle">
					Explore the depths of the Mantle network
				</h1>
				<button onClick={handleClick} className="Landing__Title-Button">
					<BsChevronDoubleDown />
					Dive in
					<BsChevronDoubleDown />
				</button>
			</div>
			<div className="Landing__Waves">
				<Wave
					className="Landing__Waves-Wave"
					fill="#0077ff"
					paused={false}
					style={{
						transition: "all 1s ease-in-out",
						transform: dive ? "translateY(-30%)" : "translateY(0)",
					}}
					options={{
						height: 640,
						amplitude: 40,
						speed: 0.15,
						points: 5,
					}}
				/>
				<Wave
					className="Landing__Waves-Wave"
					fill="#0054b4"
					paused={false}
					style={{
						transition: "all 1.5s ease-in-out",
						transform: dive ? "translateY(-30%)" : "translateY(0)",
					}}
					options={{
						height: 680,
						amplitude: 40,
						speed: 0.125,
						points: 5,
					}}
				/>
				<Wave
					className="Landing__Waves-Wave"
					fill="#003c81"
					paused={false}
					style={{
						transition: "all 2s ease-in-out",
						transform: dive ? "translateY(-30%)" : "translateY(0)",
					}}
					options={{
						height: 720,
						amplitude: 40,
						speed: 0.1,
						points: 5,
					}}
				/>
			</div>
		</div>
	);
}

export default Landing;
