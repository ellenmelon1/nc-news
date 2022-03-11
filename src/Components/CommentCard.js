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
        const copyComments = [...currComments];
        const newComments = copyComments.filter(
          (comment) => comment.comment_id !== commentId
        );
        return newComments;
      });
    });
  };

  return (
    <article className="articleCards pv4 bt bb b--black-10 ph3 ph0-l">
      <div className=" w-100 pr3-ns order-2 order-1-ns">
        <p className="f5 f4-l lh-copy athelas">{body}</p>
        <p className="f6 lh-copy gray mv0">
          {new Date(created_at).toLocaleDateString('en-gb')}
        </p>
        <p className="f6 lh-copy gray mv0">Author: {author}</p>
        <p className="f6 lh-copy gray mv0">Votes: {votes}</p>
        {author === loggedIn ? (
          <button
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
