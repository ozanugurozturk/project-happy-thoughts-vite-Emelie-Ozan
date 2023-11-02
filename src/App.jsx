import React from "react";
import { ThoughtContainer } from "./components/ThoughtContainer";
import { PostThought } from "./components/PostThought";

export const App = () => {
  //importing ThoughtContainer and displaying it here
  return (
    <div>
      <PostThought/>
      <ThoughtContainer />
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
