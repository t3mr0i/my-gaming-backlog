import { useState } from "react";
import handler from "../pages/api/searchGameApi";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import RatingModal from "./RatingModal";
import SearchGameCard from "./SearchGameCard";

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
            <SearchGameCard
              key={result.id}
              game={result}
              onRemove={() => {}} // Pass an empty function for onRemove
            />
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
