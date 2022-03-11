import { useState } from 'react';

const ErrorPage = ({ error }) => {
  return (
    <div>
      <h2>Uh oh, that page doesn't exist!{error}</h2>
    </div>
  );
};

export default ErrorPage;
