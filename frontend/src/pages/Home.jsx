import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate =useNavigate()
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to <span className="text-amber-400">Crud App</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Explore our curated collection of quality products. Crafted with care,
          delivered with love.
        </p>
        <Button LinkTo ={()=>navigate("/products")}>
          Manage Products
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Quality</h2>
          <p className="text-gray-300">
            We offer premium products that meet the highest standards.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Easy managing</h2>
          <p className="text-gray-300">
            Manage your products effortlessly with our intuitive interface.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Customer Support</h2>
          <p className="text-gray-300">
            Our team is always here to help you with any questions or issues.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
