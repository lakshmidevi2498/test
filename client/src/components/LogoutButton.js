import React from 'react';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await fetch('/admin/logout', { method: 'POST' });
      window.location.href = '/admin';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;