import React, { useEffect, useState } from "react";
import { Hero, Featured, Testimonial, Newsletter, Footer } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm tracking-widest text-gray-700 uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  // Main Page Content
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
      <div className="flex items-center justify-center bg-gray-100">
        <Testimonial />
      </div>
      <div className="flex items-center justify-center">
        <Newsletter />
      </div>
      <div className="bg-gray-100">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
