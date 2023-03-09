import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import { cx } from "../utils/cx";
import React from "react";

export const baseClasses =
  "no-underline justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 text-gray-800 px-0 hover:text-cyan-700 hover:bg-none bg-none font-medium shrink-0";

export const NavItems = [
  {
    name: "Home",
    slug: "/",
    description:
      "A collection of readings crafted by the talended folks at Thinkmill.",
  },
  {
    name: "About",
    slug: "/about",
    description: "Readmill is a simple blog template for Keystatic.",
  },
];

const KeystaticBanner = () => {
  return (
    <div className="py-3 external-link bg-black text-white fill-white text-center text-sm">
      You're looking at a{" "}
      <img className="my-0 inline" src="/keystatic.svg" alt="Keystatic logo" />{" "}
      <strong className="text-white">KEYSTATIC</strong> template.{" "}
      <a
        href="https://keystatic.thinkmill.com.au/"
        className="text-white hover:text-text-cyan-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more about Keystatic
        <span className="sr-only">opens in a new tab</span>
      </a>{" "}
      and get this template for free.
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const MobileMenu = () => {
    return (
      <div className="mx-4 -mt-1 p-4 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-w-md float-right">
        {/* Nav items */}
        <div className="grid grid-flow-row not-prose">
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={
                "pb-5 first:pt-3 px-3 last:pb-3 pt-5 border-b-2 border-slate-100 border-spacing-2 last:border-b-0 no-underline"
              }
              href={item.slug}
            >
              <p
                className={cx(
                  pathname === item.slug ? "text-text-cyan-700" : "",
                  "my-0 pb-2 font-bold"
                )}
              >
                {item.name}
              </p>
              <p className="my-0">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="prose max-w-none border-b-2 md:border-b-0 border-slate-100 mb-10 md:mb-20">
      <KeystaticBanner />
      <div className="flex justify-between items-center px-4 md:px-28 py-4 md:py-10 h-full">
        <a
          className="no-underline text-xl font-bold"
          href="/"
          aria-label="Link to home page"
        >
          🌎 &nbsp; Solaris Daily News
        </a>
        {/* Mobile Hamburger Icon button */}
        <nav className="-mr-2 min-[768px]:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6 stroke-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 stroke-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            )}
          </button>
        </nav>
        {/* Desktop nav */}
        <nav className="items-center space-x-8 hidden min-[768px]:flex">
          {NavItems.map((item) => (
            <a
              key={item.slug}
              className={cx(
                baseClasses,
                pathname === item.slug
                  ? "border-text-cyan-700 border-b-2"
                  : "border-transparent"
              )}
              href={item.slug}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      {menuOpen ? <MobileMenu /> : null}
    </header>
  );
};

export default Header;
