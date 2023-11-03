import React, { useState } from "react";
import "./PostThought.css";

export const PostThought = ({ apiUrl, onNewThought }) => {
  const [newThought, setNewThought] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setNewThought(inputText);
    setCharCount(inputText.length);
  };

  const handleFormSubmit = async (e) => {
    // When you have a form element with a submit button, clicking that button typically causes the form to be submitted, 
    //which results in a full page refresh or a navigation to another page. So in here we prevents the default behavior of 
    //the form submission. ( instead of performing a full page reload or navigation.)
    e.preventDefault();

    // Reset any previous error message
    setErrorMessage(null);

    if (newThought.length === 0) {
      setErrorMessage("Text cannot be empty");
      return;
    } else if (newThought.length > 140) {
      setErrorMessage("Text is too long");
      return;
    } else if (newThought.length < 5) {
      setErrorMessage("Text is too short");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newThought }),
      });

      if (response.ok) {
        // Calling the function to update the thoughts in the App component if the response is OK (code in the range 200-299)
        const newThoughtData = await response.json();
        onNewThought(newThoughtData);
        setNewThought(""); // Clearing the input field
        setCharCount(0); // Reseting the character count to 0
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      } else {
        // I am still keeping it for other type of responses we get, we can change the error message
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
        <label htmlFor="newThought">What's making you happy right now?</label>
        <textarea
          id="newThought"
          name="newThought" // Add a name attribute for accessibility
          value={newThought}
          onChange={handleInputChange}
          placeholder="Share your happy thought"
        />
        <p className={charCount > 140 ? "char-count-red" : ""}>
          Characters remaining: {140 - charCount < 0 ? 0 : 140 - charCount}
        </p>
        <button type="submit">❤️ Send Happy Thought ❤️</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

// we can use this if we want to continue to negative numbers when we exceed 140 char => Characters remaining: {140 - charCount} 