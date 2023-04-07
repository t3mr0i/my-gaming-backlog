import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
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
        games.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBacklog(games);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {backlog.map((game) => (
          <GameCard key={game.id} game={game} onRemove={onRemoveGame} />
        ))}
      </div>
    </div>
  );
};

export default BacklogList;
