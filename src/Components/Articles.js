import { fetchArticles } from '../api';
import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import SortBy from './SortBy';
import ArticleCard from './ArticleCard';
import { Link, useParams } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState('desc');

  const { topic } = useParams();

  useEffect(() => {
    fetchArticles(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [topic, sortBy, order]);

  return (
    <section className="mw7 center">
      <div className="articles">
        <div className="articles__navbar">
          <h3 className="articles__navbar__header athelas ph3 ph0-l">
            Popular posts
          </h3>
          <div className="articles__navbar__buttons">
            <Link to="/articles">
              <button>All</button>
            </Link>
            <Link to="/articles/topics/coding">
              <button>Coding</button>
            </Link>
            <Link to="/articles/topics/football">
              <button>Football</button>
            </Link>
            <Link to="/articles/topics/cooking">
              <button>Cooking</button>
            </Link>
          </div>
          <div className="articles__navbar__dropdowns">
            <SortBy setSortBy={setSortBy} />
            <ToggleSwitch label={'Order:'} setOrder={setOrder} />
          </div>
        </div>

        <section className="mw7 center">
          <div>
            {articles.map(
              ({ comment_count, topic, title, author, votes, article_id }) => {
                return (
                  <Link to={'/articles/' + article_id} key={article_id}>
                    <ArticleCard
                      key={article_id}
                      topic={topic}
                      title={title}
                      author={author}
                      votes={votes}
                      commentCount={comment_count}
                    />
                  </Link>
                );
              }
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Articles;
