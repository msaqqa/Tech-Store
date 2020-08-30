import React from "react";
import Title from "../Title";

export default function Contact() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <Title title="contact us" />
            <form className="mt-5">
              {/* name */}
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="john smith"
                />
              </div>
              {/* email */}
              <div className="form-group">
                <input
                  type="eamil"
                  name="email"
                  className="form-control"
                  placeholder="email@email.com"
                />
              </div>
              {/* subject */}
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="important!!!"
                />
              </div>
              {/* message */}
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="hello there body"
                  rows="10"
                />
              </div>
              {/* submit */}
              <div className="form-group">
                <input
                  type="submit"
                  value="send"
                  name="subject"
                  className="form-control mt-3 bg-primary text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
