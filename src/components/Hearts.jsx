import React, { useState } from "react";
import "./Hearts.css";

export const Hearts = ({ thought }) => {
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
      }
      if (!response.ok) {
        throw new Error("Post not successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="like-button" onClick={clickHearts}>
        ❤️
      </button>
      <p>{countHearts}</p>
    </div>
  );
};
