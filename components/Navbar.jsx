import React from "react";

const Navbar = () => {
  return (
    <div className="flex flex-wrap justify-around py-3">
      <h1 className="text-lg font-semibold">Todo App</h1>
      <ul className="flex gap-5 text-m">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Products</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
