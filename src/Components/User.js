import media from '../Media/profile_pic.jpeg';

export const User = () => {
  return (
    <div className="user ">
      <img src={media} className="header__avatar" alt="profile pic"></img>
      <p>butter_bridge</p>
    </div>
  );
};

export default User;
