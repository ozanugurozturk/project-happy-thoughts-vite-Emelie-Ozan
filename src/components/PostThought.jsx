import React, { useState } from "react";
import "./PostThought.css";

export const PostThought = ({ apiUrl, onNewThought }) => {
  const [newThought, setNewThought] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    // When you have a form element with a submit button, clicking that button typically causes the form to be submitted, 
    //which results in a full page refresh or a navigation to another page. So in here we prevents the default behavior of 
    //the form submission. ( instead of performing a full page reload or navigation.)
    e.preventDefault();

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
        // Calling the function to update the thoughts in the App component if the response is OK (code in the range 200-299)
        onNewThought(newThoughtData);
        setNewThought(""); // Clearing the input field
        setErrorMessage(null); // Clear any previous error message
      } else if (response.status === 400) {
        const errorData = await response.json();
        // Handle validation error - show the error message to the user
        setErrorMessage(errorData.message);
      } else {
        console.error("Failed to post thought, the message must be between 5 and 140 characters.");
      }
    } catch (error) {
      // If an error occurs in the try block (that is not related to the response status) 
      //the catch block is executed. In this block, we set a generic error message
      console.error("Error posting thought: ", error);
      setErrorMessage("Failed to post thought. Please try again.");
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};