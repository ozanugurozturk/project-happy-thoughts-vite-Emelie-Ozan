import React from "react";
import "./Thought.css";
import { Hearts } from "./Hearts";

// Function to calculate time since posted
const calculateTimeAgo = (createdAt) => {
  const currentTime = new Date();
  const postTime = new Date(createdAt);
  const timeDifference = currentTime - postTime;

  // Calculate and format time difference
  // `date-fns` library can be used for better calculation acc to my researches but i do not know how to implement right now
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  if (minutesAgo < 1) {
    return "Just now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo}h ago`;
    } else {
      const daysAgo = Math.floor(hoursAgo / 24);
      return `${daysAgo}d ago`;
    }
  }
};

const updateHearts = (value) => {
  setCountHearts(value);
};

export const Thought = ({ thought }) => {
  // Calculate the time since posted
  const timeAgo = calculateTimeAgo(thought.createdAt);

  return (
    <div className="thought">
      <p className="thought-message">{thought.message}</p>
      <div className="thought-details">
        <div className="like-button">
          <Hearts id={thought._id} />
        </div>
        <span className="like-count">{thought.hearts}</span>
        <span className="time-ago">{timeAgo}</span>
      </div>
    </div>
  );
};
