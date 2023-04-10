import React, { useState } from "react";
import Image from "next/image";

const SearchGameCard = ({
  game,
  addToBacklog,
  removeFromBacklog,
  isInBacklog,
}) => {
  const [isAdded, setIsAdded] = useState(isInBacklog);
  const [isHovering, setIsHovering] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-700";
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-400";
    return "bg-red-500";
  };

  const translatePlatform = (platform) => {
    if (!platform) return null;
    return platform.replace("PlayStation", "PS");
  };

  const handleClick = () => {
    if (isAdded) {
      removeFromBacklog(game);
    } else {
      addToBacklog(game);
    }
    setIsAdded(!isAdded);
  };

  const handleMouseEnter = () => {
    if (isAdded) {
      setIsHovering(true);
    }
    setShowGenres(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowGenres(false);
  };

  return (
    <div
      className="w-56 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg my-4 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-110 flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-40 overflow-hidden relative">
        <img
          src={game.cover}
          alt={game.name}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute top-0 left-0 w-full h-full rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs p-2">
          <h3 className="text-lg font-bold">{game.title}</h3>
          <div className="text-sm">
            <span className="font-semibold">{game.name}</span>{" "}
          </div>
        </div>

        <div
          className={`rounded-full w-10 mx-2 my-2 h-10 flex items-center justify-center absolute top-2 left-auto right-2 text-white font-bold text-lg ${getScoreColor(
            game.metacritic
          )}`}
        >
          {game.metacritic}
        </div>
        {showGenres && (
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs p-2">
            {game.genres.join(", ")}
          </div>
        )}
      </div>
      <div className="flex-grow px-6 py-4 flex flex-col">
        <h2 className="text-xl font-semibold">{game.title}</h2>
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Release Year:</span>{" "}
          {new Date(game.releaseDate).getFullYear()}
        </div>
        <div className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Platforms:</span>{" "}
          {game.platforms.slice(0, 4).map((platform, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-xs inline-block ml-2"
            >
              {translatePlatform(platform)}
            </span>
          ))}
          {game.platforms.length > 4 && (
            <span className="text-xs text-gray-700 ml-1">+ more</span>
          )}
        </div>
        <div className="mt-auto">
          <button
            className={`${
              isAdded
                ? isHovering
                  ? "bg-red-500"
                  : "bg-green-500"
                : "bg-blue-500"
            } text-white px-4 py-1 rounded mr-2 transition-colors duration-300`}
            onClick={handleClick}
          >
            {isAdded ? (isHovering ? "Remove" : "Added") : "Add to backlog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchGameCard;
