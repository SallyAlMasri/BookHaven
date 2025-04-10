import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
 
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarClick = (newRating) => {
    setCurrentRating(newRating);
    onRatingChange(newRating);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= currentRating) {
      stars.push('full');
    } else if (i === Math.ceil(currentRating) && currentRating % 1 !== 0) {
      stars.push('half'); 
    } else {
      stars.push('empty'); 
    }
  }

  return (
    <div className="star-rating">
      {stars.map((star, index) => (
        <span
          key={index}
          className={`star ${star}`}
          onClick={() => handleStarClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
