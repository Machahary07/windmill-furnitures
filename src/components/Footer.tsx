import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./forms/NewsletterForm";
import { routes } from "@/lib/routes";
import { footerNav, site } from "@/lib/site";
import { eyebrow, shell } from "./ui/styles";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#ececec] bg-white">
      <div className={`${shell} grid grid-cols-[1.3fr_repeat(3,1fr)_1.5fr] gap-10 pt-[70px] pb-14 max-xl:grid-cols-3 max-sm:grid-cols-2 max-sm:pt-12`}>
        <div className="max-xl:col-span-3 max-sm:col-span-2">
          <Logo />
          <address className="mt-5 font-jakarta text-[13px] leading-[22px] text-gray-body not-italic">
            {site.address.slice(1).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href={`mailto:${site.email}`} className="mt-3 block text-ink underline-offset-4 hover:underline">
              {site.email}
            </a>
          </address>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className={eyebrow}>{group.title}</h2>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-jakarta text-sm font-medium text-gray-body transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="max-xl:col-span-3 max-sm:col-span-2">
          <h2 className={eyebrow}>Letters from the workshop</h2>
          <p className="mt-5 font-jakarta text-sm leading-[22px] text-gray-body">
            New designs, finished projects and the occasional open-workshop day. A few times a year, never more.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* brand word in the hero's Outfit display face */}
      <p aria-hidden="true" className="pointer-events-none overflow-hidden text-center indent-[0.15em] font-outfit text-[13.5vw] leading-[0.78] font-bold tracking-[0.15em] whitespace-nowrap text-[#f4f4f4] select-none">
        WINDMILL
      </p>

      <div className="border-t border-[#ececec]">
        <div className={`${shell} flex flex-wrap items-center justify-between gap-4 py-6 font-jakarta text-[13px] font-medium text-footer`}>
          <p>
            © {site.founded}–{new Date().getFullYear()} {site.legalName}. Handcrafted in New Delhi.
          </p>
          <div className="flex gap-[52px] max-sm:gap-8">
            <Link href={routes.terms} className="hover:text-ink">
              Terms
            </Link>
            <Link href={routes.privacy} className="hover:text-ink">
              Privacy
            </Link>
            <Link href={routes.faq} className="hover:text-ink">
              Help
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
