import React, { useState, useEffect } from "react";
import { ThoughtContainer } from "./ThoughtContainer";
import { PostThought } from "./PostThought";

const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
const pollInterval = 10000; // Poll the API every 10 seconds (we can adjust as needed)

export const ThoughtsFunctionality = () => {
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