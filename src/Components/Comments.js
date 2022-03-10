import { fetchComments } from '../api';
import CommentCard from './CommentCard';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { postComment } from '../api';
import { loggedInUser } from './contexts';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentToPost, setCommentToPost] = useState('');
  const [submitButtonMsg, setSubmitButtonMsg] = useState('Submit');
  const [disable, setDisable] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(loggedInUser);
  const { article_id } = useParams();

  useEffect(() => {
    fetchComments(article_id)
      .then((commentsFromResponse) => {
        setComments(commentsFromResponse);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [article_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitButtonMsg('Posting...');
    setDisable(true);
    postComment(article_id, commentToPost, loggedIn);
    setCommentToPost('');
    setTimeout(() => {
      setSubmitButtonMsg('Submit');
      setDisable(false);
    }, 1000);
  };

  return (
    <section className="mw7 center">
      <h2 className="articles__navbar__header athelas ph3 ph0-l">Comments</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment_input">Post a comment:</label>
        <textarea
          type="text"
          name="comment_input"
          value={commentToPost}
          onChange={(event) => {
            setCommentToPost(event.target.value);
          }}
        ></textarea>
        <button type="submit" disabled={disable}>
          {submitButtonMsg}
        </button>
      </form>
      <div>
        {comments.map(({ body, created_at, author, votes, comment_id }) => {
          return (
            <CommentCard
              key={comment_id}
              body={body}
              created_at={created_at}
              author={author}
              votes={votes}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Comments;
