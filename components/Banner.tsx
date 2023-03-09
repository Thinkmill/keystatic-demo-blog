import Image from "next/image";
import stars from "../assets/icons/stars.svg";

export default function Banner({
  heading,
  bodyText,
  externalLink,
}: {
  heading: string;
  bodyText: string;
  externalLink?: {
    href: string;
    label: string;
  };
}) {
  return (
    <div className="p-6 md:p-10 bg-slate-100 rounded-xl gap-4 md:gap-10 flex flex-col md:flex-row items-center external-link">
      <Image
        className="w-m-full self-start md:self-center my-0"
        src={stars}
        aria-hidden="true"
        alt="stars icon"
      />

      <div className="flex-row">
        <p className="mt-0 mb-3 font-bold">{heading}</p>
        <p className="text-base m-0">
          {bodyText}
          {externalLink && externalLink.href && (
            <a
              className="text-text-cyan-700"
              target="_blank"
              rel="noopener noreferrer"
              href={externalLink.href}
            >
              {" "}
              {externalLink.label}
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
