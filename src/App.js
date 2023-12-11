import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Register from './Register';
import Profile from './Profile';
import Header from './Header';
import Footer from './Footer';
import MessageDetail from './MessageDetail';
import AdminPanel from './AdminPanel';

function App() {
   // Check if the admin user is already present in registeredUsers
   const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
   const isAdminPresent = storedUsers.some(user => user.role==='admin');
 
   // If the admin user is not present, add them to registeredUsers
   if (!isAdminPresent) {
     const adminUser = {
       email: 'admin@bvwa.net',
       nickname: 'bruh224',
       password: 'adm1ni$tratoR',
       firstName: 'Admin',
       lastName: 'User',
       role: 'admin'
       // Add other properties as needed
     };
 
     storedUsers.push(adminUser);
     localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));     
   }
 
   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile loggedInUser={loggedInUser} />} />
	        <Route path="/messages" element={<MessageDetail loggedInUser={loggedInUser}/>}/>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
