import BookPage from './BookPages/BookPage';
import BookDetails from './BookPages/BookDetails';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import About from './About/About';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import UserProfile from './UserProfile/UserProfile';
import BookChat from './BookLoverChat/BookLoverChat';
import { auth, signOut, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';
import Bookshelf from './BookShelf/BookShelf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}`);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setIsAuthenticated(!!currentUser);
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            toast.success(`Welcome back, ${userData.name}!`);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err.message);
          toast.success('Welcome back, User!');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out: ', error);
      toast.error('Failed to logout');
    }
  };

  const moveToCompleted = (book) => {
    setCurrentlyReading(prev => prev.filter(b => b.id !== book.id));
    setCompletedBooks(prev => [...prev, book]);
    toast.success(`Moved "${book.title}" to Completed`);
  };

  const moveToReading = (book) => {
    setWishlist(prev => prev.filter(b => b.id !== book.id));
    setCurrentlyReading(prev => [...prev, book]);
    toast.success(`Moved "${book.title}" to Currently Reading`);
  };

  const addToBookshelf = (book, status) => {
    setCompletedBooks(prev => prev.filter(b => b.id !== book.id));
    setCurrentlyReading(prev => prev.filter(b => b.id !== book.id));
    setWishlist(prev => prev.filter(b => b.id !== book.id));

    if (status === 'completed') {
      setCompletedBooks(prev => [...prev, book]);
      toast.success(`Added "${book.title}" to Completed Books`);
    } else if (status === 'reading') {
      setCurrentlyReading(prev => [...prev, book]);
      toast.success(`Added "${book.title}" to Currently Reading`);
    } else if (status === 'wishlist') {
      setWishlist(prev => [...prev, book]);
      toast.success(`Added "${book.title}" to Wishlist`);
    }
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(true); 
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false); 
    handleLogout();
  };

  return (
    <Router>
      <Modal show={showLogoutConfirm } className='modelN' onHide={handleCancelLogout}>
          <div className='model'>
          <Modal.Body className='bodyModel'>Are you sure you want to log out?</Modal.Body>

          <div className="btnModel">
          <Button variant="secondary" onClick={handleCancelLogout}>
            No, Stay
          </Button>
          <Button variant="primary" onClick={handleLogoutConfirm}>
            Yes, Logout
          </Button>
          </div>
          </div>
      </Modal>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />

      <Navbar expand="lg" bg={darkMode ? 'dark' : 'white'} variant={darkMode ? 'dark' : 'light'} className="shadow-sm Navbar">
        <Container className="yesin">
          <Navbar.Brand as={Link} to="/" className="nav-img">
            <img src="../../images/Logo.png" width="100px" alt="Logo" style={{ filter: darkMode ? 'invert(1)' : 'none' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center Nav-links">
              <Nav.Link as={Link} to="/about" id="navoa" className={`me-3 navoa ${darkMode ? 'text-light' : 'text-dark'}`}>
                About
              </Nav.Link>

              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/library" id="navoa" className={`me-3 navoa ${darkMode ? 'text-light' : 'text-dark'}`}>
                    Library
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chatapp" id="navoa" className={`me-3 navoa ${darkMode ? 'text-light' : 'text-dark'}`}>
                    ChatApp
                  </Nav.Link>
                </>
              )}

              {!isAuthenticated ? (
                <Nav.Link as={Link} to="/login" id="navoa" className={`me-3 navoa ${darkMode ? 'text-light' : 'text-dark'}`}>
                  Login
                </Nav.Link>
              ) : (
                <Dropdown className="Nav-links">
                  <Dropdown.Toggle variant="link" id="dropdown-custom-components" className="p-0">
                    <img
                      src={user?.photoURL || '../../images/default.jpg'}
                      alt="Profile"
                      className="profile-img"
                      width="50px"
                      height="50px"
                      style={{
                        cursor: 'pointer',
                        borderRadius: '50%',
                        border: darkMode ? '2px solid #fff' : '2px solid #333',
                      }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={`drop ${darkMode ? 'bg-dark' : 'bg-light'}`}>
                    <Dropdown.Item
                      className={`dropitem ${darkMode ? 'text-light' : 'text-dark'}`}
                      as={Link}
                      to="/UserProfile"
                    >
                      <i className="fas fa-user-cog me-2"></i> Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={`dropitem ${darkMode ? 'text-light' : 'text-dark'}`}
                      as={Link}
                      to="/bookshelf"
                    >
                      <i className="fas fa-book me-2"></i> Bookshelf
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className={`dropitem ${darkMode ? 'text-light' : 'text-dark'}`}
                      as="button"
                      onClick={toggleDarkMode}
                    >
                      <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} me-2`}></i>
                      {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={`dropitem ${darkMode ? 'text-light' : 'text-dark'}`}
                      as="button"
                      onClick={handleConfirmLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={`main-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/library" element={isAuthenticated ? <BookPage darkMode={darkMode} /> : <Login />} />
          <Route path="/library/:id" element={isAuthenticated ? <BookDetails addToBookshelf={addToBookshelf} darkMode={darkMode} /> : <Login />} />
          <Route path="/UserProfile" element={isAuthenticated ? <UserProfile user={user} darkMode={darkMode} /> : <Login />} />
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/chatapp" element={isAuthenticated ? <BookChat darkMode={darkMode} /> : <Login />} />
          <Route
            path="/bookshelf"
            element={isAuthenticated ? (
              <Bookshelf
                completedBooks={completedBooks}
                currentlyReading={currentlyReading}
                wishlist={wishlist}
                onMoveToCompleted={moveToCompleted}
                onMoveToReading={moveToReading}
                darkMode={darkMode}
              />
            ) : <Login />}
          />
        </Routes>
      </div>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}
