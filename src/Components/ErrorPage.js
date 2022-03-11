import { useState } from 'react';

const ErrorPage = ({ error = 'page not found' }) => {
  return (
    <div>
      <h2>{error}</h2>
    </div>
  );
};

export default ErrorPage;
