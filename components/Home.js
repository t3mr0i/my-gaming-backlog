import React, { useState } from "react";
import BacklogList from "./components/BacklogList";
import SearchGame from "./components/SearchGame";
import Header from "./components/Header";
import ActivityFeed from "./components/ActivityFeed";

export default function Home() {
  const [backlog, setBacklog] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const addGameToBacklog = (game) => {
    setBacklog([...backlog, game]);
  };

  const removeGameFromBacklog = (gameId) => {
    setBacklog(backlog.filter((game) => game.id !== gameId));
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Heading
        showLoginForm={showLoginForm}
        showRegisterForm={showRegisterForm}
        handleLoginButtonClick={handleLoginButtonClick}
        handleRegisterButtonClick={handleRegisterButtonClick}
      />
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h1 className="text-4xl font-bold mb-4">My Gaming Backlog</h1>
          <SearchGame onAddGame={addGameToBacklog} />
          <BacklogList backlog={backlog} onRemoveGame={removeGameFromBacklog} />
          <div className="col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
