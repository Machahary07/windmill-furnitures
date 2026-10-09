import Link from "next/link";

/* Identical on every page: Jakarta 700 / 26px / #484848 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-jakarta text-[26px] font-bold tracking-normal text-logo ${className}`}
    >
      Windmill
    </Link>
  );
}
