import { fetchArticles } from '../api';
import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import SortBy from './SortBy';
import ArticleCard from './ArticleCard';
import ErrorPage from './ErrorPage';
import { Link, useParams } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const [errorMsg, setErrorMsg] = useState(null);

  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState('desc');

  const { topic } = useParams();

  useEffect(() => {
    fetchArticles(topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setErrorMsg(err.msg);
      });
  }, [topic, sortBy, order]);

  if (errorMsg) return <ErrorPage error={errorMsg} />;

  return (
    <section className="mw7 center athelas">
      <div className="articles">
        <div className="articles__navbar pv3">
          <div className="articles__navbar__buttons cf">
            <Link
              to="/articles"
              className="fl w-25 tc f5 fw5 db black no-underline underline-hover"
            >
              All
            </Link>
            <Link
              to="/articles/topics/coding"
              className="fl w-25 tc f5 fw5 db black no-underline underline-hover"
            >
              Coding
            </Link>
            <Link
              to="/articles/topics/football"
              className="fl w-25 tc f5 fw5 db black no-underline underline-hover"
            >
              Football
            </Link>
            <Link
              to="/articles/topics/cooking"
              className="fl w-25 tc f5 fw5 db black no-underline underline-hover"
            >
              Cooking
            </Link>
          </div>
          <div className="articles__navbar__dropdowns pt3 pb3 pl4">
            <div>
              <SortBy setSortBy={setSortBy} />
            </div>
            <div>
              <ToggleSwitch label={'Order:'} setOrder={setOrder} />
            </div>
          </div>
        </div>

        <section className="mw7 center">
          <div>
            {articles.map(
              ({
                comment_count,
                topic,
                title,
                author,
                votes,
                article_id,
                created_at,
              }) => {
                return (
                  <ArticleCard
                    key={article_id}
                    topic={topic}
                    title={title}
                    author={author}
                    votes={votes}
                    commentCount={comment_count}
                    articleId={article_id}
                    createdAt={created_at}
                  />
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
