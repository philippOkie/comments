import "./Comment.css";
import PropTypes from "prop-types";

const Comment = ({ username, date, text, avatar, replies }) => {
  return (
    <div className="comment">
      <img src={avatar} alt="Avatar" className="avatar" />

      <div className="comment-content">
        <div className="comment-header">
          <span className="username">{username}</span>
          <span className="date">{date}</span>
        </div>

        <p className="comment-text">{text}</p>

        <div className="comment-actions">
          <span className="user-can-click">💬</span>
          <span className="user-can-click">🔗</span>
          <span className="user-can-click">👍 0</span>
          <span className="user-can-click">👎 0</span>
        </div>

        {replies && (
          <div className="replies">
            {replies.map((reply, index) => (
              <Comment key={index} {...reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ),
};

Comment.defaultProps = {
  replies: [],
};

export default Comment;
