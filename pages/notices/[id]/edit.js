import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadNotice() {
      try {
        const response = await fetch(`/api/notices/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load notice.");
        }

        setNotice(data.notice);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotice();
  }, [id]);

  async function updateNotice(values) {
    const response = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      const saveError = new Error(data.message || "Unable to update notice.");
      saveError.details = data.errors;
      throw saveError;
    }

    router.push("/");
  }

  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">Edit notice</p>
        <h1>Update notice</h1>
      </section>

      {loading ? <p className="status-text">Loading notice...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      {notice ? (
        <NoticeForm initialValues={notice} onSubmit={updateNotice} submitLabel="Save changes" />
      ) : null}
    </Layout>
  );
}
