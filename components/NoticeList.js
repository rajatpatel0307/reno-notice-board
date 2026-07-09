import NoticeCard from "./NoticeCard";

export default function NoticeList({ notices, onDeleted }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDeleted={onDeleted} />
      ))}
    </section>
  );
}
