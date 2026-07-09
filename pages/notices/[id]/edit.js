import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";
import NoticeForm from "../../../components/NoticeForm";

export default function EditNoticePage() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/notices/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load notice.");
        }

        setNotice(data.notice);
      } catch (fetchError) {
        setError(fetchError.message);
        toast.error(fetchError.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchNotice();
  }, [id]);

  async function updateNotice(values) {
    const response = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to update notice");
      error.details = data.errors;
      throw error;
    }

    router.push("/");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-600">
          <FiEdit3 />
          Edit Notice
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Update notice</h1>
        <p className="mt-2 text-slate-600">Make changes and save them to the database.</p>
      </div>

      {loading ? <p className="rounded-lg bg-white p-5 text-slate-600 shadow-sm">Loading notice...</p> : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">Could not load this notice.</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      ) : null}

      {!loading && !error && notice ? (
        <NoticeForm
          initialValues={notice}
          onSubmit={updateNotice}
          submitLabel="Save Changes"
          successMessage="Notice updated successfully"
        />
      ) : null}
    </section>
  );
}
