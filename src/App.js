import "./App.css";
import Wave from "react-wavify";

function App() {
	return (
		<div className="App">
			<Wave
				className="App__Wave"
				fill="#f79902"
				paused={false}
				options={{
					height: 460,
					amplitude: 40,
					speed: 0.2,
					points: 5,
				}}
			/>
			<Wave
				className="App__Wave"
				fill="#ff00ff"
				paused={false}
				options={{
					height: 480,
					amplitude: 40,
					speed: 0.2,
					points: 5,
				}}
			/>
			<Wave
				className="App__Wave"
				fill="#0000ff"
				paused={false}
				options={{
					height: 500,
					amplitude: 40,
					speed: 0.2,
					points: 5,
				}}
			/>
		</div>
	);
}

export default App;
