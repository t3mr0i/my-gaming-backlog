import { collection, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "./firebase";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const BacklogList = ({ onRemoveGame }) => {
  const [backlog, setBacklog] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {}; // create a dummy unsubscribe function

    if (auth.currentUser) {
      // Check if the user is authenticated
      const q = query(
        collection(db, "backlogs", auth.currentUser.uid, "games")
      );

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const games = [];
        querySnapshot.forEach((doc) => {
          games.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBacklog(games);
      });
    }

    return () => unsubscribe(); // return the unsubscribe function
  }, [auth.currentUser, db]);
  console.log(backlog);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Backlog</h2>
      {backlog.map((game) => (
        <GameCard key={game.id} game={game} onRemove={onRemoveGame} />
      ))}
    </div>
  );
};

export default BacklogList;
