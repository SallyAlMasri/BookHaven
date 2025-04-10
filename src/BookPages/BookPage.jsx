import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookPage.css';
import pride from './images/pride.jpg';
import morella from './images/morella.jpg';
import Draculla from './images/Draculla.jpg';
import great from './images/great.jpg';
import romeo from './images/romeo.jpg';
import canterville from './images/canterville.jpg';
import odipus from './images/odipus.jpg';
import ThePearl from './images/The Pearl .jpg';
import mice from './images/mice.jpg';
import animal from './images/animal.jpg';
import war from './images/war.jpg';
import prince from './images/prince.jpg';

const BookCard = ({ title, author, rating, description, image, onRead }) => (
  <div className="book-card">
    <img src={image} alt={title} className="img-book" />
    <div className="element-book">
      <h3>{title}</h3>
      <p>by {author}</p>
      <p className='rating-style'>Rating: {rating}</p>
      <button className="read-btn" onClick={onRead}>Read</button>
    </div>
  </div>
);

const PopularBooks = ({ onReadClick, searchTerm, selectedGenre }) => {
  const [popularBooks, setPopularBooks] = useState( [
    {
      id: 1,
      title: 'Animal Farm',
      author: 'George Orwell',
      rating: '★★★★★',
      image: animal,
      description: 'A political allegory that uses a group of farm animals to satirize the events leading up to the Russian Revolution of 1917 and the early Soviet Union. The story critiques totalitarianism and explores themes of power, corruption, and betrayal.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/animal-farm-george-orwell.pdf',
      genre: 'Political Satire',
      completed: false
    },
    {
      id: 2,
      title: 'Morella',
      author: 'Edgar Allan Poe',
      rating: '★★★★★',
      image: morella,
      description: 'A haunting tale that explores themes of love, death, and the supernatural. The story follows a man who marries a woman named Morella, who possesses a mysterious and dark past. After her death, he discovers the profound impact of her presence on his life.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/morella-edgar-allan-poe.pdf',
      genre: 'Fiction',
      completed: false
    },
    {
      id: 3,
      title: 'Dracula',
      author: 'Bram Stoker',
      rating: '★★★☆☆',
      image: Draculla,
      description: 'A classic horror novel that tells the story of Count Dracula’s attempt to move from Transylvania to England in search of new blood. The narrative unfolds through letters, diary entries, and newspaper articles, creating a chilling atmosphere of suspense and dread.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/dracula-bram-stoker.pdf',
      genre: 'Horror',
      completed: false
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      rating: '★★★☆☆',
      image: great,
      description: 'Set in the Roaring Twenties, this novel follows the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, the story explores themes of wealth, love, and the American Dream.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/the-great-gatsby-f-scott-fitzgerald.pdf',
      genre: 'Classic Literature',
      completed: false
    },
    {
      id: 5,
      title: 'Romeo and Juliet',
      author: 'William Shakespeare',
      rating: '★★★★☆',
      image: romeo,
      description: 'A tragic love story about two young lovers from feuding families in Verona. Their passionate romance ultimately leads to devastating consequences, highlighting themes of love, fate, and the conflict between family loyalty and personal desire.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/romeo-and-juliet-william-shakespeare.pdf',
      genre: 'Tragedy',
      completed: false
    },
    {
      id: 6,
      title: 'The Canterville Ghost',
      author: 'Oscar Wilde',
      rating: '★★★★★',
      image: canterville,
      description: 'A humorous tale about an American family that moves into a haunted English mansion, only to find that the ghost, Sir Simon, is more of a nuisance than a threat. The story blends comedy with themes of cultural differences and the supernatural.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/the-canterville-ghost-oscar-wilde.pdf',
      genre: 'Comedy',
      completed: false
    },
    {
      id: 7,
      title: 'Oedipus the King',
      author: 'Sophocles',
      rating: '★★★☆☆',
      image: odipus,
      description: 'A tragic play that tells the story of Oedipus, a man destined to fulfill a prophecy that foretells he will kill his father and marry his mother. The play explores themes of fate, free will, and the search for truth.',
      pdfUrl: 'https://bnkghjzfdnuqlq pbysvd.supabase.co/storage/v1/object/public/books/oedipus-the-king-sophocles.pdf',
      genre: 'Tragedy',
      completed: false
    },
    {
      id: 8,
      title: 'The Pearl',
      author: 'John Steinbeck',
      rating: '★★★☆☆',
      image: ThePearl,
      description: 'A novella that tells the story of Kino, a poor pearl diver who finds a magnificent pearl that he believes will bring wealth and happiness. However, the pearl brings misfortune and tragedy, exploring themes of greed, ambition, and the nature of wealth.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/the-pearl-john-steinbeck.pdf',
      genre: 'Fiction',
      completed: false
    },
    {
      id: 9,
      title: 'Of Mice and Men',
      author: 'John Steinbeck',
      rating: '★★★★☆',
      image: mice,
      description: 'A poignant tale of friendship between two displaced ranch workers, George and Lennie, during the Great Depression. The story explores themes of dreams, loneliness, and the struggle for a better life.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/of-mice-and-men-john-steinbeck.pdf',
      genre: 'Fiction',
      completed: false
    },
    {
      id: 10,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      rating: '★★★★☆',
      image: pride,
      description: 'A romantic novel that follows the life of Elizabeth Bennet as she navigates issues of class, marriage, and morality in early 19th-century England. The story critiques societal norms and explores the complexities of love and relationships.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/Pride%20and%20Prejudice%20Author%20Jane%20Austen.pdf',
      genre: 'Romantic',
      completed: false
    },
    {
      id: 11,
      title: 'The Art of War',
      author: 'Sun Tzu',
      rating: '★★★☆☆',
      image: war,
      description: 'An ancient Chinese military treatise that offers strategic insights on warfare and conflict management. The text emphasizes the importance of adaptability, deception, and understanding the enemy, making it relevant in both military and business contexts.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/The-Art-of-War-Sun-Tzu.pdf',
      genre: 'Philosophy',
      completed: false
    },
    {
      id: 12,
      title: 'The Prince',
      author: 'Niccolò Machiavelli',
      rating: '★★★★★',
      image: prince,
      description: 'A political treatise that examines the nature of power and leadership. Machiavelli discusses the qualities of an effective ruler and the often harsh realities of political life, advocating for pragmatic and sometimes ruthless approaches to governance.',
      pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books/173.%20The%20Prince%20Author%20Niccolo%20Machiavelli.pdf',
      genre: 'Political Philosophy',
      completed: false
    },
  ]);

  
  const filteredBooks = popularBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true; 
    return matchesSearch && matchesGenre;
  });

  const [visibleBooks, setVisibleBooks] = useState(4);

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 4);
  };

  return (
    <div className="popular-books">
      <h2 className="h2-pop">Popular Books</h2>
      <div className="book-list">
        {filteredBooks.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="book">
            <BookCard
              title={book.title}
              author={book.author}
              rating={book.rating}
              image={book.image}
              description={book.description}
              onRead={() => onReadClick(book)}

            />
</div>
        ))}
      </div>
      {visibleBooks < filteredBooks.length && (
        <button className="load-more" onClick={loadMoreBooks}>Load More</button>
      )}
    </div>
  );
};

// App Component
const BookPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleReadClick = (book) => {
    navigate(`/library/${book.id}`, {
      state: {
        book: { ...book } // This now includes pdfUrl
      }
    });
  };

  return (
    <div className="app">
      <h1>Library</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">All Genres</option>
          <option value="Romantic">Romantic</option>
          <option value="Political Satire">Political Satire</option>
          <option value="Fiction">Fiction</option>
          <option value="Classic Literature">Classic Literature</option>
          <option value="Horror">Horror</option>
          <option value="Tragedy">Tragedy</option>
          <option value="Comedy">Comedy</option>
          <option value="Philosophy">Philosophy</option>
        </select>
      </div>
      <div className="new-releases">
        <h2>New Releases</h2>
        <div className="NewBooks">
          <BookCard
            title="From Mice & Men"
            author="John Steinbeck"
            rating="★★★★☆"
            image ={mice}
            description="A poignant tale of friendship between two displaced ranch workers, George and Lennie, during the Great Depression. The story explores themes of dreams, loneliness, and the struggle for a better life."
            onRead={() => handleReadClick({ id: 14, title: "From Mice & Men", author: "John Steinbeck", description: "A poignant tale of friendship between two displaced ranch workers, George and Lennie, during the Great Depression. The story explores themes of dreams, loneliness, and the struggle for a better life.", image: mice, pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books//of-mice-and-men-john-steinbeck.pdf' })}
          />
          <BookCard
            title="The Great Gatsby"
            author="Scott Fitzgerald"
            rating="★★★★★"
            image={great}
            description="The Great Gatsby is a novel set in the Roaring Twenties that follows the life of Jay Gatsby, a mysterious millionaire, and his obsession with the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, the story explores themes of wealth, love, and the American Dream, ultimately revealing the moral decay hidden beneath the glittering surface of society."
            onRead={() => handleReadClick({ id: 15, title: "The Great Gatsby", author: "Scott Fitzgerald", description: "The Great Gatsby is a novel set in the Roaring Twenties that follows the life of Jay Gatsby, a mysterious millionaire, and his obsession with the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, the story explores themes of wealth, love, and the American Dream, ultimately revealing the moral decay hidden beneath the glittering surface of society", image: great, pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books//the-great-gatsby-f-scott-fitzgerald.pdf' })}
          />
          <BookCard
            title="The Art of War"
            author="Sun Tzu"
            rating="★★★★★"
            image={war}
            description="The Art of War is an ancient Chinese military treatise that offers strategic insights on warfare and conflict management. It emphasizes the importance of adaptability, deception, and understanding the enemy, making it relevant not only in military contexts but also in business and personal strategy."
            onRead={() => handleReadClick({ id: 13, title: 'The Art of War', author: 'Sun Tzu', rating: '★★★★★', image: war, description: 'The Art of War is an ancient Chinese military treatise that offers strategic insights on warfare and conflict management. It emphasizes the importance of adaptability, deception, and understanding the enemy, making it relevant not only in military contexts but also in business and personal strategy.', pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books//The-Art-of-War-Sun-Tzu.pdf' })}
          />
          <BookCard
            title="Dracula"
            author="Bram Stoker"
            rating="★★★☆☆"
            image={Draculla}
            description="Dracula is a classic horror novel that tells the story of Count Dracula’s attempt to move from Transylvania to England in search of new blood. The narrative unfolds through letters, diary entries, and newspaper articles, creating a chilling atmosphere of suspense and dread as a group of people, led by Professor Abraham Van Helsing, try to stop him."
            onRead={() => handleReadClick({ id: 12, title: 'Dracula', author: 'Bram Stoker', rating: '★★★☆☆', image: Draculla, description: 'Dracula is a classic horror novel that tells the story of Count Dracula’s attempt to move from Transylvania to England in search of new blood. The narrative unfolds through letters, diary entries, and newspaper articles, creating a chilling atmosphere of suspense and dread as a group of people, led by Professor Abraham Van Helsing, try to stop him.', pdfUrl: 'https://bnkghjzfdnuqlqpbysvd.supabase.co/storage/v1/object/public/books//dracula-bram-stoker.pdf' })}
          />
        </div>
      </div>
      <PopularBooks onReadClick={handleReadClick} searchTerm={searchTerm} selectedGenre={selectedGenre} />
    </div>
  );
};

export default BookPage;