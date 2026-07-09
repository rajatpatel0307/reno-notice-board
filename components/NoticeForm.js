import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { FiRotateCcw, FiSave, FiX } from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";

const defaultValues = {
  title: "",
  body: "",
  category: "General",
  priority: "Normal",
  publishDate: "",
  imageUrl: "",
};

function formatDateForInput(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default function NoticeForm({
  initialValues = {},
  onSubmit,
  submitLabel = "Save Notice",
  successMessage = "Form submitted successfully",
}) {
  const router = useRouter();
  const initialForm = {
    ...defaultValues,
    ...initialValues,
    publishDate: formatDateForInput(initialValues.publishDate) || defaultValues.publishDate,
    imageUrl: initialValues.imageUrl || "",
  };
  const [form, setForm] = useState({
    ...initialForm,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function validateClient() {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.body.trim()) nextErrors.body = "Body is required.";
    if (!form.publishDate) nextErrors.publishDate = "Publish date is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError("");

    if (!validateClient()) return;

    setConfirmAction("submit");
  }

  async function submitConfirmed() {
    setConfirmAction(null);

    setSubmitting(true);

    try {
      await onSubmit({
        ...form,
        imageUrl: form.imageUrl.trim() || null,
      });
      toast.success(successMessage);
    } catch (error) {
      const message = error.message || "Something went wrong";
      setApiError(message);
      setErrors(error.details || {});
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  function resetConfirmed() {
    setForm({ ...initialForm });
    setErrors({});
    setApiError("");
    setConfirmAction(null);
    toast.info("Form reset");
  }

  function cancelConfirmed() {
    setConfirmAction(null);
    router.push("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {apiError ? (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {apiError}
          </div>
        ) : null}

        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="font-semibold text-slate-700">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter notice title"
            />
            {errors.title ? <span className="text-sm font-medium text-red-600">{errors.title}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="font-semibold text-slate-700">Body</span>
            <textarea
              name="body"
              rows="6"
              value={form.body}
              onChange={updateField}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Write the notice details"
            />
            {errors.body ? <span className="text-sm font-medium text-red-600">{errors.body}</span> : null}
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">Category</span>
              <select
                name="category"
                value={form.category}
                onChange={updateField}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
              </select>
              {errors.category ? <span className="text-sm font-medium text-red-600">{errors.category}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">Priority</span>
              <select
                name="priority"
                value={form.priority}
                onChange={updateField}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
              {errors.priority ? <span className="text-sm font-medium text-red-600">{errors.priority}</span> : null}
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">Publish Date</span>
              <input
                type="date"
                name="publishDate"
                value={form.publishDate}
                onChange={updateField}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {errors.publishDate ? (
                <span className="text-sm font-medium text-red-600">{errors.publishDate}</span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="font-semibold text-slate-700">Image URL Optional</span>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={updateField}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl ? <span className="text-sm font-medium text-red-600">{errors.imageUrl}</span> : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              <FiSave />
              {submitting ? "Saving..." : submitLabel}
            </button>
            <button
              type="button"
              onClick={() => setConfirmAction("reset")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <FiRotateCcw />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmAction("cancel")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <FiX />
              Cancel
            </button>
          </div>
        </div>
      </form>

      <ConfirmModal
        isOpen={confirmAction === "submit"}
        title="Submit this notice?"
        message="Please confirm that the notice details are correct before saving."
        confirmLabel={submitting ? "Saving..." : submitLabel}
        onConfirm={submitConfirmed}
        onCancel={() => setConfirmAction(null)}
      />
      <ConfirmModal
        isOpen={confirmAction === "reset"}
        title="Reset this form?"
        message="All unsaved form changes will be cleared."
        confirmLabel="Reset Form"
        variant="danger"
        onConfirm={resetConfirmed}
        onCancel={() => setConfirmAction(null)}
      />
      <ConfirmModal
        isOpen={confirmAction === "cancel"}
        title="Cancel and leave?"
        message="Any unsaved changes will be lost."
        confirmLabel="Leave Page"
        variant="danger"
        onConfirm={cancelConfirmed}
        onCancel={() => setConfirmAction(null)}
      />
    </>
  );
}
