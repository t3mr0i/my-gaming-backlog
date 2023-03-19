import React, { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

const SearchGame = ({ onAddGame }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [gameTitle, setGameTitle] = useState(""); // Add this line

  const searchGame = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/searchGame?gameTitle=${gameTitle}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const addToBacklog = async (game) => {
    try {
      const docRef = await addDoc(
        collection(db, "backlogs", auth.currentUser.uid, "games"),
        {
          gameId: game.id,
          gameName: game.name,
          gamePlatform: game.platform,
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding game to backlog: ", error);
    }
  };
  return (
    <form onSubmit={searchGame} className="mb-6">
      <input
        type="text"
        value={gameTitle}
        onChange={(e) => setGameTitle(e.target.value)} // Update this line
        placeholder="Search for a game"
        className="border border-gray-300 p-2 rounded w-full"
      />

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {result.name} - {result.platform}
            <button onClick={() => addToBacklog(result)}>Add to backlog</button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SearchGame;
