import { loggedInUser } from './contexts';
import { useContext, useEffect, useState } from 'react';
import { deleteComment } from '../api';
import { fetchSingleComment, updateCommentVotes } from '../api';

const CommentCard = ({ setComments, body, created_at, author, commentId }) => {
  const { loggedIn } = useContext(loggedInUser);
  const [buttonMsg, updateButtonMsg] = useState('Delete comment');
  const [disable, setDisable] = useState(false);
  const [votes, setVotes] = useState();
  const [downvoteButtonStatus, setDownvoteButtonStatus] = useState(false);
  const [upvoteButtonStatus, setUpvoteButtonStatus] = useState(false);

  useEffect(() => {
    fetchSingleComment(commentId).then((comment) => {
      setVotes(comment.votes);
    });
  }, [commentId]);

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

  const handleVoteButtonClick = (change) => {
    setVotes((currVotes) => currVotes + change);
    updateCommentVotes(commentId, change).catch(() => {
      setVotes(0);
      alert("Couldn't update votes");
    });
  };

  return (
    <article className="commentCard articleCards pv4 bt bb b--black-10 ph5">
      <div className=" w-100 pr3-ns order-2 order-1-ns">
        <p className="f5 f4-l lh-copy athelas">{body}</p>
        <div className="commentCard_details">
          <div className="commentCard_details_left">
            <p className="f6 lh-copy gray mv0">
              {new Date(created_at).toLocaleDateString('en-gb')}
            </p>
            <p className="f6 lh-copy gray mv0">Author: {author}</p>
          </div>
          <div className="Comment__votes">
            <button
              className={`downvoteButtonStatus-${downvoteButtonStatus} downvote_button f6 lh-copy gray ph3 pv1 ml3 dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray`}
              onClick={() => {
                if (
                  upvoteButtonStatus === false &&
                  downvoteButtonStatus === false
                ) {
                  setDownvoteButtonStatus(true);
                  handleVoteButtonClick(-1);
                }
                if (
                  upvoteButtonStatus === false &&
                  downvoteButtonStatus === true
                ) {
                  setDownvoteButtonStatus(false);
                  handleVoteButtonClick(1);
                }
                if (
                  upvoteButtonStatus === true &&
                  downvoteButtonStatus === false
                ) {
                  setDownvoteButtonStatus(true);
                  setUpvoteButtonStatus(false);
                  handleVoteButtonClick(-2);
                }
              }}
            >
              &#128078;
            </button>
            <p className=" comment_votes_text f6 lh-copy gray mv0 pv2 ph0-l">
              Votes: {votes}
            </p>
            <button
              className={`upvoteButtonStatus-${upvoteButtonStatus} upvote_button f6 lh-copy gray ph3 pv1 ml3 dim br3 ba bw1 ph3 pv2 mb2 dib mid-gray`}
              onClick={() => {
                if (
                  downvoteButtonStatus === false &&
                  upvoteButtonStatus === false
                ) {
                  handleVoteButtonClick(1);
                  setUpvoteButtonStatus(true);
                }
                if (
                  downvoteButtonStatus === true &&
                  upvoteButtonStatus === false
                ) {
                  handleVoteButtonClick(2);
                  setUpvoteButtonStatus(true);
                  setDownvoteButtonStatus(false);
                }
                if (
                  upvoteButtonStatus === true &&
                  downvoteButtonStatus === false
                ) {
                  setUpvoteButtonStatus(false);
                  handleVoteButtonClick(-1);
                }
              }}
            >
              &#128077;
            </button>
          </div>
        </div>
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
