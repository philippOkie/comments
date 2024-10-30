import React, { useState } from "react";
import "./CommentForm.css";

const CommentForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    homePage: "",
    captcha: "",
    text: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to send data to the server or process it
    console.log("Submitted data:", formData);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Home page:
        <input
          type="url"
          name="homePage"
          value={formData.homePage}
          onChange={handleChange}
        />
      </label>

      <label>
        CAPTCHA:
        <img src="/captcha.jpg" alt="CAPTCHA" />
        <input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Text:
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
