import React from 'react';
import { Link } from 'react-router-dom';
// import NotFoundImage from './path-to-your-image.jpg'; // Make sure to replace this with the actual path to your image

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-xl text-gray-600">Page Not Found</p>
      <p className="mt-4 text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/dashboard" className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
