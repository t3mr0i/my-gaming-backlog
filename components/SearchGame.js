import { useState, useEffect } from "react";
import handler from "../api/searchGameApi";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import RatingModal from "./RatingModal";
import SearchGameCard from "./SearchGameCard";

function SearchGame() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [userBacklog, setUserBacklog] = useState([]);

  const searchGameHandler = async (e) => {
    e.preventDefault();
    const results = await handler(searchInput);
    setSearchResults(results);
  };

  const removeFromBacklog = async (game) => {
    try {
      const backlogRef = collection(
        db,
        "backlogs",
        auth.currentUser.uid,
        "games"
      );

      const q = query(backlogRef, where("gameId", "==", game.id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      console.log("Game removed from backlog");
    } catch (error) {
      console.error("Error removing game from backlog: ", error);
    }
  };

  const addToBacklog = async (game) => {
    try {
      const backlogRef = collection(
        db,
        "backlogs",
        auth.currentUser.uid,
        "games"
      );
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

  useEffect(() => {
    const fetchUserBacklog = async () => {
      // Fetch user's backlog here and store it in the setUserBacklog
    };

    fetchUserBacklog();
  }, []);

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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a game"
        className="border border-gray-300 p-2 rounded w-full"
      />
      <div className="relative mt-2">
        <div className="absolute z-10 bg-white w-full border border-gray-300 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result) => (
              <SearchGameCard
                key={result.id}
                game={result}
                addToBacklog={addToBacklog}
                removeFromBacklog={removeFromBacklog}
                isInBacklog={userBacklog.some(
                  (backlogGame) => backlogGame.gameId === result.id
                )}
              />
            ))}
          </div>
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
