import { useEffect, useState } from 'react';
import { fetchSingleArticle } from '../api';
import { useParams } from 'react-router-dom';
import { updateVotes } from '../api';
import Comments from './Comments';

const SingleArticle = () => {
  const [article, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [downvoteButtonStatus, setDownvoteButtonStatus] = useState(false);
  const [upvoteButtonStatus, setUpvoteButtonStatus] = useState(false);

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
        <div className="singleArticle w-100 ph5">
          <h3 className="athelas ph0-l">{article.topic}</h3>

          <h1 className="athelas ph0-l">{article.title}</h1>
          <p className="f5 f4-l lh-copy athelas ph0-l">{article.body}</p>
          <p className="f6 lh-copy gray mv0 pv1 ph0-l">
            Author: {article.author}
          </p>
          <p className="f6 lh-copy gray mv0 pv2 ph0-l">
            {new Date(article.created_at).toLocaleDateString('en-gb')}
          </p>
          <div className="SingleArticle__votes">
            <p className="f6 lh-copy gray mv0 pv2 ph0-l">Votes: {votes}</p>
            <button
              className={`downvoteButtonStatus-${downvoteButtonStatus} f6 lh-copy gray ph3 pv1 ml3 dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray`}
              onClick={() => {
                if (
                  upvoteButtonStatus === false &&
                  downvoteButtonStatus === false
                ) {
                  setDownvoteButtonStatus(true);
                  handleClick(-1);
                }
                if (
                  upvoteButtonStatus === false &&
                  downvoteButtonStatus === true
                ) {
                  setDownvoteButtonStatus(false);
                  handleClick(1);
                }
                if (
                  upvoteButtonStatus === true &&
                  downvoteButtonStatus === false
                ) {
                  setDownvoteButtonStatus(true);
                  setUpvoteButtonStatus(false);
                  handleClick(-2);
                }
                // if(upvoteButtonStatus === true && downvoteButtonStatus === true) should never happen
              }}
            >
              &#128078;
            </button>
            <button
              className={`upvoteButtonStatus-${upvoteButtonStatus} f6 lh-copy gray ph3 pv1 ml3 dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray`}
              onClick={() => {
                if (
                  downvoteButtonStatus === false &&
                  upvoteButtonStatus === false
                ) {
                  handleClick(1);
                  setUpvoteButtonStatus(true);
                }
                if (
                  downvoteButtonStatus === true &&
                  upvoteButtonStatus === false
                ) {
                  handleClick(2);
                  setUpvoteButtonStatus(true);
                  setDownvoteButtonStatus(false);
                }
                if (
                  upvoteButtonStatus === true &&
                  downvoteButtonStatus === false
                ) {
                  setUpvoteButtonStatus(false);
                  handleClick(-1);
                }
              }}
            >
              &#128077;
            </button>
          </div>
        </div>
        <Comments articleId={article_id} />
      </article>
    </section>
  );
};

export default SingleArticle;
