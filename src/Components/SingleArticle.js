import { useEffect, useState } from 'react';
import { fetchSingleArticle } from '../api';
import { useParams } from 'react-router-dom';
import { updateVotes } from '../api';
import Comments from './Comments';

const SingleArticle = () => {
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  let { article_id } = useParams();

  useEffect(() => {
    fetchSingleArticle(article_id)
      .then((responseArticle) => {
        setArticle(responseArticle);
        setVotes(responseArticle.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [article_id]);

  const handleClick = (change) => {
    setVotes((currVotes) => currVotes + change);
    updateVotes(article_id, change).catch(() => {
      setVotes(0);
      alert("Couldn't update votes");
    });
  };

  if (isLoading) return <p className="f5 f4-l lh-copy athelas">Loading...</p>;
  return (
    <section className="mw7 center">
      <article className="pv4 bt bb b--black-10 ph3 ph0-l singleArticle">
        <div className="w-100 pr3-ns order-2 order-1-ns">
          <h2 className="athelas ph3 ph0-l">{article.topic}</h2>

          <h1 className="athelas ph3 ph0-l">{article.title}</h1>
          <p className="f5 f4-l lh-copy athelas">{article.body}</p>
          <p>{article.author}</p>
          <p className="f6 lh-copy gray mv0">
            {new Date(article.created_at).toLocaleDateString('en-gb')}
          </p>
          <button
            onClick={() => {
              handleClick(1);
            }}
          >
            ^
          </button>
          <p className="f6 db gray">Votes: {votes}</p>
          <button
            onClick={() => {
              handleClick(-1);
            }}
          >
            v
          </button>
        </div>
      </article>
      <Comments article_id={article_id} />
    </section>
  );
};

export default SingleArticle;
