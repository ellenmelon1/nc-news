import media from '../Media/profile_pic.jpeg';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  return (
    <section className="header mw7 center">
      <div className="header__header">
        <Link to="/">Home</Link>
        <h1
          className="header__header athelas 
        f1 f-headline-l fw1 i white-60 pv1"
        >
          NC News
        </h1>
      </div>
      <div className="header__user">
        <img src={media} alt="profile pic" className="header__avatar"></img>
        <p>{loggedIn}</p>
      </div>
    </section>
  );
};

export default Header;
