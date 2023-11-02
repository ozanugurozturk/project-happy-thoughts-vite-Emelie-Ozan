import React from "react";
import "./Hearts.css";

export const Hearts = (id) => {
  const postHeart = async () => {
    try {
      const response = await fetch(
        `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id.id}/like`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Post not successful");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <button className="like-button" onClick={postHeart}>
        ❤️
      </button>
    </div>
  );
};
// 6543fbc76b4fda00102bd810
