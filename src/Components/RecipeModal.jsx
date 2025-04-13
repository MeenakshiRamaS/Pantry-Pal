import React from 'react';

const Modal = ({ recipe, onClose }) => {
  if (!recipe) return null;
  console.log("imag url", recipe.imageUrl);
  return (
    
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#BBBD8E', // Changed background color here
          padding: '20px',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          color: '#472c15',  // Text color for modal
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#63351B',  // Button color
          }}
        >
          ×
        </button>
        <h2 style={{ color: '#63351B' }}>{recipe.title}</h2> {/* Updated title color */}
        <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '100%', borderRadius: '10px' }} />
        <p><strong style={{ color: '#63351B' }}>Description:</strong> {recipe.description}</p> {/* Updated text color */}
        <p><strong style={{ color: '#63351B' }}>⏱️ Cook Time:</strong> {recipe.cook_time} mins</p>
        <p><strong style={{ color: '#63351B' }}>❤️ Likes:</strong> {recipe.likes}</p>
      
        <p><strong style={{ color: '#63351B' }}>🧑‍🍳 Ingredients You Have:</strong></p>
        <ul>
          {recipe.ingredients_present.map((ing, idx) => (
            <li key={idx} style={{ color: '#472c15' }}>{ing}</li> 
          ))}
        </ul>
        <p><strong style={{ color: '#63351B' }}>❌ Missing Ingredients:</strong></p>
        <ul>
          {recipe.missing_ingredients.map((ing, idx) => (
            <li key={idx} style={{ color: '#472c15' }}>{ing}</li> 
          ))}
        </ul>
        <p><strong style={{ color: '#63351B' }}>🍳 Instructions:</strong></p>
        <p>{recipe.recipe}</p>
      </div>
    </div>
  );
};

export default Modal;
