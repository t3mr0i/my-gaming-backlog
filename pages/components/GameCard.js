import { collection, onSnapshot, query, getDocs } from "firebase/firestore";
import { db, auth, app } from "./firebase";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const GameCard = ({ game, onRemove }) => {
  const [rating, setRating] = useState(0);
  const [similarGames, setSimilarGames] = useState([]);
  console.log(db);
  const changeRating = async (newRating) => {
    setRating(newRating);
    if (auth.currentUser) {
      const activity = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        gameId: game.id,
        gameName: game.name,
        rating: newRating,
      };

      await db.collection("activities").add(activity);
      if (newRating >= 4) {
        const response = await axios.get(
          `/api/recommendations?slug=${game.slug}`
        );
        setSimilarGames(response.data);
      } else {
        setSimilarGames([]);
      }
    }
  };

  return (
    <div className="bg-white p-6 mb-6 rounded shadow">
      <img
        src={game.cover}
        alt={game.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
      <div className="mb-2">
        <StarRatings
          rating={rating}
          starRatedColor="#fca728"
          starHoverColor="#fca728"
          changeRating={changeRating}
          numberOfStars={5}
          name={game.id}
          starDimension="20px"
          starSpacing="2px"
        />
      </div>
      <button
        className="bg-red-500 text-white rounded py-2 px-4"
        onClick={() => onRemove(game)}
      >
        Remove from backlog
      </button>
      {similarGames.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mt-6 mb-4">
            Similar games you may like:
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {similarGames.map((similarGame) => (
              <div
                key={similarGame.id}
                className="bg-gray-100 p-4 rounded shadow"
              >
                <img
                  src={similarGame.cover}
                  alt={similarGame.name}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h5 className="text-lg font-semibold">{similarGame.name}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;
