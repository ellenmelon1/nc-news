import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle.js';
import { loggedInUser } from './Components/contexts';
import ErrorPage from './Components/ErrorPage';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState('tickle122');

  return (
    <loggedInUser.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
        <div className="container">
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/topics/:topic" element={<Articles />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </loggedInUser.Provider>
  );
}

export default App;
