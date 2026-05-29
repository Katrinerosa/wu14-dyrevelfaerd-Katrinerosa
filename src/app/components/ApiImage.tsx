import { getAssetUrl } from "../lib/api";

type ApiImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export function ApiImage({ src, alt, className = "" }: ApiImageProps) {
  const imageUrl = getAssetUrl(src);

  if (!imageUrl) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-[#d8d7cf] text-sm font-semibold text-[#4f5a50]`}
      >
        Intet billede
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={className} />;
}
