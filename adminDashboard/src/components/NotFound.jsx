import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="errorSection flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <Link to="/" className="text-lg text-blue-600 hover:underline mb-4">
        <p>Go Back</p>
      </Link>
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <div className="text-2xl text-gray-600">Page Not Found</div>
    </div>
  );
};

export default NotFound;
