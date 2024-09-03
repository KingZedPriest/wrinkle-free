"use client";

import { useEffect } from "react";
import anime from "animejs";

const ShapesAnimation = () => {
  // Function to handle the animation
  const randomValues = () => {
    anime({
      targets: ".square, .circle, .triangle",
      translateX: () => anime.random(-500, 500),
      translateY: () => anime.random(-300, 300),
      rotate: () => anime.random(0, 360),
      scale: () => anime.random(0.2, 2),
      duration: 1000,
      easing: "easeInOutQuad",
      complete: randomValues,
    });
  };

  // Use useEffect to run the animation on mount
  useEffect(() => {
    randomValues();
  }, []);

  return (
    <div className="shapes-container">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <>
            <div key={`square-${index}`} className="square" />
            <div key={`circle-${index}`} className="circle" />
            <div key={`triangle-${index}`} className="triangle" />
          </>
        ))}
    </div>
  );
};

export default ShapesAnimation;
