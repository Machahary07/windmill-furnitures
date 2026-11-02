import type { Metadata } from "next";
import AccountGate from "@/components/account/AccountGate";
import AccountNav from "@/components/account/AccountNav";
import PageHeader from "@/components/ui/PageHeader";
import { shell } from "@/components/ui/styles";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: { default: "My Account", template: "Windmill — %s" },
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="MY ACCOUNT." crumbs={[{ label: "Home", href: routes.home }, { label: "Account" }]} />
      <div className={shell}>
        <AccountNav />
        <div className="pt-10">
          <AccountGate>{children}</AccountGate>
        </div>
      </div>
    </>
  );
}
