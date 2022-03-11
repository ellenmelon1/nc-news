import { fetchArticles } from '../api';
import { useState, useEffect } from 'react';
import OrderBy from './OrderBy';
import SortBy from './SortBy';
import ArticleCard from './ArticleCard';
import { Link, useParams } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();

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
      <div className="articles ">
        <div className="articles__navbar nowrap overflow-x-auto">
          <h3 className="articles__navbar__header athelas ph3 ph0-l">
            Popular posts
          </h3>
          <div className="articles__navbar__buttons">
            <Link to="/articles">All</Link>
            <Link to="/articles/topics/coding">Coding</Link>
            <Link to="/articles/topics/football">Football</Link>
            <Link to="/articles/topics/cooking">Cooking</Link>
          </div>
          <div className="articles__navbar__dropdowns">
            <SortBy />
            <OrderBy />
          </div>
        </div>

        <section className="mw7 center">
          <div>
            {articles.map(({ topic, title, author, votes, article_id }) => {
              return (
                <Link to={'/articles/' + article_id} key={article_id}>
                  <ArticleCard
                    key={article_id}
                    topic={topic}
                    title={title}
                    author={author}
                    votes={votes}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Articles;
