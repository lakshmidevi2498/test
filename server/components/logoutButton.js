import React from 'react';
import { Button } from '@adminjs/design-system';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        window.location.href = '/adminpanel';
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

   
    return React.createElement(
      'button',
      { onClick: handleLogout },
      'Logout'
    
  );
};
LogoutButton.isAccessible = true;
LogoutButton.isVisual = true;

export default LogoutButton;
