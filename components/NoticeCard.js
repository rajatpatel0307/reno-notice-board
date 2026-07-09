import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiCalendar, FiEdit3, FiFlag, FiFolder, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";

export default function NoticeCard({ notice, onDeleted }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const response = await fetch(`/api/notices/${notice.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      toast.error(data.message || "Failed to delete notice");
      setDeleting(false);
      setConfirmDelete(false);
      return;
    }

    toast.success("Notice deleted successfully");
    setDeleting(false);
    setConfirmDelete(false);
    onDeleted?.(notice.id);
  }

  return (
    <>
      <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        {notice.imageUrl ? (
          <img src={notice.imageUrl} alt="" className="h-44 w-full object-cover" />
        ) : null}

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <FiFolder />
              {notice.category}
            </span>
            {notice.priority === "Urgent" ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                <FiFlag />
                Urgent
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                <FiFlag />
                Normal
              </span>
            )}
          </div>

          <h2 className="break-words text-xl font-bold text-slate-950">{notice.title}</h2>
          <p className="mt-3 flex-1 whitespace-pre-line break-words text-sm leading-6 text-slate-600">{notice.body}</p>

          <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
            <FiCalendar />
            Publish date: {new Date(notice.publishDate).toLocaleDateString()}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/notices/${notice.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <FiEdit3 />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
            >
              <FiTrash2 />
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </article>

      <ConfirmModal
        isOpen={confirmDelete}
        title="Delete this notice?"
        message="This action cannot be undone. The notice will be removed from the board."
        confirmLabel={deleting ? "Deleting..." : "Delete Notice"}
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}
