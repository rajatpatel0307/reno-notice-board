import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import NoticeList from "../components/NoticeList";

export default function HomePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotices() {
      try {
        const response = await fetch("/api/notices");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load notices.");
        }

        setNotices(data.notices);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  function removeNotice(id) {
    setNotices((current) => current.filter((notice) => notice.id !== id));
  }

  return (
    <Layout>
      <section className="hero">
        <div>
          <p className="eyebrow">Community notices</p>
          <h1>Share updates, events, and local alerts in one place.</h1>
        </div>
        <Link href="/notices/new" className="button">
          Add notice
        </Link>
      </section>

      {loading ? <p className="status-text">Loading notices...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      {!loading && !error ? <NoticeList notices={notices} onDeleted={removeNotice} /> : null}
    </Layout>
  );
}
