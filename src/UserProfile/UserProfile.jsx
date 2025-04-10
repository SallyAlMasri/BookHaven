import { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { supabase } from "../supabaseClient"; 
import "./UserProfile.css";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    profileImage: "",
    twitter: "",
    instagram: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser(userSnap.data());
            toast.success(`Welcome back, ${userSnap.data().name}!`);
          } else {
            console.log("No user data found!");
          }
        } catch (err) {
          console.error("Error fetching user profile:", err.message);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${auth.currentUser.uid}-${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("profile")
        .upload(fileName, file);

      if (error) {
        console.error("Upload error:", error.message);
        return;
      }

      const imageUrl = supabase.storage
        .from("profile")
        .getPublicUrl(fileName).data.publicUrl;

      setUser({ ...user, profileImage: imageUrl });
    }
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, user, { merge: true });
      setEditing(false);
      toast.success(`Profile updated successfully, ${user.name}!`);
    } catch (err) {
      console.error("Error updating profile:", err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user profile found.</p>;

  return (
    <div className="profile-container">
      {editing ? (
        <div className="profile-card">
          <div className="profile-image" onClick={() => fileInputRef.current.click()} style={{ cursor: "pointer" }}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              ref={fileInputRef} 
              style={{ display: "none" }}
            />
            <img src={user.profileImage || "/default-avatar.png"} alt="Profile" />
          </div>
          <div className="profile-details">
            <label>Name</label>
            <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <label>Username</label>
            <input type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <label>Bio</label>
            <textarea value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} />
            <label>Twitter</label>
            <input type="text" value={user.twitter} onChange={(e) => setUser({ ...user, twitter: e.target.value })} />
            <label>Instagram</label>
            <input type="text" value={user.instagram} onChange={(e) => setUser({ ...user, instagram: e.target.value })} />
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      ) : (
        <div className="profile-card">
          <div className="profile-image">
            <img src={user.profileImage || "/default-avatar.png"} alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
            <p className="bio">{user.bio || "📖 Book lover!"}</p>
            <button className="edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}
