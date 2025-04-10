import "./Home.css";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const books = [
    "/images/Bok.jpg",
    "/images/Bok2.jpg",
    "/images/Bok3.jpg",
    "/images/mov2.jpg",
    "/images/mov3.jpg",
    "/images/mov4.jpg",
  ];

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [books.length]);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="overlay">
          <h1>Welcome to Book Haven – Your Digital Reading Sanctuary!</h1>
          <p>Discover, Read, and Share Your Favorite Books with the Book Lover Community.</p>
          <div className="hero-buttons">
            <Link to="/books" className="btnm">Explore Books</Link>
            <Link to="/signup" className="btnm secondary">Join Now</Link>
          </div>
        </div>
      </header>

      <section className="Book-pop">
        <h2>Popular Books</h2>
        <div className="carousel-container">
          <div className="bookongo">
            {books.slice(startIndex, startIndex + 3).concat(
              books.slice(0, Math.max(0, 3 - (books.length - startIndex)))
            ).map((book, index) => (
              <div key={index} className="book-cards">
                <img src={book} width="300px" height="300px" alt={`Book ${index}`} />
              </div>
            ))}
          </div>
        
        </div>
        <button onClick={()=>navigate('/Library')}>View More</button>
      </section>

      <section className="about-Home">
  <div className="content">
    <h2>About Us</h2>
    <div className="philo">
      <p><strong>Our Philosophy:</strong></p>
      <p className="philosophy-quote">"We lose ourselves in books, but we find ourselves there too."</p>
    </div>
    <button onClick={()=>navigate('/About')}>Read More</button>
  </div>
  <div className="imgo">
  <p>
      We are three passionate book lovers who believe in the transformative power of reading and the strength of community. Our journey began with a shared longing to connect with fellow readers, to learn about the books they love, and to create a space where we can inspire each other through thoughtful book recommendations.
    </p>  </div>
   
  
</section>


      <section className="community-section">
        <div className="info-chat">
          <h2>Join the Book Lover Community</h2>
          <ul>
            <li>Join groups based on your favorite genres.</li>
            <li>Discuss books, share reviews, and meet fellow book lovers.</li>
            <li>Participate in reading challenges & book club discussions.</li>
          </ul>
          <p> Become part of an engaged reading community today!</p>
          <button onClick={()=>navigate('/ChatApp')}>Join Now</button>
        </div>
        <div className="imgono">
          <img src="/images/des.png" alt="Community" />
        </div>
      </section>

    </div>

  );
}
