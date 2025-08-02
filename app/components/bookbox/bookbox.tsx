import "./bookbox.css";
import React from "react";

// Define the expected props type
type BookBoxProps = {
  image: string;
  heading: string;
  price: string;
  author: string;
  condition: string;
  onClick?: () => void;

};

const BookBox: React.FC<BookBoxProps> = ({ image, heading, price, onClick }) => {
  return (
    <div className="BookContainer">
      <div className="imageBox">
        <img src={image} alt={heading} />
      </div>
      <h1>{heading}</h1>
      <p>{price}</p>
      <button onClick={onClick} style={{ cursor: "pointer" }}>
        CHECK LISTING
      </button>
    </div>
  );
};

export default BookBox;
