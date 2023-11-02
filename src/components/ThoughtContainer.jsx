import React, { useEffect } from "react";
import { Thought } from "./Thought";

export const ThoughtContainer = ({ apiUrl }) => {
  const [thoughts, setThoughts] = React.useState([]);

  const fetchThoughts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setThoughts(data);
    } catch (error) {
      console.error("Error fetching thoughts: ", error);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, [apiUrl]); // Add apiUrl as a dependency to trigger fetch when it changes

  return (

    <div>
      {thoughts.map((thought) => (
        // we are prop drilling (sendin) each thought to Thought component so we can use the information from there
        <Thought key={thought._id} thought={thought} />
      ))}
    </div>

  );
};
