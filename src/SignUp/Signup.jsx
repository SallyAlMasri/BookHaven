import './Signup.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, facebookProvider, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), { 
        uid: user.uid,
        name: name,
        email: email,
        username: username,
        createdAt: new Date() 
      });

      navigate("/");  

    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        username: user.email.split("@")[0],
        createdAt: new Date() 
      });

      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName || "No Name",
        email: user.email || "No Email",
        username: user.email ? user.email.split("@")[0] : "facebook_user",
        profilePicture: user.photoURL,
        createdAt: new Date()
      });

      navigate("/");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="main">
      <div className="imageop">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
      <div className="allmain">
        <form action="" method="POST">
          <h1>Create Account</h1>
          <div className="buttonsSig">
            <button type="button" onClick={handleGoogleSignIn}>Sign up with Google</button>
            <button type="button" id='facebookButton' onClick={handleFacebookSignIn}>Sign up with Facebook</button>
          </div>
          <div className='emails'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="submit">
            <button type="submit" onClick={handleSign}>Sign up</button>
          </div>
          <div className="check">
            <p>Already have an account? <a href="#" onClick={() => navigate('/login')}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
