import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

function TxChart(passedData) {
	const [data, setData] = useState([]);

	useEffect(() => {
		handleData(passedData);
	}, [passedData]);

	const datab = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];

	function handleData(dataParam) {
		const dataArray = dataParam.passedData;

		if (!Array.isArray(dataArray)) {
			return;
		}

		// Group the transactions by day
		const groupedData = dataArray.reduce((acc, curr) => {
			const date = new Date(
				parseInt(curr.timeStamp) * 1000
			).toLocaleDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(curr);
			return acc;
		}, {});

		// Convert the grouped data into an array of objects with the required format
		const formattedData = Object.entries(groupedData).map(
			([date, transactions]) => ({
				date,
				transactions: transactions.length,
			})
		);

		formattedData.reverse();
		console.log(formattedData);

		// Set the formatted data in the state
		setData(formattedData);
	}

	return (
		<div width="100%" height="100%">
			<BarChart
				width={1000}
				height={500}
				data={data}
				margin={{
					right: 50,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="transactions" fill="#8884d8" />
			</BarChart>
		</div>
	);
}

export default TxChart;
