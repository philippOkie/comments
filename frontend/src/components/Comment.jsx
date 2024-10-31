import "./Comment.css";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import commentService from "../services/comments";

const Comment = ({
  user,
  date,
  commentText,
  hasReplies = false,
  id,
  likes = 0,
  dislikes = 0,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchedReplies, setFetchedReplies] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const formRef = useRef(null);

  const fetchReplies = async () => {
    if (showReplies || loading) return;

    setLoading(true);
    try {
      console.log("Fetching replies for comment ID:", id);
      const response = await commentService.getCommentReplies(id);

      if (response.replies) {
        setFetchedReplies(response.replies);
      } else {
        throw new Error("No replies found");
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setLoading(false);
    }
    setShowReplies((prev) => !prev);
  };

  const handleFormState = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleCommentSubmit = (newComment) => {
    setShowCommentForm(false);
    console.log("New comment submitted:", newComment);
    setFetchedReplies((prev) => [...prev, newComment]);
  };

  return (
    <div className="comment">
      <img src={user.profileImage} alt="Avatar" className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <div className="sub-container">
            <span className="username">{user.username}</span>
            <span className="date">{new Date(date).toLocaleString()}</span>
          </div>
          {hasReplies && (
            <button onClick={fetchReplies} className="show-replies-btn">
              {loading ? "Loading..." : showReplies ? "⬆️" : "⬇️"}
            </button>
          )}
        </div>

        <div className="comment-text">{commentText}</div>

        <div className="comment-actions">
          <span className="user-can-click">👍 {likes}</span>
          <span className="user-can-click">👎 {dislikes}</span>

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
              fetchedReplies.map((reply) => (
                <div key={reply.id} className="reply">
                  <Comment
                    user={{
                      username: reply.user.username || reply.user,
                      profileImage: reply.user.profileImage || "",
                    }}
                    date={reply.date}
                    commentText={reply.commentText}
                    hasReplies={reply.hasReplies}
                    id={reply.id}
                    likes={reply.likes || 0}
                    dislikes={reply.dislikes || 0}
                  />
                </div>
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
  hasReplies: PropTypes.bool,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default Comment;
