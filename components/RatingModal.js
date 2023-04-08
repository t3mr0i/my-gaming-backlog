import React from "react";
import Modal from "./Modal";
import Image from "next/image";

const RatingModal = ({ game, onClose, addToBacklog }) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Rate and Add to Backlog</h3>
        <Image
          layout="responsive"
          objectFit="cover"
          src={game.cover}
          alt={game.name}
          width={1}
          height={1}
          className="rounded"
        />
        <h4 className="text-lg font-bold mb-4">{game.name}</h4>
        {/* Implement rating logic here */}
        <button
          onClick={() => addToBacklog(game)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Add to Backlog
        </button>
      </div>
    </Modal>
  );
};

export default RatingModal;
