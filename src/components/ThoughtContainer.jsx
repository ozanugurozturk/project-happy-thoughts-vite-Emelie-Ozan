import React from "react";
import { Thought } from "./Thought";

export const ThoughtContainer = ({ thoughts }) => {
  return (
    <div>
      {thoughts.map((thought) => (
        // we are prop drilling (sendin) each thought to Thought component so we can use the information from there
        <Thought key={thought._id} thought={thought} />
      ))}
    </div>
  );
};
