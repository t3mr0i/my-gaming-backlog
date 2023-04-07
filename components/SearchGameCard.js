import React from "react";
import styles from "../styles/SearchGame.module.css";

const SearchGameCard = ({ game }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={game.cover} alt={game.name} />
      <div className={styles.details}>
        <div className={styles.name}>{game.name}</div>
        {game.genres && (
          <div className={styles.genres}>
            {game.genres.map((genre) => (
              <span key={genre} className={styles.genre}>
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className={styles.metacritic}>Metacritic: {game.metacritic}</div>
      </div>
    </div>
  );
};

export default SearchGameCard;
