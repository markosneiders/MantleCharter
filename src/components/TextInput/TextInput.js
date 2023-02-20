import React, { useEffect, useState } from "react";

const TextInput = ({ placeholder, value, onChange }) => {
	const [text, setText] = useState(value);

	useEffect(() => {
		setText(value);
	}, [value]);

	const handleChange = (event) => {
		const newText = event.target.value;
		setText(newText);
		onChange(newText);
	};
	return (
		<input
			type="text"
			placeholder={placeholder}
			value={text}
			onChange={handleChange}
			style={{
				marginTop: "8px",
				padding: "8px",
				border: "none",
				borderRadius: "5px",
				borderWidth: "0px",
				backgroundColor: "#002140",
				color: "white",
				fontFamily: "Comfortaa, cursive",
				fontWeight: "900",
				fontSize: "22px",
				outline: "none",
			}}
		/>
	);
};

export default TextInput;
