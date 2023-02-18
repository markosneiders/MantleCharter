import React, { useState, useRef, useEffect, useCallback } from "react";
import datab from "./data.json";
import "./Explore.css";
import VerticalGauge from "../../components/VerticalGauge/VerticalGauge";
import ToolTip from "../../components/ToolTip/ToolTip";
import Toolbar from "../../components/ToolBar/Toolbar";
import ForceGraph2D from "react-force-graph-2d";
import Blockies from "react-blockies";
import axios from "axios";

function Explore() {
	//State definitions
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([{}]);
	const graphLinks = [];
	const [linkInfo, setLinkInfo] = useState({});
	const [currentLinkInfo, setCurrentLinkInfo] = useState([]);

	const [isVisible, setIsVisible] = useState(false);
	const [hover, setHover] = useState(false);
	const [highlightNodes, setHighlightNodes] = useState(new Set());
	const [highlightLinks, setHighlightLinks] = useState(new Set());
	const [hoverNode, setHoverNode] = useState(null);
	const NODE_R = 8;
	const graphRef = useRef(null);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	//When page is loaded slowly fade in
	useEffect(() => {
		setIsVisible(true);
		getData();
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

	//Formats address to a more readable format
	const formatAddress = (address) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	//Generates a list of all nodes invovled with transactions (without duplicates)
	const nodeIdGen = (item) => {
		const data1 = [];
		for (var i = 0; i < item.length; i++) {
			// eslint-disable-next-line
			if (data1.indexOf(item[i].from_address) > -1 !== true) {
				data1.push(item[i].from_address);
			} // eslint-disable-next-line
			if (data1.indexOf(item[i].to_address) > -1 !== true) {
				data1.push(item[i].to_address);
			}
		}
		return data1;
	};

	//Removes duplicate links
	const dupeLinkRemoval = (item) => {
		const data1 = [];
		for (var j = 0; j < item.length; j++) {
			for (var i = 0; i < 25; i++) {
				if (data1.indexOf(item[i].from + item[i].to) === -1) {
					data1.push(item[i].from + item[i].to);
				}
			}
		}
		for (var x = 0; x < data1.length; x++) {
			graphLinks.push({
				from_address: formatAddress(data1[x].slice(0, 42)),
				to_address: formatAddress(data1[x].slice(-42)),
			});
		}
	};

	const getData = async () => {
		let response;
		try {
			response = await axios.get(
				`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=0x7fC8eBFB82Bdac3e9D358E7fCcE6604144939739`
			);

			const transactions = response.data.result;

			const tempData = transactions.map((transaction) => {
				return {
					toAddress: transaction.to,
					fromAddress: transaction.from,
				};
			});

			setData(tempData);
		} catch (err) {
			console.error(err);
		}
	};
	console.log(data);

	return (
		<div className="bg">
			<div
				className={`Explore ${isVisible ? "visible" : "hidden"}`}
				style={{ height: windowSize.current[1] }}
			>
				<div className="Explore__Graph">
					<ForceGraph2D
						ref={graphRef}
						graphData={datab}
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
