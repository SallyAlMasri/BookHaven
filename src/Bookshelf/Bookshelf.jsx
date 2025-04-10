import React from 'react';
import './Bookshelf.css';

const Bookshelf = ({ completedBooks, currentlyReading, wishlist, onMoveToCompleted, onMoveToReading }) => {
  
  const BookCard = ({ book, moveFunction, buttonLabel }) => (
    <div className="book-cardson">
      <img src={book.image} alt={book.title} className="img-book" />
      <div className="element-book">
        <h3>{book.title}</h3>
        <p>by {book.author}</p>
        <p className='rating-style'>Rating: {book.rating}</p>
        {moveFunction && (
          <button className="book-action-btn btn-book" onClick={() => moveFunction(book)}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bookshelf">
      <h2>Your Bookshelf</h2>

      <h3 className='news'>Currently Reading</h3>
      <div className="book-listnm">
        {currentlyReading.map(book => (
          <BookCard key={book.id} book={book} moveFunction={onMoveToCompleted} buttonLabel="Mark as Completed" />
        ))}
      </div>

      <div className="shelf-divider"></div>

      <h3 className='news'>Next Up</h3>
      <div className="book-listnm">
        {wishlist.map(book => (
          <BookCard key={book.id} book={book} moveFunction={onMoveToReading} buttonLabel="Start Reading" />
        ))}
      </div>

      <div className="shelf-divider"></div>

      <h3 className='news'>Finished</h3>
      <div className="book-listnm">
        {completedBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
