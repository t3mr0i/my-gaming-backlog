import React, { useState } from "react";
import handler from "./searchGameApi";

const SearchGame = ({ onAddGame }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "") {
      return;
    }

    const games = await handler(searchTerm);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a game to add..."
        className="bg-gray-100 p-2 rounded border border-gray-200 w-full"
      />
    </form>
  );
};

export default SearchGame;
