import React from "react";
import { getMetacriticColor } from "./helpers";

const SearchGameCard = ({ game, onRemove }) => {
  // Extract the year from the release date
  const releaseYear = game.releaseDate
    ? new Date(game.releaseDate).getFullYear()
    : "Unknown";

  const metacriticColor = getMetacriticColor(game.metacritic);

  const MetacriticScore = () => {
    if (game.metacritic >= 90) {
      return (
        <div className={`star ${metacriticColor} text-white text-center`}>
          {game.metacritic}
        </div>
      );
    } else {
      return (
        <div className={`rounded-md ${metacriticColor} text-white text-center`}>
          {game.metacritic}
        </div>
      );
    }
  };

  return (
    <div className="bg-white p-4 border border-gray-300 rounded">
      <div className="flex">
        <div className="mr-4">
          <img
            src={game.cover}
            alt={`Cover art for ${game.name}`}
            className="rounded w-28 h-28"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold">{game.name}</h3>
            <p className="text-sm">{releaseYear}</p>
            <div className="mt-2">
              {game.genres.map((genre, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 p-1 rounded mr-1"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-2">
              {game.platforms.map((platform, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 p-1 rounded mr-1"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
              onClick={() => addToBacklog(game)}
            >
              Add to backlog
            </button>
            {game.metacritic && <MetacriticScore />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchGameCard;
