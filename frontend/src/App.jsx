import "./App.css";

import { useState, useEffect } from "react";

import Comment from "./components/Comment";
import commentService from "./services/comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await commentService.getAllComments();
        const fetchedComments = response.comments;

        if (!Array.isArray(fetchedComments)) {
          throw new Error("Fetched comments are not an array");
        }

        setComments(
          fetchedComments.sort((a, b) =>
            a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
          )
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="app">
      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
};

export default App;
