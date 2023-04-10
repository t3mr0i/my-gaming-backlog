import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import Switch from "react-switch";
import ReactCardFlip from "react-card-flip";
import CircularProgress from "@mui/material/CircularProgress";
import "@mui/material/styles";
import { analyzeGameAttributes } from "../pages/api/analyzeGameAttributes";
import { useAuthState } from "react-firebase-hooks/auth";
import { getReviews, getSteamId, getTagsAndReviews } from "../lib/steam";
import { db, auth, doc } from "./firebase";
import { updateDoc } from "firebase/firestore";
import { analyzeReviews } from "../lib/openAi";

const GameCard = ({ game, onRemove }) => {
  const [user] = useAuthState(auth); // Add this line

  const [rating, setRating] = useState(game.rating || 0);
  const [hoursSpent, setHoursSpent] = useState(game.hoursSpent || 0);
  const [softFeatures, setSoftFeatures] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [gameTags, setGameTags] = useState([]);
  const [reviews, setReviews] = useState([]);
  if (!user) {
    return <div>Loading...</div>;
  }
  const [estimatedProgress, setEstimatedProgress] = useState(
    game.estimatedProgress || 0
  );
  const [activelyPlaying, setActivelyPlaying] = useState(
    game.activelyPlaying || false
  );
  async function fetchSoftFeatures(tags, reviews) {
    try {
      const { data } = await axios.post("/api/analyzeGameAttributes", {
        tags,
        reviews,
      });
      return data.softFeatures;
    } catch (error) {
      console.error("Error fetching soft features: ", error);
      return "";
    }
  }

  const fetchAndAnalyzeReviews = async (gameName) => {
    try {
      const steamId = await getSteamId(gameName);
      const fetchedReviews = await getReviews(steamId);
      console.log(steamId);

      if (fetchedReviews) {
        console.log("in if");
        const tags = await analyzeReviews(fetchedReviews);
        console.log("Tags:", tags);
        setGameTags(tags);
        setReviews(fetchedReviews); // Update the state with the fetched reviews
      }
    } catch (error) {
      console.error("Error fetching and analyzing reviews:", error.message);
    }
  };
  const analyzeAttributes = async () => {
    //setLoadingAnalysis(true);
    try {
      const res = await fetch("/api/analyzeGameAttributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: gameTags || [], // Ensure that this is an array
          reviews: reviews || [], // Updated line
        }),
      });
      const data = await res.json();
      setSoftFeatures(data.softFeatures);
    } catch (error) {
      console.error("Error analyzing game attributes: ", error);
    } finally {
      // setLoadingAnalysis(false);
    }
  };

  const fetchGameTags = async () => {
    if (!game.name) {
      console.error("Invalid game name: ", game.name);
      return;
    }

    setLoadingTags(true); // Set loadingTags to true at the beginning of the function

    await fetchAndAnalyzeReviews(game.name); // Remove the unnecessary lines

    setLoadingTags(false); // Set loadingTags to false at the end of the function
  };
  useEffect(() => {
    setRating(game.rating || 0);
    setHoursSpent(game.hoursSpent || 0);
    setEstimatedProgress(game.estimatedProgress || 0);
    setActivelyPlaying(game.activelyPlaying || false);
  }, [game]);

  useEffect(() => {
    if (isFlipped && !dataFetched) {
      fetchGameTags();
      setDataFetched(true);
    }
  }, [isFlipped, dataFetched]);

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
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!dataFetched) {
      fetchGameTags();
      setDataFetched(true);
    }
  };

  useEffect(() => {
    if (isFlipped && dataFetched && gameTags.length > 0 && reviews.length > 0) {
      analyzeAttributes();
    }
  }, [isFlipped, dataFetched, gameTags, reviews]);

  useEffect(() => {
    if (isFlipped && !dataFetched) {
      fetchGameTags();
      setDataFetched(true);
    }
  }, [isFlipped, dataFetched]);

  useEffect(() => {}, [isFlipped, dataFetched, gameTags]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      {/* Front side of the card */}
      <div
        className={`w-64 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg mb-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-110 flex flex-col ${
          activelyPlaying ? "bg-green-100" : ""
        }`}
        onClick={handleFlip}
      >
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={game.cover}
            alt={game.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute top-0 left-0 w-full h-full rounded-t-lg"
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
              onChange={(e) => {
                e.stopPropagation();
                handleHoursSpentChange(e);
              }}
              className="mt-1 block w-full"
              min="0"
              max="500"
            ></input>
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
              onChange={(e) => {
                e.stopPropagation();
                handleEstimatedProgressChange(e);
              }}
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
        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
          <div>
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
          <div className="w-6 h-6 border-r-2 border-gray-600 transform rotate-45"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            className="bg-red-500 text-white rounded py-2 px-4"
            onClick={() => onRemove(game)}
          >
            Remove from backlog
          </button>
        </div>
      </div>

      {/* Back side of the card */}
      <div
        className={`w-64 max-w-md bg-white border border-gray-200 rounded-lg shadow-lg mb-6 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-110 flex flex-col ${
          activelyPlaying ? "bg-green-100" : ""
        }`}
        onClick={handleFlip}
      >
        <div className="flex-grow px-6 py-4 flex flex-col">
          <div className="font-bold text-xl mb-2">{game.name}</div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            {loadingTags ? (
              <CircularProgress />
            ) : (
              <div className="flex flex-wrap">
                {gameTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between items-center">
          <div className="w-6 h-6 border-r-2 border-gray-600 transform rotate-45"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <button
            className="bg-red-500 text-white rounded py-2 px-4"
            onClick={() => onRemove(game)}
          >
            Remove from backlog
          </button>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default GameCard;
