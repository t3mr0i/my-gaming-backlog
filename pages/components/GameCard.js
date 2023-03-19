import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";
import StarRatings from "react-star-ratings";

const GameCard = ({ game, onRemove }) => {
  const [rating, setRating] = useState(0);
  const [similarGames, setSimilarGames] = useState([]); // Add a state to store similar games

  const changeRating = async (newRating) => {
    setRating(newRating);
    if (auth.currentUser) {
      const activity = {
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        gameId: game.id,
        gameName: game.name,
        rating: newRating,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
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

    // ...

    return (
      <div className="bg-white p-6 mb-6 rounded shadow">
        {/* ... */}
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
                    src={similarGamecover}
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
};
export default GameCard;
