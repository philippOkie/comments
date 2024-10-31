import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import "./CommentForm.css";

const CAPTCHA_SITE_KEY = "6LfM2HAqAAAAAOkUMmvxxC1UoH2fQVvYSfLAcW6CC";

const CommentForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    homePage: "",
    text: "",
    captchaToken: "",
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

    console.log("Submitted data:", formData);

    // fetch("/api/submit-comment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Response from server:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error submitting form:", error);
    //   });
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

export default CommentForm;
