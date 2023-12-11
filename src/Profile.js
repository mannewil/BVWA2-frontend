import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';

async function Profile(loggedInUser) {  
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({ ...loggedInUser });
  const [originalUserProfile, setOriginalUserProfile] = useState({ ...loggedInUser });

  useEffect(() => {
    setUserProfile({ ...loggedInUser });
    setOriginalUserProfile({ ...loggedInUser });
  }, [loggedInUser]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const profileGetData = await fetch("https://127.0.0.1:8443/user",
  {
      method: "get"
  });      
     if (!profileGetData.ok){
   // setLoginError('Nevalidní login či heslo');
    return;
  }
  const profileGotData = await profileGetData.json();
  console.log(profileGotData)


  const handleSaveProfile = (updatedUser) => {
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = storedUsers.map((u) => (u.email === loggedInUser.email ? updatedUser : u));
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    setEditMode(false);
    setUserProfile(updatedUser);
  };




  const handleCancelEdit = () => {
    setUserProfile(originalUserProfile);
    setEditMode(false);
  };

  return (
    <div>
      <ProfileForm
        user={userProfile}
        onEditToggle={handleEditToggle}
        onSave={handleSaveProfile}
        onCancel={handleCancelEdit}
        editMode={editMode}
      />
    </div>
  );
}

export default Profile;
