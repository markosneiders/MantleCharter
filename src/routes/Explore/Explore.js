import React, { useState, useRef, useEffect, useCallback } from "react";
import data from "./data.json";
import "./Explore.css";
import VerticalGauge from "../../components/VerticalGauge/VerticalGauge";
import ToolTip from "../../components/ToolTip/ToolTip";
import Toolbar from "../../components/ToolBar/Toolbar";
import ForceGraph2D from "react-force-graph-2d";
import Blockies from "react-blockies";

function Explore() {
	//State definitions
	const [isVisible, setIsVisible] = useState(false);
	const [hover, setHover] = useState(false);
	const [highlightNodes, setHighlightNodes] = useState(new Set());
	const [highlightLinks, setHighlightLinks] = useState(new Set());
	const [hoverNode, setHoverNode] = useState(null);
	const NODE_R = 8;
	const graphRef = useRef(null);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	//When page is loaded slowly fade in
	React.useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleNodeHover = (node) => {
		//Sets if node is being hovered on
		if (node) {
			setHover(true);
		} else {
			setHover(false);
		}

		//Sets which nodes and links to be highlighted
		highlightNodes.clear();
		highlightLinks.clear();
		try {
			if (node) {
				highlightNodes.add(node);
				data.links.forEach((source) => {
					if (source.source.id === node.id) {
						highlightNodes.add(source.target);
					} else if (source.target.id === node.id) {
						highlightNodes.add(source.source);
					}
				});
				node.links.forEach((link) => highlightLinks.add(link));
			}
		} catch (e) {}

		setHoverNode(node || null);
		updateHighlight();
	};

	const handleLinkHover = (link) => {
		highlightNodes.clear();
		highlightLinks.clear();

		if (link) {
			highlightLinks.add(link);
			highlightNodes.add(link.source);
			highlightNodes.add(link.target);
		}

		updateHighlight();
	};

	const handleZoom = () => {
		graphRef.current.zoomToFit(1000);
	};

	const updateHighlight = () => {
		setHighlightNodes(highlightNodes);
		setHighlightLinks(highlightLinks);
	};

	return (
		<div className="bg">
			<div
				className={`Explore ${isVisible ? "visible" : "hidden"}`}
				style={{ height: windowSize.current[1] }}
			>
				<div className="Explore__Graph">
					<ForceGraph2D
						ref={graphRef}
						graphData={data}
						autoPauseRedraw={false}
						maxZoom={5}
						minZoom={0.5}
						nodeLabel={""}
						nodeRelSize={NODE_R}
						nodeColor={() => "#0054B4"}
						linkColor={() => "#FFF"}
						linkDirectionalParticles={1}
						linkDirectionalParticleSpeed={0.005}
						linkCurvature={0.3}
						linkWidth={(link) => (highlightLinks.has(link) ? 5 : 2)}
						linkDirectionalParticleWidth={(link) =>
							highlightLinks.has(link) ? 7 : 3
						}
						nodeCanvasObjectMode={(node) =>
							highlightNodes.has(node) ? "before" : undefined
						}
						onLinkHover={handleLinkHover}
						onNodeHover={handleNodeHover}
						nodeCanvasObject={(node, ctx) => {
							// add ring just for highlighted nodes
							ctx.beginPath();
							ctx.arc(
								node.x,
								node.y,
								NODE_R * 1.1,
								0,
								2 * Math.PI,
								false
							);
							ctx.fillStyle =
								node === hoverNode ? "#ffff" : "#cccc";
							ctx.fill();
						}}
					/>
				</div>

				<div className="Explore__SideBar">
					<VerticalGauge />
				</div>
				<ToolTip
					active={hover}
					children={
						<div className="Explore__ToolTip">
							ToDo: Add node info
						</div>
					}
				/>
				<Toolbar func1={handleZoom} />
			</div>
		</div>
	);
}

export default Explore;
