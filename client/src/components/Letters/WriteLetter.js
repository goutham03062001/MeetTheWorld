import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { sendLetter } from "../../actions/profile";
import PropTypes from "prop-types";
const WriteLetter = ({ sendLetter }) => {
  const [letter, setLetter] = useState("");
  const [alert, setAlert] = useState("");
  let { id } = useParams();
  let userId = id.toString();
  console.log("Letter id : ",userId)
  const onSubmit = (e) => {
    e.preventDefault();
    if (letter.length < 1) {
      setAlert("Letter must be greater than one word");
    } else {
      let letterBody = letter;
      sendLetter({ letterBody, userId });
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="col-lg-8 mt-5">
          {alert ? alert : ""}
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="start writing from here"
              id="floatingTextarea2"
              name="letterBody"
              style={{ height: "300px" }}
              onChange={(e) => {
                setLetter(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <button className="btn btn-warning btn-md px-5 mt-5" type="submit">
          send
        </button>
      </form>
    </div>
  );
};

WriteLetter.propTypes = {
  sendLetter: PropTypes.func.isRequired,
};

export default connect(null, { sendLetter })(WriteLetter);
