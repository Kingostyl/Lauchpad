/* eslint-disable react-hooks/rules-of-hooks */

"use state"
import React, { useState } from "react";
import Image from "next/image";

interface ImageProps {
  src: any;
  alt?: any;
  width: number;
  height?: number;
  caption?: string;
  priority: boolean;
}

const images: React.FC<ImageProps> = ({ src, alt, width, height, caption }) => {
  let [animate, setAnimate] = useState(false);

  const onClikAnimate = () => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false)
    },500)
  }
  return (
      <picture className="inline text-center">
        <button className={`cursor-default ${animate ? "animate-ping" : ""}`} onClick={onClikAnimate} >
        <Image src={src} alt={alt} width={width} height={height} />
        </button>
        {caption && <p className="font-normal drop-shadow shadow-black/40 text-xs">{caption}</p>}
      </picture>
  );
};

export default images;
