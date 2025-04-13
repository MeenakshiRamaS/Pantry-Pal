import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function RecipeCard({ recipe, onClick }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.stopPropagation(); // prevent modal from opening on heart click
    setLiked((prev) => !prev);
  };

  return (
    <div className="recipe-card" onClick={onClick} style={{ position: 'relative' }}>
      {/* Heart Icon */}
      <div className="heart-icon" onClick={toggleLike} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
        {liked ? <FaHeart color="#EB6422" size={24} /> : <FaRegHeart color="#EB6422" size={24} />}
      </div>

      <img
        src={recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-info">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <p>⏱️ Cook Time: {recipe.cook_time} mins</p>
        <p>❤️ {recipe.likes} likes</p>
      </div>
    </div>
  );
}

export default RecipeCard;
