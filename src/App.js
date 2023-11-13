import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Register from './Register';
import Profile from './Profile';
import Header from './Header';
import Footer from './Footer';

function App() {
  // Retrieve logged-in user information from local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

  return (
    <Router>
      <div>
        <Header loggedInUser={loggedInUser} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile loggedInUser={loggedInUser} />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
