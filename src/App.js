import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle.js';
import { loggedInUser } from './Components/contexts';
import { errorMsg } from './Components/contexts';
import ErrorPage from './Components/ErrorPage';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState('tickle122');
  const [error, setError] = useState();
  return (
    <loggedInUser.Provider value={{ loggedIn, setLoggedIn }}>
      <errorMsg.Provider value={{ error, setError }}>
        <BrowserRouter>
          <div className="container">
            <Header loggedIn={loggedIn} />
            <Routes>
              <Route path="/" element={<Articles setError={setError} />} />
              <Route
                path="/articles"
                element={<Articles setError={setError} />}
              />
              <Route
                path="/articles/topics/:topic"
                element={<Articles setError={setError} />}
              />
              <Route
                path="/articles/:article_id"
                element={<SingleArticle setError={setError} />}
              />
              <Route path="*" element={<ErrorPage error={error} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </errorMsg.Provider>
    </loggedInUser.Provider>
  );
}

export default App;
