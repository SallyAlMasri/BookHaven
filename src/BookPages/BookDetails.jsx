import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import StarRating from './StarRating';  
import './BookDetails.css';

const BookDetails = ({ addToBookshelf }) => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { book } = location.state;

  const handleStatusChange = (status) => {
    addToBookshelf(book, status);
  };

  const [rating, setRating] = useState(book.rating);
  const [review, setReview] = useState(''); // State for the review text

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(`New Rating: ${newRating}`);
  };

  const handleReadNowClick = () => {
    window.open(book.pdfUrl, '_blank');
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value); // Update review state on change
  };

  const handleSubmitReview = () => {
    if (!review) {
      alert("Please enter a review before submitting.");
      return;
    }

    console.log("Review submitted:", review); // Log the review to the console
    alert("Review has been saved!"); // Alert when review is saved
    setReview(''); // Clear the review input after submission
  };

  return (
    <div className="book-details">
      <div className="img-con">
        <div className="back-button" onClick={() => navigate('/library')}>
          <FaArrowLeft className="back-icon" />
          <span className="back-text">Back to library</span>
        </div>
    
        <img src={book.image} alt={book.title} className="book-cover" />
        <button className="btn-read-now" onClick={handleReadNowClick}>
          Read Now
        </button>
      </div>
    
      <div className="element-detail">
        <h1 className="h1-detail">{book.title}</h1>
        <h2 className="h2-detail">by {book.author}</h2>
        <StarRating className="rate" rating={rating} onRatingChange={handleRatingChange} />
        <p className="describe-design">{book.description}</p>
        <div className="buttons">
          <button className="btn-completed btn-book" onClick={() => handleStatusChange('completed')}>
            Completed
          </button>
          <button className="btn-reading btn-book" onClick={() => handleStatusChange('reading')}>
            Reading
          </button>
          <button className="btn-wishlist btn-book" onClick={() => handleStatusChange('wishlist')}>
            Add to Wishlist
          </button>
        </div>
    
        <div className="ratings-review">
          <textarea 
            placeholder="Leave a review..." 
            className="comment-box" 
            value={review} 
            onChange={handleReviewChange} // Update review state on change
          ></textarea>
          <button className="btn-submit-review" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;