import media from '../Media/profile_pic.jpeg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <section className="header mw7 center">
        <Link to="/">Home</Link>
        <>
          <div className="header__header">
            <h1 className="header__header athelas f1 f-headline-l fw1 i white-60">
              NC News
            </h1>
          </div>
          <div className="header__user">
            <img src={media} alt="profile pic" className="header__avatar"></img>
            <p>butter_bridge</p>
          </div>
        </>
      </section>
    </>
  );
};

export default Header;
