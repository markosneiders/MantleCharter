import React, { useState } from "react";
import data from "./data.json";
import "./Explore.css";
import ForceGraph2D from "react-force-graph-2d";

function Explore() {
	const [isVisible, setIsVisible] = useState(false);
	React.useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<div className="bg">
			<div className={`Explore ${isVisible ? "visible" : "hidden"}`}>
				<ForceGraph2D
					graphData={data}
					backgroundColor={"#003c81"}
					nodeColor={() => "#9bddff"}
					linkColor={() => "#ffffff"}
					linkWidth={2}
					linkDirectionalParticles={1}
					maxZoom={5}
					minZoom={0.5}
				/>
			</div>
		</div>
	);
}

export default Explore;
