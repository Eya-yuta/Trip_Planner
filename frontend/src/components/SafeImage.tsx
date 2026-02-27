import { useState } from "react";

type SafeImageProps = {
    src: string;
    alt: string;
    className?: string;
    fallback?: string;
};

export default function SafeImage({
                                      src,
                                      alt,
                                      className,
                                      fallback = "/images/placeholder.jpg",
                                  }: Readonly<SafeImageProps>) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => {
                if (imgSrc !== fallback) setImgSrc(fallback);
            }}
        />
    );
}