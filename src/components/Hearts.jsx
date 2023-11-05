import React, { useState } from "react";
import "./Hearts.css";

export const Hearts = ({ thought, updateLikedPostsCount }) => {
  const [countHearts, setCountHearts] = useState(thought.hearts);
  const clickHearts = () => {
    postHeart();
  };
  const postHeart = async () => {
    try {
      const response = await fetch(
        `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        setCountHearts(countHearts + 1);
        if (!localStorage.getItem(thought._id)) {
          localStorage.setItem(thought._id, "liked");
          updateLikedPostsCount(); // Call the function to update the count
        }
      }
      if (!response.ok) {
        throw new Error("Post not successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="hearts-container">
      <button className="like-button" onClick={clickHearts}>
        <div className="heart-symbol">❤️</div>
      </button>
      <span className="like-divider">X</span>
      <span className="like-count">{countHearts}</span>
    </div>
  );
};
