import React, { useState, useRef } from "react";
import data from "./data.json";
import "./Explore.css";

//Component imports
import VerticalGauge from "../../components/VerticalGauge/VerticalGauge";
import ToolTip from "../../components/ToolTip/ToolTip";
import Toolbar from "../../components/ToolBar/Toolbar";
import CurrentView from "../../components/CurrentView/CurrentView";
import Timeline from "../../components/Timeline/Timeline";
import AddressSelect from "../../components/AddressSelect/AddressSelect";

//Packages import
import ForceGraph2D from "react-force-graph-2d";
import makeBlockie from "ethereum-blockies-base64";
function Explore() {
	//State definitions
	const [isVisible, setIsVisible] = useState(false);
	const [hover, setHover] = useState(false);
	const [highlightNodes, setHighlightNodes] = useState(new Set());
	const [highlightLinks, setHighlightLinks] = useState(new Set());
	const [hoverNode, setHoverNode] = useState(null);
	const [blockies, setBlockies] = useState(true);
	const [isTimelineOpen, setIsTimelineOpen] = useState(false);
	const [isAddressOpen, setIsAddressOpen] = useState(false);
	const [currentAddress, setCurrentAddress] = useState("TODO");

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

	const updateHighlight = () => {
		setHighlightNodes(highlightNodes);
		setHighlightLinks(highlightLinks);
	};

	//Handles node rendering
	const graphOptions = {
		nodeCanvasObject: (node, ctx) => {
			if (blockies) {
				//Choose background color depending on if the nod is hovered upon
				if (highlightNodes.has(node)) {
					if (hoverNode === node) {
						ctx.fillStyle = "#fff";
					} else {
						ctx.fillStyle = "#ccc";
					}
				} else {
					ctx.fillStyle = "#0054b4";
				}
				ctx.fillRect(node.x - 6, node.y - 6, 12, 12);

				//Render blockies image
				const img = new Image();
				img.src = makeBlockie(`${node.id}`);
				const imgSize = 10;
				ctx.drawImage(
					img,
					node.x - imgSize / 2,
					node.y - imgSize / 2,
					imgSize,
					imgSize
				);
			} else {
				ctx.beginPath();
				ctx.arc(node.x, node.y, NODE_R * 1, 0, 2 * Math.PI, false);
				ctx.fillStyle = "#0054b4";
				ctx.fill();
			}
		},
	};

	//Timeline modal open and close
	const openTimeline = () => {
		setIsTimelineOpen(true);
	};

	const closeTimeline = () => {
		setIsTimelineOpen(false);
	};

	//Address selector modal open and close
	const openAddress = () => {
		setIsAddressOpen(true);
	};

	const closeAddress = () => {
		setIsAddressOpen(false);
	};
	//Toolbar functions
	const handleZoom = () => {
		graphRef.current.zoomToFit(1000);
	};
	const handleBlockies = () => {
		setBlockies(!blockies);
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
						linkColor={() => "#FFF"}
						linkDirectionalParticles={1}
						linkDirectionalParticleSpeed={0.005}
						nodeRelSize={8}
						linkCurvature={0.3}
						linkWidth={(link) => (highlightLinks.has(link) ? 5 : 2)}
						linkDirectionalParticleWidth={(link) =>
							highlightLinks.has(link) ? 7 : 3
						}
						onLinkHover={handleLinkHover}
						onNodeHover={handleNodeHover}
						{...graphOptions}
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
				<Toolbar
					func0={handleZoom}
					func1={openTimeline}
					func2={handleBlockies}
				/>
				<CurrentView address={currentAddress} onClick={openAddress} />
				<Timeline isOpen={isTimelineOpen} onClose={closeTimeline} />
				<AddressSelect
					isOpen={isAddressOpen}
					onClose={closeAddress}
					address={currentAddress}
					onChange={setCurrentAddress}
				/>
			</div>
		</div>
	);
}

export default Explore;
