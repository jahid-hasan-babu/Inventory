import React from "react";
import { Button } from "@mui/material";

const KeyAction = () => {
  return (
    <div>
      <section className="bg-white ">
        <div className="container mx-auto py-7 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Key Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Inventory Value
              </h3>
              <p className="text-3xl font-bold text-gray-800">$150,000</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Stock
              </h3>
              <p className="text-3xl font-bold text-gray-800">1,500</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Stock Turnover Rate
              </h3>
              <p className="text-3xl font-bold text-gray-800">2.5%</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Low Stock Alerts
              </h3>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to take control of your inventory?
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto">
            Start managing your inventory today and see real-time insights into
            your business.
          </p>
          <Button variant="outlined" color="inherit" size="large">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default KeyAction;
