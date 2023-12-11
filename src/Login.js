import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({loggedInUser}) {
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();  
      // Successful login
      setLoginError(null);
     // Build formData object.
    let formData = new FormData();
    formData.append('user', loginData.nickname);
    formData.append('password', loginData.password);
    
    const loginGetData = await fetch("https://127.0.0.1:8443/auth/login",
    {
        body: formData,
        method: "post"
    });      
       if (!loginGetData.ok){
      setLoginError('Nevalidní login či heslo');
      return;
    }
    const loginGotData = await loginGetData.json();
    localStorage.setItem('1', JSON.stringify(loginGotData))
    
      //navigate('/');
     // window.location.reload();
    }

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
