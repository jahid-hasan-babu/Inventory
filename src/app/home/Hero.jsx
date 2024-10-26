import React from "react";
import { Button } from "@mui/material";

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-100  flex flex-col justify-center items-center text-center px-4 py-12 ">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to Your Inventory Management Dashboard
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Monitor, manage, and optimize your inventory effortlessly.
        </p>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default Hero;
