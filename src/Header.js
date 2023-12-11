import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('1')) || null;

  const [user, setUser] = useState(loggedInUser);

  const handleLogout = () => {
    // Perform logout logic (e.g., clear user data from localStorage)
    localStorage.removeItem('loggedInUser');
    setUser(null);

    navigate('/');
    window.location.reload();
  };

  const handleDebug = () => {
    // Log the registeredUsers array to the console
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    console.log('Registrované uživatele:', registeredUsers);
  };

  return (
    <header className="bg-purple-500 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Webovka!</div>
        <ul className="space-x-4 flex items-center">
          {/* Home link always visible */}
          <li>
            <Link to="/" className="text-white hover:text-purple-300">
              Index
            </Link>
          </li>
          {/* Display debug button */}
          <li>
            <button onClick={handleDebug} className="text-white hover:text-purple-300 focus:outline-none">
              Debug
            </button>
          </li>
          {/* Display profile and log-out button if the user is logged in */}
          {user && (
            <>
              <li>
                <Link to="/profile" className="text-white hover:text-purple-300">
                  <img
                    src={user.profilePicture || 'default-profile-pic.jpg'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  Ahoj, {user.firstName}
                </Link>
              </li>
              {loggedInUser.role==="admin" && (
                <li>
                  <Link to="/admin" className="text-white hover:text-purple-300">
                    Panel adminu
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-purple-300 focus:outline-none"
                >
                  Odhlásit
                </button>
              </li>
              <li>
              <Link to="/messages" className="text-white hover:text-purple-300">
                    Zpravy
                  </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;