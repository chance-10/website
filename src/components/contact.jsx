import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const contact = (props) => {
  const formRef = useRef();
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_k7h0uy9", // service ID
        "template_5hoacbf", // template ID
        formRef.current,   // <-- use ref here
        "7XuusxucPT37sZGoX" // public key
      )
      .then(
        (result) => {
          console.log("✅ Email successfully sent:", result.text);
          clearState();
        },
        (error) => {
          console.error("❌ Email sending failed:", error.text);
        }
      );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        name="user_name" // <-- must match template variable in EmailJS
        placeholder="Name"
        value={name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="user_email" // <-- must match template variable
        placeholder="Email"
        value={email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message" // <-- must match template variable
        placeholder="message"
        value={message}
        onChange={handleChange}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};