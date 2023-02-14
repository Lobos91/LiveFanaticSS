import React from "react";

export const BookBtn = (props) => {
  return (
    <div>
      <button
        className="bookBtn"
        style={{ backgroundColor: props.color }}
        onClick={props.func}
      >
        {props.text}
      </button>
    </div>
  );
};

BookBtn.defaultProps = {
  text: "Unavailable",
};

export default BookBtn;
