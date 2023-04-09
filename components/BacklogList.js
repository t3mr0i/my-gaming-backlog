import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db, auth, doc, deleteDoc } from "./firebase";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const BacklogList = ({ onRemoveGame }) => {
  const [backlog, setBacklog] = useState([]);
  const fetchBacklogData = async () => {
    if (auth.currentUser) {
      const querySnapshot = await getDocs(
        collection(db, "backlogs", auth.currentUser.uid, "games")
      );
      const games = [];
      querySnapshot.forEach((doc) => {
        const gameData = {
          id: doc.id,
          name: doc.data().gameName, // Map the gameName key to the name key
          ...doc.data(),
        };
        games.push(gameData);
      });
      setBacklog(games);
    }
  };
  const handleRemove = async (gameToRemove) => {
    // Remove the game from the Firebase collection
    try {
      await deleteDoc(
        doc(db, "backlogs", auth.currentUser.uid, "games", gameToRemove.id)
      );
      // Update the local backlog state
      setBacklog(backlog.filter((game) => game.id !== gameToRemove.id));
    } catch (error) {
      console.error("Error removing game: ", error);
    }
  };
  useEffect(() => {
    // Fetch backlog data whenever authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchBacklogData();
      } else {
        setBacklog([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Backlog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backlog.map((game) => (
          <GameCard key={game.id} game={game} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default BacklogList;
