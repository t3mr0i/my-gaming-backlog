import { useState } from "react";
import handler from "../api/searchGame";
function SearchGame() {
  const [searchResults, setSearchResults] = useState([]);
  const [gameTitle, setGameTitle] = useState("");

  const searchGameHandler = async (e) => {
    e.preventDefault();

    const results = await handler(gameTitle);
    setSearchResults(results);
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
    <form onSubmit={searchGameHandler} className="mb-6">
      <input
        type="text"
        value={gameTitle}
        onChange={(e) => setGameTitle(e.target.value)}
        placeholder="Search for a game"
        className="border border-gray-300 p-2 rounded w-full"
      />

      <ul>
        {searchResults &&
          searchResults.map((result) => (
            <li key={result.id}>
              {result.name} -{""}- Metacritic: {result.metacritic} -{" "}
              <button onClick={() => addToBacklog(result)}>
                Add to backlog
              </button>
            </li>
          ))}
      </ul>
    </form>
  );
}

export default SearchGame;
