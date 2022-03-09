import { fetchArticles } from '../api';
import { useState, useEffect } from 'react';
import OrderBy from './OrderBy';
import SortBy from './SortBy';
import ArticleCard from './ArticleCard';
import { useNavigate, Link } from 'react-router-dom';

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [topic, setTopic] = useState(undefined);

  useEffect(() => {
    fetchArticles(topic)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [topic]);

  return (
    <section className="mw7 center">
      <div className="articles">
        <div className="articles__navbar">
          <h3 className="articles__navbar__header athelas ph3 ph0-l">
            Popular posts
          </h3>
          <div className="articles__navbar__buttons">
            <button onClick={() => handleClick(undefined, setTopic, navigate)}>
              All
            </button>
            <button onClick={() => handleClick('coding', setTopic, navigate)}>
              Coding
            </button>
            <button onClick={() => handleClick('football', setTopic, navigate)}>
              Football
            </button>
            <button onClick={() => handleClick('cooking', setTopic, navigate)}>
              Cooking
            </button>
          </div>
          <div className="articles__navbar__dropdowns">
            <SortBy />
            <OrderBy />
          </div>
        </div>

        <section className="mw7 center">
          <div>
            {articles.map(({ topic, title, author, votes }) => {
              return (
                <ArticleCard
                  key={title}
                  topic={topic}
                  title={title}
                  author={author}
                  votes={votes}
                />
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

const handleClick = (value, setTopic, navigate) => {
  if (value === undefined) {
    navigate(`/articles`);
  } else {
    navigate(`/articles/${value}`);
  }
  setTopic(value);
};

export default Articles;
