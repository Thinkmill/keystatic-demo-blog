import Link from "next/link";

type IsInternalLink = {
  onClick?: never;
  href: string;
  externalLink: false;
};

type IsExternalLink = {
  onClick?: never;
  href: string;
  externalLink: true;
};

type ButtonOrLinkProps = IsInternalLink | IsExternalLink;

export type ButtonProps = ButtonOrLinkProps & {
  label: string;
};

const buttonClasses =
  "px-4 py-2 bg-text-cyan-700 text-white hover:text-white hover:bg-black rounded-md no-underline hover:cursor-pointer";

const Button = ({ href, externalLink, label }: ButtonProps) => {
  if (externalLink) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses}>
      {label}
    </Link>
  );
};

export default Button;
