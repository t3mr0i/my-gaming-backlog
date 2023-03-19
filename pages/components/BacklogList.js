import React from 'react';
import GameCard from './GameCard';

const BacklogList = ({ backlog, onRemoveGame }) => {
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
