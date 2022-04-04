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
  const { loggedIn } = useContext(loggedInUser);
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
    postComment(article_id, commentToPost, loggedIn).then((newComment) => {
      setComments((currComments) => {
        return [newComment, ...currComments];
      });
    });
    setCommentToPost('');
    setSubmitButtonMsg('Submit');
    setDisable(false);
  };

  return (
    <section className="mw7 center">
      <h2 className="postComment articles__navbar__header athelas ph5 ">
        Comments
      </h2>
      <form className="postComment black-80" onSubmit={handleSubmit}>
        <label htmlFor="comment_input" className="f6 b db mb3 ph5">
          Post a comment:
        </label>
        <textarea
          type="text"
          name="comment_input"
          className="commentBox f6 b db ml5"
          value={commentToPost}
          onChange={(event) => {
            setCommentToPost(event.target.value);
          }}
        ></textarea>
        <button
          type="submit"
          className="athelas f6 b db mb3 ml5 mt2 pv2 ph3 f6 link dim br3 ph3 pv2 mb2 dib white bg-gray"
          disabled={disable}
        >
          {submitButtonMsg}
        </button>
      </form>
      <div>
        {comments.map(({ body, created_at, author, votes, comment_id }) => {
          return (
            <CommentCard
              setComments={setComments}
              key={comment_id}
              commentId={comment_id}
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
