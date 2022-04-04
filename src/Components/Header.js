import media from '../Media/profile_pic.jpeg';
import homeIcon from '../Media/homeIcon.png';
import { Link } from 'react-router-dom';

const Header = ({ loggedIn }) => {
  return (
    <section className="header mw7 center">
      <div className="home-wrapper">
        <Link to="/">
          <img src={homeIcon} className="header__home-img" />
        </Link>
        <img src={media} alt="profile pic" className="header__avatar"></img>
        <div className="username-wrapper">
          <p>{loggedIn}</p>
        </div>
      </div>
      <div className="header__header">
        <h1
          className="header__header athelas 
        f1 fw1 white-80"
        >
          NC News
        </h1>
      </div>
    </section>
  );
};

export default Header;
