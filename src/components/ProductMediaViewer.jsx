import React, { useState, useRef, useEffect } from "react";
import cloudinary from "./helpers/cloudinary.jsx";
import { motion } from "framer-motion";

export default function ProductMediaViewer({ media = [] }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Pause other videos
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      if (idx === active) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, media]);

  if (!media.length) return <div className="h-96 bg-gray-100" />;

  return (
    <div>
      <div className="w-full h-96 bg-gray-100 mb-3 flex items-center justify-center overflow-hidden rounded-md">
        {media[active].type === "video" ? (
          <video
            ref={(el) => (videoRefs.current[active] = el)}
            src={cloudinary(media[active].src, { w: 1200 })}
            className="object-contain w-full h-full"
            muted
            loop
            playsInline
            controls={false}
            autoPlay
          />
        ) : (
          <img
            src={cloudinary(media[active].src, { w: 1200 })}
            alt=""
            className="object-contain w-full h-full"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-20 h-20 rounded-md overflow-hidden border ${i === active ? "ring-2 ring-black" : ""}`}
          >
            {m.type === "video" ? (
              <video src={cloudinary(m.src, { w: 400 })} className="object-cover w-full h-full" muted />
            ) : (
              <img src={cloudinary(m.src, { w: 400 })} alt="" className="object-cover w-full h-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}