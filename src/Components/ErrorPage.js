import { useState } from 'react';

const ErrorPage = ({ error = 'page not found' }) => {
  return (
    <div className="errorPage mw7 center athelas">
      <h2>{error}</h2>
      <p>Click the home button to go back to safety</p>
    </div>
  );
};

export default ErrorPage;
