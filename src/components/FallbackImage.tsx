"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = {
  src: string;
  fallbackSrc: string;
  alt: string;
} & ImageProps;

export default function FallbackImage(props: Props) {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
