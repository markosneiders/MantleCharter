import React, { useState, useRef } from "react";
import data from "./data.json";
import "./Explore.css";
import VerticalGauge from "../../components/VerticalGauge/VerticalGauge";
import ForceGraph2D from "react-force-graph-2d";

function Explore() {
	const [isVisible, setIsVisible] = useState(false);
	const [depth, setDepth] = useState(0);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	//When page is loaded slowly fade in
	React.useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="bg">
			<button onClick={() => setDepth(depth + 10)}>
				Increment depth
			</button>
			<div
				className={`Explore ${isVisible ? "visible" : "hidden"}`}
				style={{ height: windowSize.current[1] }}
			>
				<div className="Explore__Graph">
					<ForceGraph2D
						graphData={data}
						nodeColor={() => "#9bddff"}
						linkColor={() => "#ffffff"}
						linkWidth={2}
						linkDirectionalParticles={1}
						maxZoom={5}
						minZoom={0.5}
					/>
				</div>

				<div className="Explore__SideBar">
					<VerticalGauge value={depth} />
				</div>
			</div>
		</div>
	);
}

export default Explore;
