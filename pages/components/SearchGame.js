import { useState } from "react";
import handler from "../api/searchGame";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import RatingModal from "./RatingModal";

function SearchGame() {
  const [searchResults, setSearchResults] = useState([]);
  const [gameTitle, setGameTitle] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const searchGameHandler = async (e) => {
    e.preventDefault();

    const results = await handler(gameTitle);
    setSearchResults(results);
  };

  const addToBacklog = async (game) => {
    try {
      const backlogRef = collection(
        db,
        "backlogs",
        auth.currentUser.uid,
        "games"
      );
      console.log(backlogRef);
      const docRef = await addDoc(backlogRef, {
        gameId: game.id,
        gameName: game.name,
        metacritic: game.metacritic,
        cover: game.cover,
        slug: game.slug,
        length: game.playtime
          ? game.platforms.map((platform) => platform.name).join(", ")
          : "Unknown Platform",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding game to backlog: ", error);
    }
  };

  const openRatingModal = (game) => {
    setSelectedGame(game);
    setShowRatingModal(true);
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
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
      <div className="relative mt-2">
        <div className="absolute z-10 bg-white w-full border border-gray-300 rounded">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => openRatingModal(result)}
            >
              <img
                className="h-16 w-16 object-cover rounded"
                src={result.cover}
                alt={result.name}
              />
              <div className="ml-4">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {result.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Metacritic: {result.metacritic} - PlayTime: {result.playtime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRatingModal && (
        <RatingModal
          game={selectedGame}
          onClose={closeRatingModal}
          addToBacklog={addToBacklog}
        />
      )}
    </form>
  );
}

export default SearchGame;
