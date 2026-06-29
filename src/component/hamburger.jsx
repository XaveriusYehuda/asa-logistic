import React, { useState } from "react";

const HamburgerButton = ({ isHamburgerActive, handleToggle }) => {
	// const [isHamburgerActive, setIsHamburgerActive] = useState(false);

	// const handleToggle = () => {
	// 	setIsHamburgerActive(!isHamburgerActive);
	// };

	return (
		<button onClick={handleToggle} className={`flex flex-col h-[15px] w-[20px] justify-between`}>
			<span className={`${isHamburgerActive ? 'rotate-45' : ''} origin-top-left h-[2px] w-full bg-white rounded transition duration-300 ease-in-out`}></span>
			<span className={`${isHamburgerActive ? 'scale-0' : ''} h-[2px] w-full bg-white rounded transition duration-300 ease-in-out`}></span>
			<span className={`${isHamburgerActive ? '-rotate-45' : ''} origin-bottom-left h-[2px] w-full bg-white rounded transition duration-300 ease-in-out`}></span>
		</button>
	);
};

export default HamburgerButton;