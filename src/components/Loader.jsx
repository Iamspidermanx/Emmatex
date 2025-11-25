import React from "react";

export default function Loader() {
  return (
    <div className="py-10 grid place-items-center">
      <div className="
        animate-spin rounded-full h-10 w-10 
        border-2 border-transparent 
        border-b-black dark:border-b-white
      " />
    </div>
  );
}
