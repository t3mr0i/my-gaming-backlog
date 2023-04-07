import { db, auth } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";

const GameCard = ({ game, onRemove }) => {
  const [rating, setRating] = useState(0);
  const [similarGames, setSimilarGames] = useState([]);

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

      await addDoc(collection(db, "activities", "userActivities"), activity);

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
    <div className="w-64 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg mb-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-110">
      <img className="w-64" src={game.cover} alt={game.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{game.name}</div>
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
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Metacritic: {game.metacritic}
        </span>
        {game.genres &&
          game.genres.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {genre}
            </span>
          ))}
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-red-500 text-white rounded py-2 px-4"
          onClick={() => onRemove(game)}
        >
          Remove from backlog
        </button>
      </div>
      {similarGames.length > 0 && (
        <div className="px-6 pt-4 pb-2">
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
                  src={game.cover}
                  alt={game.name}
                  className="w-full object-cover rounded mb-4"
                  style={{ maxHeight: "100px" }}
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
