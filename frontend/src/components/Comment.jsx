import "./Comment.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Comment = ({
  username,
  date,
  text,
  avatar,
  replies = [],
  hasReplies = false,
  commentId,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedReplies, setFetchedReplies] = useState([]);

  const toggleReplies = async () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/comments/${commentId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch replies");
      }
      const data = await response.json();
      setFetchedReplies(data.replies);
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setLoading(false);
      setShowReplies(true);
    }
  };

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
          <span className="user-can-click">👍</span>
          <span className="user-can-click">👎</span>
          <span className="user-can-click">💬</span>
          {hasReplies && (
            <button onClick={toggleReplies} className="show-replies-btn">
              {loading ? "Loading..." : showReplies ? "⬆️" : "⬇️"}
            </button>
          )}
        </div>

        {showReplies && (
          <div className="replies">
            {loading ? (
              <p>Loading replies...</p>
            ) : (
              replies.map((reply, index) => <Comment key={index} {...reply} />)
            )}
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
  replies: PropTypes.array,
  hasReplies: PropTypes.bool,
  commentId: PropTypes.string.isRequired,
};

export default Comment;
