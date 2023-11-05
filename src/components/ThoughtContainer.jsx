import React from "react";
import { Thought } from "./Thought";
import "./ThoughtContainer.css"

export const ThoughtContainer = ({ thoughts }) => {
  return (
    <div>
      {thoughts.map((thought, index) => (
        <Thought
          // we are prop drilling (sendin) each thought to Thought component so we can use the information from there
          key={thought._id}
          thought={thought}
          isNewest={index === 0}
        />
      ))}
    </div>
  );
};
