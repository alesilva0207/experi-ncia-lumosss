import React, { useState, useEffect } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  src,
  fallbackSrc = "/fallback.jpg",
  style,
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src as string);

  // Se o src mudar (quando troca a foto no carrossel), atualiza a imagem
  useEffect(() => {
    setImgSrc(src as string);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
        ...(style || {}),
      }}
    />
  );
}