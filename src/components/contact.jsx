import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
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
        formRef.current,    // form reference
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
    <div id="contact">
      <div className="container">
        <div className="col-md-8">
          <div className="row">
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
            </div>

            {/* Email Form */}
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      name="user_name" // must match EmailJS template var
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="user_email" // must match EmailJS template var
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Message"
                  value={message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-custom btn-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-md-3 col-md-offset-1 contact-info">
          <div className="contact-item">
            <h3>Contact Info</h3>
            <p>
              <span>
                <i className="fa fa-map-marker"></i> Address
              </span>
              {props.data?.address || "loading"}
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-phone"></i> Phone
              </span>{" "}
              {props.data?.phone || "loading"}
            </p>
          </div>
          <div className="contact-item">
            <p>
              <span>
                <i className="fa fa-envelope-o"></i> Email
              </span>{" "}
              {props.data?.email || "loading"}
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="col-md-12">
          <div className="row">
            <div className="social">
              <ul>
                <li>
                  <a href={props.data?.facebook || "/"}>
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href={props.data?.twitter || "/"}>
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href={props.data?.youtube || "/"}>
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved, designed by{" "}
            <a href="Ellie&Char LTD" rel="nofollow">
              Ellie&Char LTD
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
