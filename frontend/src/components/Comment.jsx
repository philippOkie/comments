import "./Comment.css";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";

const Comment = ({
  user,
  date,
  commentText,
  hasReplies = false,
  commentId,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedReplies, setFetchedReplies] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const formRef = useRef(null);

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

  const handleFormState = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleCommentSubmit = (newComment) => {
    setShowCommentForm(false);
    console.log("New comment submitted:", newComment);
  };

  return (
    <div className="comment">
      <img src={user.profileImage} alt="Avatar" className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <div className="sub-container">
            <span className="username">{user.username}</span>
            <span className="date">{date}</span>
          </div>
          {hasReplies && (
            <button onClick={toggleReplies} className="show-replies-btn">
              {loading ? "Loading..." : showReplies ? "⬆️" : "⬇️"}
            </button>
          )}
        </div>

        <div className="comment-text">{commentText}</div>

        <div className="comment-actions">
          <span className="user-can-click">👍</span>
          <span className="user-can-click">👎</span>
          <button className="leave-comment-btn" onClick={handleFormState}>
            💬
          </button>
        </div>

        {showCommentForm && (
          <div ref={formRef}>
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>
        )}

        {showReplies && (
          <div className="replies">
            {loading ? (
              <p>Loading replies...</p>
            ) : (
              fetchedReplies.map((reply, index) => (
                <Comment key={index} {...reply} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  commentText: PropTypes.string.isRequired,
  replies: PropTypes.array,
  hasReplies: PropTypes.bool,
  commentId: PropTypes.string.isRequired,
};

export default Comment;
