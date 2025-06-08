import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Loader = () => {
  const navigate = useNavigate();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [navigate, nextUrl]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm tracking-widest text-gray-700 uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
