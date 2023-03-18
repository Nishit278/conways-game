import React from "react";

const Navbar = ({ link }) => {
  return (
    <div className="navbar">
      <h1>Conway's Game</h1>
      <div className="buttons">
        <button className="button">
          <a href={link} target="_blank" rel="noreferrer">
            Rules
          </a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
