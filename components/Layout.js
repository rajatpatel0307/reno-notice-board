import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link href="/" className="brand">
          Reno Notice Board
        </Link>
        <nav className="site-nav">
          <Link href="/">All notices</Link>
          <Link href="/notices/new" className="button button-small">
            Add notice
          </Link>
        </nav>
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
}
