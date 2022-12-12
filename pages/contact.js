import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  console.log(form, useRef());

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_h5wu9e6",
        "template_p1e5sem",
        form.current,
        "E9DMnr4bLSRphh77c"
      )
      .then(
        (result) => {
          alert(result.text);
        },
        (error) => {
          alert(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <br />
      <input type="text" name="user_name" />
      <br />
      <label>Email</label>
      <br />
      <input type="email" name="email" />
      <br />
      <label>Message</label>
      <br />
      <textarea name="message" />
      <br />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;