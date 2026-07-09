import Link from "next/link";

export default function NoticeCard({ notice, onDeleted }) {
  async function handleDelete() {
    const confirmed = window.confirm("Delete this notice?");
    if (!confirmed) return;

    const response = await fetch(`/api/notices/${notice.id}`, {
      method: "DELETE",
    });

    if (response.ok && onDeleted) {
      onDeleted(notice.id);
    }
  }

  return (
    <article className="notice-card">
      <div className="notice-card-header">
        <div>
          <p className="notice-category">{notice.category}</p>
          <h2>{notice.title}</h2>
        </div>
        <span className="notice-date">
          {new Date(notice.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="notice-body">{notice.description}</p>
      <div className="notice-meta">
        <span>{notice.location}</span>
        <span>{notice.contact}</span>
      </div>
      <div className="notice-actions">
        <Link href={`/notices/${notice.id}/edit`} className="button button-light">
          Edit
        </Link>
        <button type="button" className="button button-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
