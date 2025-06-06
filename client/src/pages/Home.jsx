import React from "react";
import { Hero, Featured } from "../components";

const Home = () => {
  return (
    <div>
      <div className="relative h-screen bg-cover bg-center bg-[url('/background.webp')]">
        <div className="absolute inset-0 bg-black/50 bg-opacity-40"></div>
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Featured />
      </div>
    </div>
  );
};

export default Home;
