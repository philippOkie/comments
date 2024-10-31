import "./CommentForm.css";

import { useState } from "react";
import PropTypes from "prop-types";

import ReCAPTCHA from "react-google-recaptcha";

const CAPTCHA_SITE_KEY = import.meta.env.VITE_REACT_CAPTCHA_SITE_KEY;

const CommentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    homePage: "",
    text: "",
    captchaToken: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.captchaToken) {
      alert("Please verify that you are a human!");
      return;
    }

    onSubmit(formData);
  };

  const onCaptchaChange = (token) => {
    setFormData({ ...formData, captchaToken: token });
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
        Text:
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          required
        />
      </label>
      <div className="captcha-btn-container">
        <button className="submit-btn" type="submit">
          Submit
        </button>
        <ReCAPTCHA sitekey={CAPTCHA_SITE_KEY} onChange={onCaptchaChange} />
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
