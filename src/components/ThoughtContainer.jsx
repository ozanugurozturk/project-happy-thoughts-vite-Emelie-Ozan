import React, { useEffect } from "react";
import { Thought } from "./Thought";

export const ThoughtContainer = () => {
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
  const [thoughts, setThoughts] = React.useState([]); // State to store thoughts

  const fetchThoughts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setThoughts(data); // Update thoughts state with fetched data
    } catch (error) {
      console.error("Error fetching thoughts: ", error);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return (

    <div>
      {thoughts.map((thought) => (
        // we are prop drilling (sendin) each thought to Thought component so we can use the information from there
        <Thought key={thought._id} thought={thought} />
      ))}
    </div>

  );
};
