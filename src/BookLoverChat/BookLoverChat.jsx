import React, { useState, useEffect, useRef } from "react";
import {
  db,
  auth,
  onAuthStateChanged,
  signOut
} from "../firebase"; 
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  doc
} from "firebase/firestore";

import { formatDistanceToNow } from "date-fns";
import "./BookLoverChat.css"; 

const BookChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auth and Username Setup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUsername(currentUser.email.split("@")[0]); // Set the username based on the email
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to chat messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen for typing users
  useEffect(() => {
    const typingRef = collection(db, "typingStatus");
    const unsubscribe = onSnapshot(typingRef, (snapshot) => {
      const typing = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.typing && doc.id !== user?.uid) {
          typing.push(data.user);
        }
      });
      setTypingUsers(typing);
    });
    return () => unsubscribe();
  }, [user]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !user) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      user: username,
      uid: user.uid,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
    await updateTyping(false);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    updateTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => updateTyping(false), 2000);
  };

  const updateTyping = async (typing) => {
    if (!user) return;
    await setDoc(doc(db, "typingStatus", user.uid), {
      user: username,
      typing,
      timestamp: serverTimestamp(),
    });
  };


  const getAvatar = (uid) =>
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${uid}`;


  // If no user is logged in, display a message to sign in
  if (!user) {
    return (
      <div className="chat-container">
        <div className="chat-card">
          <h1>Please sign in to access the chat.</h1>
          <button onClick={() => window.location.href = "/login"}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="chat-card">
        <h1 className="chat-title">
          Book Chat{" "}
          <img
            src="/images/Book.png"
            alt="Book Logo"
            className="chat-logo"
          />
        </h1>


        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                msg.uid === user?.uid
                  ? "chat-bubble-user"
                  : "chat-bubble-other"
              }`}
            >
              <img
                src={getAvatar(msg.uid)}
                alt="avatar"
                className="avatar"
              />
              <div>
                <strong>{msg.user}:</strong> {msg.text}
                <div className="chat-time">
                  {msg.timestamp?.toDate &&
                    formatDistanceToNow(msg.timestamp.toDate(), {
                      addSuffix: true,
                    })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.join(", ")}{" "}
            {typingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}

        <div className="chat-input-container">
          <input
            type="text"
            className="chat-message-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleTyping}
          />
          <button
            className="chat-send-button"
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookChat;
