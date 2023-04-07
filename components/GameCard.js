import { db, auth, doc } from "./firebase";
import { updateDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Switch from "react-switch";

const GameCard = ({ game, onRemove }) => {
  const [rating, setRating] = useState(game.rating || 0);
  const [similarGames, setSimilarGames] = useState([]);
  const [hoursSpent, setHoursSpent] = useState(game.hoursSpent || 0);
  const [estimatedProgress, setEstimatedProgress] = useState(
    game.estimatedProgress || 0
  );
  const [activelyPlaying, setActivelyPlaying] = useState(
    game.activelyPlaying || false
  );

  useEffect(() => {
    setRating(game.rating || 0);
    setHoursSpent(game.hoursSpent || 0);
    setEstimatedProgress(game.estimatedProgress || 0);
    setActivelyPlaying(game.activelyPlaying || false);
  }, [game]);

  const updateGameInfo = async (field, value) => {
    try {
      await updateDoc(
        doc(db, "backlogs", auth.currentUser.uid, "games", game.id),
        {
          [field]: value,
        }
      );
    } catch (error) {
      console.error("Error updating game info: ", error);
    }
  };

  const changeRating = async (newRating) => {
    setRating(newRating);
    updateGameInfo("rating", newRating);
  };

  const handleHoursSpentChange = (event) => {
    const newHoursSpent = event.target.value;
    setHoursSpent(newHoursSpent);
    updateGameInfo("hoursSpent", newHoursSpent);
  };

  const handleEstimatedProgressChange = (event) => {
    const newEstimatedProgress = event.target.value;
    setEstimatedProgress(newEstimatedProgress);
    updateGameInfo("estimatedProgress", newEstimatedProgress);
  };

  const handleActivelyPlayingChange = (checked) => {
    setActivelyPlaying(checked);
    updateGameInfo("activelyPlaying", checked);
  };

  return (
    <div
      className={`w-64 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg mb-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-110 flex flex-col ${
        activelyPlaying ? "bg-green-100" : ""
      }`}
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={game.cover}
          alt={game.name}
        />
      </div>
      <div className="flex-grow px-6 py-4 flex flex-col">
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
        <div className="mt-4">
          <label
            htmlFor={`hoursSpent-${game.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Hours spent
          </label>
          <input
            type="range"
            id={`hoursSpent-${game.id}`}
            value={hoursSpent}
            onChange={handleHoursSpentChange}
            className="mt-1 block w-full"
            min="0"
            max="500"
          />
          <p className="text-sm text-gray-500">{hoursSpent} hours</p>
        </div>
        <div className="mt-4">
          <label
            htmlFor={`estimatedProgress-${game.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Estimated progress (%)
          </label>
          <input
            type="range"
            id={`estimatedProgress-${game.id}`}
            value={estimatedProgress}
            onChange={handleEstimatedProgressChange}
            className="mt-1 block w-full"
            min="0"
            max="100"
          />
          <p className="text-sm text-gray-500">{estimatedProgress}%</p>
        </div>
        <div className="mt-4 flex items-center">
          <label
            htmlFor={`activelyPlaying-${game.id}`}
            className="block text-sm font-medium text-gray-700 mr-4"
          >
            Actively playing
          </label>
          <Switch
            id={`activelyPlaying-${game.id}`}
            checked={activelyPlaying}
            onChange={handleActivelyPlayingChange}
            on="true"
            color="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0 0 2px 3px #3bf"
            height={15}
            width={40}
            className="react-switch"
          />
        </div>
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
        <div className="mt-auto">
          <button
            className="bg-red-500  text-white rounded py-2 px-4"
            onClick={() => onRemove(game)}
          >
            Remove from backlog
          </button>
        </div>
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
                  src={similarGame.cover}
                  alt={similarGame.name}
                  className="w-full object-cover rounded mb-4 h-32"
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
