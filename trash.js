const getData = async () => {
	let response;
	try {
		response = await axios.get(
			`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=0x7fC8eBFB82Bdac3e9D358E7fCcE6604144939739`
		);

		const resultData = response.data.result;
		const nodes = [];
		const nodeIds = new Set();
		const links = [];
		nodes.push({
			id: nodeIds.size,
			name: "0x7fC8eBFB82Bdac3e9D358E7fCcE6604144939739",
		});
		// Object.keys(resultData).forEach((transaction) => {
		// 	if (!nodeIds.has(transaction.to)) {
		// 		nodes.push({ id: nodeIds.size, name: transaction.to });
		// 		nodeIds.add(transaction.to);
		// 	}
		// });
		// links.push({
		// 	source: nodeIds.size,
		// 	target: 1,
		// });
		// setApiData({ nodes, links });
		// console.log(apiData);
		Object.keys(resultData).forEach((transaction) => {
			console.log(transaction.to);
		});
	} catch (err) {
		console.error(err);
	}
};
