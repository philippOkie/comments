import "./Comment.css";

import { useState, useRef } from "react";
import PropTypes from "prop-types";

import CommentForm from "./CommentForm";
import commentService from "../services/comments";

const DEFAULT_IMAGE =
  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3408.jpg?w=1800";

const Comment = ({
  user: { username, profileImage = DEFAULT_IMAGE },
  date,
  commentText,
  hasReplies = false,
  id,
  likes = 0,
  dislikes = 0,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const fetchReplies = async () => {
    if (showReplies) {
      setShowReplies(false);
      return;
    }

    setLoadingReplies(true);
    try {
      const response = await commentService.getCommentReplies(id);

      if (response.replies) {
        setReplies(response.replies);
        setShowReplies(true);
      } else {
        throw new Error("No replies found");
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleCommentFormState = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const handleNewComment = (newComment) => {
    setShowCommentForm(false);
    setReplies((prev) => [...prev, newComment]);
  };

  return (
    <div className="comment">
      <img src={profileImage} alt="Avatar" className="avatar" />
      <div className="comment-content">
        <div className="comment-header">
          <div className="sub-container">
            <span className="username">{username}</span>
            <span className="date">{new Date(date).toLocaleString()}</span>
          </div>
          {hasReplies && (
            <button onClick={fetchReplies} className="show-replies-btn">
              {loadingReplies ? "Loading..." : showReplies ? "⬆️" : "⬇️"}
            </button>
          )}
        </div>

        <div className="comment-text">{commentText}</div>

        <div className="comment-actions">
          <span className="user-can-click">👍 {likes}</span>
          <span className="user-can-click">👎 {dislikes}</span>

          <button
            className="leave-comment-btn"
            onClick={handleCommentFormState}
          >
            💬
          </button>
        </div>

        {showCommentForm && (
          <div>
            <CommentForm onSubmit={handleNewComment} />
          </div>
        )}

        {showReplies && (
          <div className="replies">
            {loadingReplies ? (
              <p>Loading replies...</p>
            ) : (
              replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <Comment
                    user={{
                      username: reply.user.username,
                      profileImage: reply.user.profileImage,
                    }}
                    date={reply.date}
                    commentText={reply.commentText}
                    hasReplies={reply.hasReplies}
                    id={reply.id}
                    likes={reply.likes}
                    dislikes={reply.dislikes}
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
