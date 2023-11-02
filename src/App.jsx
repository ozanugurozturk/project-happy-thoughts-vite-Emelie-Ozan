import React, { useState, useEffect } from "react";
import { ThoughtContainer } from "./components/ThoughtContainer";
import { PostThought } from "./components/PostThought";

const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
const pollInterval = 10000; // Poll the API every 10 seconds (we can adjust as needed)

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const fetchThoughts = async () => {
    try {
      // Fetch thoughts here to send it to our container (so we can change the array here to rerender without second API call)
      const response = await fetch(apiUrl);
      const data = await response.json();
      setThoughts(data);
    } catch (error) {
      console.error("Error fetching thoughts: ", error);
    }
  };

  useEffect(() => {
    fetchThoughts(); // Fetch thoughts when the component mounts

    const intervalId = setInterval(() => {
      // Periodically fetch new thoughts, calling fetch every 'pollInterval'
      fetchThoughts();
    }, pollInterval);

    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const addThought = (newThoughtData) => {
    // Updating our thoughts array by adding the new thought at the beginning
    setThoughts((previousThoughts) => [newThoughtData, ...previousThoughts]);
  };

  return (
    <div>
      <PostThought apiUrl={apiUrl} onNewThought={addThought} />
      <ThoughtContainer thoughts={thoughts} />
    </div>
  );
};


// COMPONENTS THAT WE NEED:

// inside the App.jsx we should have:
// 1. post thought component (area that we post)

// 2. Thoughts container component (filled with last posted 20 thoughts (Posted Thought component * 20))

// - Posted Thought component (renders each unique post)
// --message
// --posting time display area (how many times ago)
// --like button as heart symbol (user can increase the like number with clicking it)
// --number of total likes to display (Ex: x 37 )


// - post heart component

// 1. fetch data and displaying in a container as a card
// create and style thoughts
// fetch the data
// render new thoughts when they are created (useEffect)
// calulate how old each thought is
// 2. post new thoughts
// get information about the time
// get information about the timezone
// 3. post hearts
// create a hearts button
