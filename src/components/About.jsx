// App.js
import { useEffect, useRef, useState } from "react";


function App() {
  const [isInView, setIsInView] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const sectionRef = useRef(null);

  // Show up arrow when scrolled down
  useEffect(() => {
    const handleScroll = () => setShowUpArrow(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);


  const firstHalf = (
    <>
      Welcome to <strong>Emmatex</strong>, the online marketplace designed exclusively for physical stores in Nigeria.
      Our mission is to help local shops expand beyond their walls and reach customers close to them or nationwide without the stress or cost of building a separate website.
      Every day, millions of Nigerians buy from local markets, plazas, and shops, yet many of these businesses remain invisible online.
      Emmatex was created to change that by providing a simple, powerful, and colorful digital platform that brings the vibrancy of Nigerian markets to the internet.
      At Emmatex, we are committed to transparency, growth, innovation, and supporting Nigerian businesses. We aim to create a future where every physical store can thrive online.
      Whether you are a store owner seeking more customers or a shopper looking for trusted Nigerian sellers close to you, Emmatex is your destination.
    </>
  );

  const secondHalf = (
    <>
      <br />
       What We Offer
      <br />
      <br />
      - Simple product uploads
      <br />
      <br />
      - Wider customer reach
      <br />
      <br />
      - Direct buyer–seller communication.
      <br />
      <br />
      - Featured listings for more visibility.
      <br />
      <br />
      Many physical stores struggle with the challenges of going online
      high website costs, limited marketing, and lack of technical skills.
      Emmatex removes these barriers by giving every shop a beautiful, functional, 
      and easy-to-use digital storefront.
      <br />
      <br />
      Our vision is to become Nigeria’s most trusted platform for discovering, 
      promoting, and shopping from physical stores close to you or nationwide
      helping businesses grow and making shopping easier for customers everywhere.
      <br />
      <br />
      Thank you for trusting us. We look forward to serving you and supporting Nigerian businesses.
      <br />
      <br />
    </>
  );

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col-reverse md:flex-row justify-between items-center min-h-screen px-4 py-8 md:py-0 md:px-16 transition-colors duration-300`}
    >
      {/* Left Content */}
      <div
        className= {`${
          isInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
        } flex-1 ${
          showFull
            ? "w-full max-w-4xl px-2 md:px-12 mt-8 md:mt-0"
            : "w-full md:w-auto md:px-8 mt-8 md:mt-0"
        }`}
      >
        <h1 className="text-3xl mt-20 sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to Emmatex
        </h1>
        <p
          className={`mt-5 text-base sm:text-md ${showFull ? "w-full max-w-3xl" : "w-full md:w-[550px]"}`}
        >
          {firstHalf}
          {showFull && secondHalf}
        </p>
        <div className="flex gap-4 mt-6 mb-10">
          {!showFull ? (
            <button
              className="text-white bg-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(true)}
            >
              Learn more
            </button>
          ) : (
            <button
              className="text-blue-500 bg-white border border-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(false)}
            >
              Show less
            </button>
          )}
        </div>
      </div>
        {/* Right Image */}
        <div>
        <img src="https://res.cloudinary.com/dvxq96bcp/image/upload/v1763343063/file_00000000085871f490b0941a45ff2020_icnl91.png" alt="About Emmatex" className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg" />
        </div>
     
    </div>
  );
}

export default App;
