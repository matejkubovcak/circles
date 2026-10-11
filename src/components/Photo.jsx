import { useState } from "react";
import { asPhoto } from "../data/photos";

export default function Photo({ src, alt, className = "", eager = false }) {
  const url = asPhoto(src).src;
  const [failedUrl, setFailedUrl] = useState("");
  const failed = failedUrl === url;
  if (failed || !url) {
    return <div className={`photo-fallback ${className}`} role="img" aria-label={alt} />;
  }
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailedUrl(url)}
    />
  );
}
