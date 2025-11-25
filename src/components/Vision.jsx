import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Make sure you use react-router-dom v6+

const sections = [
	{
		key: "vision",
		title: "VISION",
		text: "To become Nigeria’s most trusted platform for discovering, promoting, and shopping from physical stores helping businesses grow and making shopping easier for customers everywhere.",
		button: "Learn More",
		icon: "pi-eye", // 👁️ Vision
		iconColor: "bg-blue-500 text-white",
	},
	{
		key: "mission",
		title: "MISSION",
		text: "Empower store owners with easy digital tool, Help shoppers find trusted local stores online, Support SME growth across Nigeria, Modernize traditional retail with simple technology",
		button: "Read Mission",
		icon: "pi-send", // 📨 Mission (action/delivery)
		iconColor: "bg-green-500 text-white",
	},
	{
		key: "services",
		title: "CORE SERVICES",
		text: "Simple product uploads, Wider customer reach, Direct buyer–seller communication, Logistics support options, Featured listings for more visibility, A trusted and secure platform for real Nigerian shops",
		button: "See Services",
		icon: "pi-briefcase", // 💼 Services
		iconColor: "bg-yellow-500 text-white",
	},
	{
		key: "values",
		title: "COMPETITIVE EDGE",
		text: "Direct communication between stores and customers, Support for delivery & logistics options, Affordable pricing for store owners, Easy-to-use platform with no technical skills needed, Focus on Nigerian physical stores and markets",
		button: "Discover Values",
		icon: "pi-star", // ⭐ Competitive Edge
		iconColor: "bg-red-500 text-white",
	},
];

export default function Vission() {
	const scrollRef = useRef(null);
	const [scrollIndex, setScrollIndex] = useState(0);
	const [maxHeight, setMaxHeight] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const navigate = useNavigate();

	// Listen for resize to set mobile/desktop
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Calculate max height for all cards for equal height
	useEffect(() => {
		setTimeout(() => {
			if (scrollRef.current) {
				const heights = Array.from(scrollRef.current.children).map(
					(el) => el.offsetHeight
				);
				setMaxHeight(Math.max(...heights));
			}
		}, 100);
	}, []);

	// Scroll handler for left/right buttons
	const handleScroll = (direction) => {
		let cardsInView = isMobile ? 1 : 3;
		let maxIndex = sections.length - cardsInView;
		let newIndex = scrollIndex;
		if (direction === "left") {
			newIndex = Math.max(0, scrollIndex - 1);
		} else {
			newIndex = Math.min(maxIndex, scrollIndex + 1);
		}
		setScrollIndex(newIndex);
		if (scrollRef.current) {
			const cardWidth = scrollRef.current.children[0].offsetWidth + 32; // 32px for gap-8
			scrollRef.current.scrollTo({
				left: cardWidth * newIndex,
				behavior: "smooth",
			});
		}
	};

	// Thumb scroll handler
	const handleThumbScroll = () => {
		if (scrollRef.current) {
			const cardWidth = scrollRef.current.children[0].offsetWidth + 32;
			setScrollIndex(
				Math.round(scrollRef.current.scrollLeft / cardWidth)
			);
		}
	};

	// Button click navigates to About page
	const handleButtonClick = () => {
		navigate("/about");
	};

	return (
		<div
			className="relative min-h-screen flex flex-col z-0 justify-center items-center pb-40 "
			style={{
				backgroundImage: "url(https://res.cloudinary.com/dvxq96bcp/image/upload/v1763203898/samples/ecommerce/analog-classic.jpg)",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Black overlay */}
			<div className="absolute inset-0  bg-opacity-60 z-0"></div>

			{/* Content */}
			<div className="relative z-10 w-full flex flex-col items-center">
				<div className="font-semibold text-3xl tracking-wider text-white mt-32 text-center">
					VISION, MISSION & CORE SERVICES
				</div>
				<div className="text-white text-xl mt-8 text-center">
					Learn more about our values and what we do
				</div>
				{/* Cards with scroll and buttons */}
				<div className="w-full flex justify-center items-center mt-20 relative">
					{/* Left button */}
					<button
						className="absolute left-2 top-1/2 z-20 bg-white/30 hover:bg-white/60 text-black rounded-full p-2"
						style={{ transform: "translateY(-50%)" }}
						onClick={() => handleScroll("left")}
						disabled={scrollIndex === 0}
						aria-label="Scroll left"
					>
						<i className="pi pi-angle-left text-2xl" />
					</button>
					{/* Scrollable cards */}
					<div
						ref={scrollRef}
						className={`flex overflow-x-auto snap-x snap-mandatory gap-8 px-2 md:px-0 w-full max-w-7xl scrollbar-hide`}
						style={{
							scrollBehavior: "smooth",
							msOverflowStyle: "none", // IE and Edge
							scrollbarWidth: "none", // Firefox
						}}
						onScroll={handleThumbScroll}
					>
						{sections.map((item) => (
							<div
								key={item.key}
								className="shadow-lg text-center rounded-2xl group duration-300 px-8 py-12 leading-10 bg-white/20 backdrop-blur-md hover:bg-white/10 hover:ease-in
                  flex flex-col items-center justify-center
                  w-96 min-w-[350px] h-full
                  snap-center"
								style={{
									flex: isMobile ? "0 0 80vw" : "0 0 32%",
									maxWidth: "400px",
									height: maxHeight ? `${maxHeight}px` : "auto",
								}}
							>
								<i
									className={`pi ${item.icon} text-3xl p-6 rounded-full ${item.iconColor}`}
								></i>
								<div className="font-bold text-xl mb-2 mt-3 text-white tracking-wide">
									{item.title}
								</div>
								<p className="text-white leading-6 mt-4 text-sm w-full">
									{item.text}
								</p>
								<button
									className="mt-8 px-4 py-2 text-xs border-2 text-white bg-white/10 rounded"
									onClick={handleButtonClick}
								>
									{item.button}
								</button>
							</div>
						))}
					</div>
					{/* Right button */}
					<button
						className="absolute right-2 top-1/2 z-20 bg-white/30 hover:bg-white/60 text-black rounded-full p-2"
						style={{ transform: "translateY(-50%)" }}
						onClick={() => handleScroll("right")}
						disabled={scrollIndex === sections.length - (isMobile ? 1 : 3)}
						aria-label="Scroll right"
					>
						<i className="pi pi-angle-right text-2xl" />
					</button>
				</div>
			</div>
		</div>
	);
}