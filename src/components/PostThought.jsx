import React, { useState } from "react";
import "./PostThought.css";

export const PostThought = ({ apiUrl, onNewThought }) => {
  const [newThought, setNewThought] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newThought.length >= 5 && newThought.length <= 140) {
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

          // Call the function to update the thoughts in the App component
          onNewThought(newThoughtData);

          setNewThought(""); // Clearing the input field
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