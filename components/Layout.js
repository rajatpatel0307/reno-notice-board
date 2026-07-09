import Link from "next/link";
import { useRouter } from "next/router";
import { FiGrid, FiHome, FiPlusCircle } from "react-icons/fi";
import Footer from "./Footer";

const navLinks = [
  { href: "/", label: "Home", Icon: FiHome },
  { href: "/notices/new", label: "Add Notice", Icon: FiPlusCircle },
  { href: "/dashboard", label: "Dashboard", Icon: FiGrid },
];

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <nav className="flex w-full flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 xl:px-12">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="Reno Notice Board logo" className="h-11 w-11 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12" />
            <span className="truncate text-lg font-extrabold text-[#1f8f86] sm:text-2xl">Reno Notice Board</span>
          </Link>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;
              const Icon = link.Icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <Icon className="text-base" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 xl:px-12">{children}</main>
      <Footer />
    </div>
  );
}
