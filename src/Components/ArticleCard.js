import { Link } from 'react-router-dom';

const ArticleCard = ({
  commentCount,
  title,
  topic,
  author,
  votes,
  articleId,
  createdAt,
}) => {
  return (
    <article className="articleCards pv4 bt bb b--black-10 ph3 ph0-l">
      <div className="flex flex-column flex-row-ns">
        <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
          <p className="articleCard-topic f5 f4-l lh-copy athelas">{topic}</p>
          <Link
            to={'/articles/' + articleId}
            key={articleId}
            className="f4 fw6 db black link hover-dark-red"
          >
            <h3 className="articleCard-title f5 f4-l lh-copy athelas">
              {title}
            </h3>
          </Link>
          <p className="f6 lh-copy gray mv0">{author}</p>
          <p className="f6 lh-copy gray mv0">
            {new Date(createdAt).toLocaleDateString('en-gb')}
          </p>
          <p className="f6 lh-copy gray mv0">{votes} votes</p>
        </div>

        <div className="articleCards-img pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
          <img
            className="articleCard-img"
            src={require(`../Images/${articleId}.jpg`)}
          ></img>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
