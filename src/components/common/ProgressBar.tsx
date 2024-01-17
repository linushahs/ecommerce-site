"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interv = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    //cleanup
    return () => {
      clearInterval(interv);
    };
  }, []);

  return (
    <div
      style={{ width: progress + "%" }}
      className="fixed top-0 left-0 bg-blue-700 shadow shadow-blue-400 h-[3px]"
    ></div>
  );
}
