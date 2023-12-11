import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    nickname: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Get stored users data
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
  
    // Check login credentials
    const foundUser = storedUsers.find(
      (user) => user.nickname === loginData.nickname && user.password === loginData.password
    );
  
    if (foundUser) {
      // Successful login
      setLoginError(null);
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      console.log('Login success:', loginData.nickname);
      navigate('/');
      window.location.reload();
    } else {
      // Invalid credentials
      setLoginError('Nevalidní login či heslo');
    }
};

  return (
    <form onSubmit={handleLoginSubmit}>
      {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
      <div className="mb-4">
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
        Login
        </label>
        <input
          type="nickname"
          id="nickname"
          name="nickname"
          value={loginData.nickname}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Heslo
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full w-full"
      >
        Přihlásit
      </button>
    </form>
  );
}

export default Login;
