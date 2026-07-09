import NoticeCard from "./NoticeCard";

export default function NoticeList({ notices, onDeleted }) {
  if (!notices.length) {
    return (
      <section className="empty-state">
        <h2>No notices yet</h2>
        <p>Create the first notice for the board.</p>
      </section>
    );
  }

  return (
    <section className="notice-grid">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDeleted={onDeleted} />
      ))}
    </section>
  );
}
