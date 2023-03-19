import React, { useState } from "react";
import BacklogList from "./components/BacklogList";
import SearchGame from "./components/SearchGame";
import Header from "./components/header";
import ActivityFeed from "./components/ActivityFeed";
export default function Home() {
  const [backlog, setBacklog] = useState([]);

  const addGameToBacklog = (game) => {
    setBacklog([...backlog, game]);
  };

  const removeGameFromBacklog = (gameId) => {
    setBacklog(backlog.filter((game) => game.id !== gameId));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header className="bg-blue-600 py-6" />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h1 className="text-4xl font-bold mb-4">My Gaming Backlog</h1>
          <SearchGame onAddGame={addGameToBacklog} />
          <BacklogList backlog={backlog} onRemoveGame={removeGameFromBacklog} />
          <div className="col-span-1">
            <ActivityFeed />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
