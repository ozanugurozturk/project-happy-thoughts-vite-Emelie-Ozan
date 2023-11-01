import React, { useEffect } from "react";

export const Thought = () => {
  //TODO: create heart component and display via this component
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  //fetching existing thoughts and log them to the console - in useEffect
  const fetchThoughts = async () => {
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchThoughts();
  }, []);
  return <div>Thought component</div>;
};
