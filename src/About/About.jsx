import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="overlaymn"></div>

      <div className="about-header">
        <h1>Welcome to Our Book Community!</h1>
      </div>

      <div className="author">
        <div className="info">
          <h1>Who We Are</h1>
          <p>
          We are three passionate book lovers who believe in the transformative power of reading and the strength of community. Our journey began with a shared longing to connect with fellow readers, to learn about the books they love, and to create a space where we can inspire each other through thoughtful book recommendations.

          </p>
        </div>
      </div>

 
      <div className="about-section with-image">
        <div className="story">
          <h1>Our Story</h1>
          <p>
            Our journey began with a simple goal: to create a digital home for book lovers. 
            We wanted a place where people could track their reading, leave reviews, and 
            find their next favorite book—all in one place. That dream is now a reality.
          </p>
        </div>
      </div>

      
      <div className="about-section">
  <div className="lays">
  <div className="vision">
  <h1>Our Vision</h1>
    <p>
      To foster a community of lifelong learners who can share their passion for
      books, exchange knowledge, and create lasting friendships through the magic of reading.
    </p>
  </div>
  </div>
</div>
      <div className="about-sections">
  <h1>Our Mission</h1>
  <div className="mission-circle-container">
    <div className="mission-circle">
      <i className="fas fa-book"></i>
      <p>To offer an interactive book tracking experience.</p>
    </div>
    <div className="mission-circle">
      <i className="fas fa-users"></i>
      <p>To connect book lovers through reviews and ratings.</p>
    </div>
    <div className="mission-circle">
      <i className="fas fa-lightbulb"></i>
      <p>To make reading more engaging and accessible.</p>
    </div>
  </div>
</div>


<div className="about-section">
  <h1>Our Values</h1>
  <div className="values-container">
    <div className="value-card">
      <strong>Passion for Books:</strong>
      <p>We celebrate the love of reading.</p>
    </div>
    <div className="value-card">
      <strong>Community:</strong>
      <p>A space where book lovers connect.</p>
    </div>
    <div className="value-card">
      <strong>Accessibility:</strong>
      <p>Making books available to everyone.</p>
    </div>
    <div className="value-card">
      <strong>Innovation:</strong>
      <p>Improving the reading experience.</p>
    </div>
  </div>
</div>

    </div>
  );
};

export default About;
