import React from "react";

export const BookBtn = (props) => {
  return (
    <button
      className="bookBtn"
      style={{ backgroundColor: props.color }}
      onClick={props.clickFunc}
    >
      {props.text}
    </button>
  );
};

BookBtn.defaultProps = {
  text: "Unavailable",
};

export default BookBtn;
