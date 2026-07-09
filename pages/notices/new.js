import { useRouter } from "next/router";
import { FiPlusCircle } from "react-icons/fi";
import NoticeForm from "../../components/NoticeForm";

export default function NewNoticePage() {
  const router = useRouter();

  async function createNotice(values) {
    const response = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to create notice");
      error.details = data.errors;
      throw error;
    }

    router.push("/");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-600">
          <FiPlusCircle />
          Add Notice
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Create a new notice</h1>
        <p className="mt-2 text-slate-600">Fill in the details below and publish it to the board.</p>
      </div>
      <NoticeForm onSubmit={createNotice} submitLabel="Create Notice" successMessage="Notice created successfully" />
    </section>
  );
}
