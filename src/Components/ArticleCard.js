const ArticleCard = ({ commentCount, title, topic, author, votes }) => {
  return (
    <article className="articleCards pv4 bt bb b--black-10 ph3 ph0-l">
      <div className=" w-100 w-60-ns pr3-ns order-2 order-1-ns">
        <p className="f5 f4-l lh-copy athelas">{topic}</p>
        <h3 className="f5 f4-l lh-copy athelas">{title}</h3>
        <p className="f6 lh-copy gray mv0">Author: {author}</p>
        <p className="f6 lh-copy gray mv0">Comments: {commentCount}</p>
        <p className="f6 db gray">{votes} votes</p>
      </div>
    </article>
  );
};

export default ArticleCard;
