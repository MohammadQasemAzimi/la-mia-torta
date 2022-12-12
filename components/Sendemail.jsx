import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Component({ curuser }) {
  const form = useRef();
  console.log('the form to send as an email is ', form)
  /* 
      form.message = "there is message"
      form.email = "jossmicheal@gmail.com" */

  const sendEmail = (e) => {
    /* console.log('page is loaded') */
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
          console.log('name: ', form)
          alert(result.text);
        },
        (error) => {
          alert(error.text);
        }
      );
  };

  return (
    <form ref={form} onLoad={sendEmail}>
      <input defaultValue={curuser.name} type="text" id="name" name="user_name" />
      <br />
      <input defaultValue={curuser.email} type="email" id="email" name="email" />
      <br />
      <textarea defaultValue="please try to change the password in http://localhost:3000/profiles"
        name="message" id="text" />
      <br />
    </form>
  )
}