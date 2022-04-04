import { loggedInUser } from './contexts';
import { useContext, useState } from 'react';
import { deleteComment } from '../api';

const CommentCard = ({
  setComments,
  body,
  created_at,
  author,
  votes,
  commentId,
}) => {
  const { loggedIn } = useContext(loggedInUser);
  const [buttonMsg, updateButtonMsg] = useState('Delete comment');
  const [disable, setDisable] = useState(false);

  const handleClick = (event, commentId) => {
    event.preventDefault();
    updateButtonMsg('Deleting');
    setDisable(true);
    deleteComment(commentId).then(() => {
      setComments((currComments) => {
        return currComments.filter(
          (comment) => comment.comment_id !== commentId
        );
      });
    });
  };

  return (
    <article className="commentCard articleCards pv4 bt bb b--black-10 ph5">
      <div className=" w-100 pr3-ns order-2 order-1-ns">
        <p className="f5 f4-l lh-copy athelas">{body}</p>
        <p className="f6 lh-copy gray mv0">
          {new Date(created_at).toLocaleDateString('en-gb')}
        </p>
        <p className="f6 lh-copy gray mv0">Author: {author}</p>
        {author === loggedIn ? (
          <button
            className="deleteCommentButton"
            onClick={(event) => {
              handleClick(event, commentId);
            }}
            disabled={disable}
          >
            {buttonMsg}
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default CommentCard;
