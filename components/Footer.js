import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/notices/new", label: "Add Notice" },
];

const socials = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-white">
      <div className="grid w-full gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:px-10 xl:px-12">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Reno Notice Board logo" className="h-14 w-14 rounded-xl object-contain" />
            <span className="text-2xl font-extrabold text-[#55d0c5]">Reno Notice Board</span>
          </div>
          <p className="mt-4 max-w-md leading-7 text-gray-300">
            A smart notice board for exams, events, updates, and alerts.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-blue-600"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Useful Links</h2>
          <div className="mt-4 grid gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 text-gray-300 hover:text-white">
                <FiExternalLink className="text-sm" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">Project</h2>
          <p className="mt-4 leading-7 text-gray-300">
            Built for simple, responsive notice management with a clean light interface.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-gray-400">
        © 2026 Reno Notice Board. All rights reserved.
      </div>
    </footer>
  );
}
