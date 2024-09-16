'use client';

import Navbar from "./components/Navbar";


const Home = () => {
  return (
    <>
    <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-red-400 flex flex-col justify-center items-center text-white">
      {/* Navbar */}
  

      {/* Main Content */}
      <div className="text-center mt-10">
        <h2 className="text-5xl font-extrabold mb-4">
          Welcome to BuzzChat!
        </h2>
        <p className="text-xl mb-8">
          Connect and chat with your friends in real-time.
        </p>

          <a href="/chat" className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
            Login Now
          </a>
     
      </div>
    </div>
    </>

  );
};

export default Home;
