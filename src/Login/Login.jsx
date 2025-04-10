import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, facebookProvider, googleProvider } from '../firebase';
import {  signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("../"), 1500);
    } catch (error) {
      console.error("Login error:", error.code, error.message);

      const errorMessages = {
        "auth/user-not-found": "The email address you entered is not registered.",
        "auth/wrong-password": "The password you entered is incorrect.",
        "auth/invalid-credential": "The email or password you entered is incorrect.",
        "auth/invalid-email": "The email address format is invalid.",
        "auth/user-disabled": "This user account has been disabled.",
      };

      setErrorMessage(errorMessages[error.code] || `Login failed. Please try again. [${error.code}]`);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if(!docSnap.exists()){
        await setDoc(userRef,{
          uid:user.uid,
          name:user.displayName,
          email:user.email,
          username:user.email.split("@")[0],
          createAt:new Date(),

        });
      }
      setSuccessMessage("Google sign-in successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
  
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setErrorMessage("Google sign-in failed. Please try again.");

    }
  };

  const handleFacebookSignIn = async () => {
    setErrorMessage("");
    setSuccessMessage("");  
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        uid: user.uid,
        name: user.displayName || "Facebook User",
        email: user.email || "No Email",
        username: user.email ? user.email.split("@")[0] : "facebook_user",
        profilePicture: user.photoURL,
        createdAt: new Date()
      });
    }
    setSuccessMessage("Facebook sign-in successful! Redirecting...");
    setTimeout(() => navigate("/"), 1500);

      } catch (error) {
        console.error("Facebook Sign-In Error:", error.message);
        if (error.code === "auth/account-exists-with-different-credential") {
          setErrorMessage("This email is already registered with another login method. Try using Google or Email/Password.");
        } else {
          setErrorMessage("Facebook sign-in failed. Please try again.");
        }
    
      }
};
  return (
    <div className="main">
      <div className="allmain">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="buttonsSig">
            <button type="button" onClick={handleGoogleSignIn}>Continue with Google</button>        
            <button type="button" id='facebookButton' onClick={handleFacebookSignIn}>Continue with Facebook</button>
            </div>
          <div className='emails'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="submit">
            <button type="submit">Login</button>
          </div>

          <div className="check">
            <p>Don't have an account? <a href="#" onClick={() => navigate('/SignUp')}>SignUp</a></p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>

      <div className="imageLo">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
    </div>
  );
}
