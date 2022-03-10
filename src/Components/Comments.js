import { fetchComments } from '../api';
import CommentCard from './CommentCard';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const [comments, setComments] = useState([]);
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

  return (
    <section className="mw7 center">
      <h2 className="articles__navbar__header athelas ph3 ph0-l">Comments</h2>
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
