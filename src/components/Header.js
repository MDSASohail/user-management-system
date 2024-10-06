import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const Header = () => (
  <header className="header">
    <h1><FaUsers /> User Management App</h1>
    <nav>
      <Link to="/">Home</Link>
    </nav>
  </header>
);

export default Header;
