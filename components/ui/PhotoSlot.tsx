import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  /** Chemin de la photo dans /public. Vide = placeholder animé. */
  src?: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  /** Contenu affiché tant que la photo n'est pas fournie. */
  placeholder?: ReactNode;
  placeholderClassName?: string;
};

/**
 * Emplacement photo : affiche next/image si `src` est renseigné,
 * sinon un placeholder avec reflet animé (shimmer).
 */
export function PhotoSlot({
  src,
  alt,
  sizes,
  preload,
  className = "",
  imageClassName = "object-cover",
  placeholder,
  placeholderClassName = "cb-ph",
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={imageClassName} />
      ) : (
        <div className={`absolute inset-0 ${placeholderClassName}`}>{placeholder}</div>
      )}
    </div>
  );
}
