import React, { useState } from "react";
import "./PostThought.css";

export const PostThought = ({ apiUrl, onNewThought }) => {
  const [newThought, setNewThought] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // according to the requirements we need to check the post action
    if (newThought.length >= 5 && newThought.length <= 140) {
      // creating our unique post within api with POST method
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newThought }),
        });

        if (response.ok) {
          const newThoughtData = await response.json();
          onNewThought(newThoughtData);
          setNewThought(""); // Clear the input field
        } else {
          console.error("Failed to post thought");
        }
      } catch (error) {
        console.error("Error posting thought: ", error);
      }
    } else {
      console.error("Invalid thought message length");
    }
  };

  return (
    <div className="post-thought">
      <form onSubmit={handleFormSubmit}>
        <textarea
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          placeholder="What's making you happy right now?"
        />
        <button type="submit">❤️ Send Happy Thought ❤️</button>
      </form>
    </div>
  );
};