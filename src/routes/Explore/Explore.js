import React, { useState, useEffect, useRef } from "react";
import "./Explore.css";

//Component imports
import VerticalGauge from "../../components/VerticalGauge/VerticalGauge";
import ToolTip from "../../components/ToolTip/ToolTip";
import Toolbar from "../../components/ToolBar/Toolbar";
import CurrentView from "../../components/CurrentView/CurrentView";
import Timeline from "../../components/Timeline/Timeline";
import AddressSelect from "../../components/AddressSelect/AddressSelect";
import HelpMenu from "../../components/HelpMenu/HelpMenu";

//Packages import
import ForceGraph2D from "react-force-graph-2d";
import makeBlockie from "ethereum-blockies-base64";
import axios from "axios";

function Explore() {
	//State definitions
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);
	const [filteredData, setFilteredData] = useState({ nodes: [], links: [] });
	const [hoverAddress, setHoverAddress] = useState("");
	const [blockies, setBlockies] = useState(true);
	const [isTimelineOpen, setIsTimelineOpen] = useState(false);
	const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
	const [isAddressOpen, setIsAddressOpen] = useState(false);
	const [currentAddress, setCurrentAddress] = useState("");
	const [currentDepth, setCurrentDepth] = useState(
		Math.floor(Date.now() / 1000)
	);
	const [isVisible, setIsVisible] = useState(false);
	const [hover, setHover] = useState(false);
	const [highlightNodes, setHighlightNodes] = useState(new Set());
	const [highlightLinks, setHighlightLinks] = useState(new Set());
	const [hoverNode, setHoverNode] = useState(null);
	const [dragFreeze, setDragFreeze] = useState(false);

	const NODE_R = 8;
	const graphRef = useRef(null);
	const windowSize = useRef([window.innerWidth, window.innerHeight]);
	const blockiesCache = new Map();

	//When page is loaded slowly fade in
	useEffect(() => {
		if (currentAddress === "") {
			if (
				localStorage.getItem("currentAddress") == undefined ||
				localStorage.getItem("currentAddress") == null
			) {
				openAddress();
			} else {
				setCurrentAddress(localStorage.getItem("currentAddress"));
			}
		}

		setIsVisible(true);
		//getData();
	}, []);
	useEffect(() => {
		if (currentAddress != "") {
			localStorage.setItem("currentAddress", currentAddress);
		}
		getData();
	}, [currentAddress]);

	const handleNodeHover = (node) => {
		//Sets if node is being hovered on
		if (node) {
			setHover(true);
			setHoverAddress(formatAddress(node.name));
		} else {
			setHover(false);
		}

		//Sets which nodes and links to be highlighted
		highlightNodes.clear();
		highlightLinks.clear();
		try {
			if (node) {
				highlightNodes.add(node);
				filteredData.links.forEach((source) => {
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
		if (link) {
			setHover(true);
			setHoverAddress(
				`${formatAddress(link.source.name)} -> ${formatAddress(
					link.target.name
				)}`
			);
		} else {
			setHover(false);
		}

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

	//Address selector modal open and close
	const openAddress = () => {
		setIsAddressOpen(true);
	};
	const closeAddress = () => {
		setIsAddressOpen(false);
	};

	//Toolbar functions
	const handleBlockies = () => {
		setBlockies(!blockies);
	};

	const handleFreeze = () => {
		setDragFreeze(!dragFreeze);
	};

	const openTimeline = () => {
		setIsTimelineOpen(true);
	};

	const closeTimeline = () => {
		setIsTimelineOpen(false);
	};

	const handleReload = () => {
		getData();
	};

	const openHelpMenu = () => {
		setIsHelpMenuOpen(true);
	};

	const closeHelpMenu = () => {
		setIsHelpMenuOpen(false);
	};

	//Formats address to a more readable format
	const formatAddress = (address) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	//Handles node rendering
	const graphOptions = {
		nodeCanvasObject: (node, ctx) => {
			if (blockies && node.id !== "") {
				// Choose background color depending on if the node is hovered upon
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

				// Render blockies image
				let img = blockiesCache.get(node.id);
				if (!img) {
					img = new Image();
					img.src = makeBlockie(`${node.id || "0"}`);
					blockiesCache.set(node.id, img);
				}
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
				if (highlightNodes.has(node)) {
					if (hoverNode === node) {
						ctx.fillStyle = "#fff";
					} else {
						ctx.fillStyle = "#ccc";
					}
				} else {
					ctx.fillStyle = "#0054b4";
				}

				ctx.fill();
			}
		},
	};

	const getData = async () => {
		setIsLoading(true);
		console.log("Getting data");
		let response;
		try {
			response = await axios.get(
				`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${currentAddress}`
			);

			// response = await axios.get(
			// 	`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${currentAddress}&page=1&offset=1000`
			// );

			const transactions = await response.data.result;
			console.log("Data recieved");
			const nodes = new Map();
			const links = [];

			transactions.forEach((transaction) => {
				const fromAddress = transaction.from;
				const toAddress = transaction.to;
				const transactionTimeStamp = transaction.timeStamp;
				const transactionGasUsed = transaction.gasUsed;
				const transactionHash = transaction.hash;
				const transactionValue = transaction.value;
				const webURL = `https://explorer.testnet.mantle.xyz/tx/${transactionHash}`;

				//Checks if transaction has both addresses
				if (toAddress != "" && fromAddress != "") {
					// Add nodes
					if (!nodes.has(fromAddress) || !nodes.has(null)) {
						nodes.set(fromAddress, {
							id: fromAddress,
							name: fromAddress,
						});
					}
					if (!nodes.has(toAddress) || !nodes.has(null)) {
						nodes.set(toAddress, {
							id: toAddress,
							name: toAddress,
						});
					}

					// Add link
					links.push({
						source: fromAddress,
						target: toAddress,
						timeStamp: transactionTimeStamp,
						gasUsed: transactionGasUsed,
						txValue: transactionValue,
						txHash: transactionHash,
						webURL: webURL,
					});
				}
			});

			const graphData = { nodes: Array.from(nodes.values()), links };
			await setData(graphData);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
			setData([]);
		}
	};

	//Generates filtered data for use by graph (filters by age from the vertical slider)
	useEffect(() => {
		setFilteredData({ nodes: [], links: [] });
		const links = [];
		const nodes = new Map();
		try {
			const uniqueLinks = new Set(); // maintain a set of unique links

			data.links.forEach((link) => {
				if (link.timeStamp >= currentDepth) {
					const newLink = {
						source: link.source,
						target: link.target,
						timeStamp: link.timeStamp,
					};

					const linkId = `${newLink.source}-${newLink.target}`; // create a unique ID for the link

					// check if the link already exists
					if (!uniqueLinks.has(linkId)) {
						uniqueLinks.add(linkId); // add the link ID to the set of unique links
						links.push(newLink); // add the new link to the links array
					}
				}
			});

			data.nodes.forEach((node) => {
				const hasLinks = data.links.some(
					(link) =>
						(link.source === node.id &&
							link.timeStamp >= currentDepth) ||
						(link.target === node.id &&
							link.timeStamp >= currentDepth)
				);
				if (hasLinks) {
					nodes.set(node.id, {
						id: node.id,
						name: node.id,
					});
				}
			});

			const filtData = {
				nodes: Array.from(nodes.values()),
				links,
			};

			console.log(filtData);
			setFilteredData(filtData);
		} catch (e) {}
	}, [currentDepth, data]);

	return (
		<div className="bg">
			<div
				className={`Explore ${isVisible ? "visible" : "hidden"}`}
				style={{ height: windowSize.current[1] }}
			>
				<div className="Explore__Graph">
					{isLoading ? null : (
						<ForceGraph2D
							ref={graphRef}
							graphData={
								filteredData.nodes == undefined
									? { nodes: [], links: [] }
									: filteredData
							}
							autoPauseRedraw={true}
							maxZoom={5}
							minZoom={0.5}
							nodeLabel={""}
							linkColor={() => "#FFF"}
							linkDirectionalParticles={1}
							linkDirectionalParticleSpeed={0.005}
							nodeRelSize={8}
							linkCurvature={0.3}
							linkWidth={(link) =>
								highlightLinks.has(link) ? 5 : 2
							}
							linkDirectionalParticleWidth={(link) =>
								highlightLinks.has(link) ? 7 : 3
							}
							onLinkHover={handleLinkHover}
							onNodeHover={handleNodeHover}
							onNodeClick={(e) => setCurrentAddress(e.id)}
							onNodeDragEnd={
								dragFreeze
									? (node) => {
											node.fx = node.x;
											node.fy = node.y;
											node.fz = node.z;
									  }
									: null
							}
							{...graphOptions}
						/>
					)}
				</div>

				<div className="Explore__SideBar">
					{!isLoading &&
					data.links != undefined &&
					data.links[0] != undefined ? (
						<VerticalGauge
							min={data.links[0].timeStamp}
							max={data.links[data.links.length - 1].timeStamp}
							onChange={setCurrentDepth}
						/>
					) : (
						<VerticalGauge
							onChange={setCurrentDepth}
							min={Math.floor(Date.now() / 1000)}
							max={0}
						/>
					)}
				</div>

				<ToolTip
					active={hover}
					children={
						<div className="Explore__ToolTip">{hoverAddress}</div>
					}
				/>

				<Toolbar
					func0={handleZoom}
					func1={openTimeline}
					func2={handleBlockies}
					func3={handleFreeze}
					func4={handleReload}
					func5={openHelpMenu}
				/>

				<CurrentView address={currentAddress} onClick={openAddress} />

				{!isLoading && data.links != undefined ? (
					<Timeline
						isOpen={isTimelineOpen}
						onClose={closeTimeline}
						transactions={isTimelineOpen ? data.links : undefined}
					/>
				) : null}

				<HelpMenu isOpen={isHelpMenuOpen} onClose={closeHelpMenu} />
				<AddressSelect
					isOpen={isAddressOpen}
					onClose={closeAddress}
					address={currentAddress}
					onChange={setCurrentAddress}
				/>
				{data.nodes == 0 && !isLoading ? (
					<div className="Explore__NoAddress">
						No transactions found
					</div>
				) : null}
				{isLoading ? (
					<div className="Explore__NoAddress">Loading...</div>
				) : null}
				<div className="Explore__Stats">
					{isLoading || data.nodes == undefined
						? "Loading..."
						: `Returned ${data.nodes.length} nodes \n and ${data.links.length} transactions`}
				</div>
				{!isLoading && data.nodes == undefined ? (
					<div className="Explore__NoAddress">Invalid address</div>
				) : null}
			</div>
		</div>
	);
}

export default Explore;
