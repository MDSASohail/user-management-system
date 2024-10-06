import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <FaSpinner className="spinner" />
    <span>Loading...</span>
  </div>
);

export default LoadingSpinner;
