import { useRouter } from "next/router";
import Layout from "../../components/Layout";
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
      const error = new Error(data.message || "Unable to create notice.");
      error.details = data.errors;
      throw error;
    }

    router.push("/");
  }

  return (
    <Layout>
      <section className="page-heading">
        <p className="eyebrow">New notice</p>
        <h1>Add a notice</h1>
      </section>
      <NoticeForm onSubmit={createNotice} submitLabel="Create notice" />
    </Layout>
  );
}
