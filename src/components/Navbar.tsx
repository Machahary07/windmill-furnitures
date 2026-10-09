import Link from "next/link";
import Logo from "./Logo";

const links = [
  { label: "Experience", href: "/" },
  { label: "Team", href: "/#team" },
  { label: "About Us", href: "/#about" },
  { label: "Product", href: "/product" },
] as const;

type Section = (typeof links)[number]["label"];

export default function Navbar({ active = "Experience" }: { active?: Section }) {
  return (
    <header className="relative flex h-[58px] items-center justify-between border-b border-[#f1f1f1] px-7">
      <Logo />

      <nav className="absolute left-1/2 flex h-full -translate-x-1/2 items-stretch gap-[46px] max-[900px]:hidden">
        {links.map((link) => {
          const isActive = link.label === active;
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? /* red underline extends ~25px past the text on each side */
                    "relative flex items-center text-[15px] font-semibold text-ink after:absolute after:-inset-x-[25px] after:-bottom-px after:h-0.5 after:bg-red"
                  : "relative flex items-center text-[15px] font-medium text-gray-nav"
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/soon"
        className="flex items-center gap-[26px] font-jakarta text-base font-bold text-ink"
      >
        <span className="text-search">Search</span>
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          className="mt-px block"
          aria-hidden="true"
        >
          <circle cx="8.2" cy="8.2" r="6.7" stroke="currentColor" strokeWidth="1.3" />
          <line
            x1="13.1"
            y1="13.1"
            x2="17.8"
            y2="17.8"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    </header>
  );
}
