import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClipboard,
  FiFileText,
  FiFilter,
  FiGrid,
  FiPlusCircle,
  FiRefreshCcw,
  FiSearch,
} from "react-icons/fi";
import NoticeCard from "../components/NoticeCard";

const statCards = [
  { key: "total", label: "Total Notices", Icon: FiClipboard, color: "bg-blue-50 text-blue-700 border-blue-100" },
  { key: "exam", label: "Exam Notices", Icon: FiFileText, color: "bg-violet-50 text-violet-700 border-violet-100" },
  { key: "event", label: "Event Notices", Icon: FiGrid, color: "bg-amber-50 text-amber-700 border-amber-100" },
  { key: "general", label: "General Notices", Icon: FiGrid, color: "bg-sky-50 text-sky-700 border-sky-100" },
  { key: "normal", label: "Normal Priority Notices", Icon: FiCheckCircle, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { key: "urgent", label: "Urgent Priority Notices", Icon: FiAlertCircle, color: "bg-red-50 text-red-700 border-red-100" },
];

export default function DashboardPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    priority: "All",
  });

  async function fetchNotices() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/notices");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load notices.");
      }

      setNotices(data.notices);
    } catch (loadError) {
      setError(loadError.message);
      toast.error(loadError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  const counts = useMemo(() => {
    return {
      total: notices.length,
      exam: notices.filter((notice) => notice.category === "Exam").length,
      event: notices.filter((notice) => notice.category === "Event").length,
      general: notices.filter((notice) => notice.category === "General").length,
      normal: notices.filter((notice) => notice.priority === "Normal").length,
      urgent: notices.filter((notice) => notice.priority === "Urgent").length,
    };
  }, [notices]);

  const filteredNotices = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesSearch =
        !search ||
        notice.title.toLowerCase().includes(search) ||
        notice.body.toLowerCase().includes(search) ||
        notice.category.toLowerCase().includes(search);
      const matchesCategory = filters.category === "All" || notice.category === filters.category;
      const matchesPriority = filters.priority === "All" || notice.priority === filters.priority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [filters, notices]);

  function updateFilter(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters({
      search: "",
      category: "All",
      priority: "All",
    });
  }

  return (
    <>
      {loading ? <p className="rounded-xl bg-white p-5 text-gray-600 shadow-sm">Loading dashboard...</p> : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">Could not load dashboard data.</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-28 xl:self-start">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                    <FiFilter />
                    Filters
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-gray-950">Refine notices</h2>
                </div>
              </div>

              <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiSearch />
                  Search
                </span>
                <input
                  name="search"
                  value={filters.search}
                  onChange={updateFilter}
                  placeholder="Search title, content, or category"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiFilter />
                  Category
                </span>
                <select
                  name="category"
                  value={filters.category}
                  onChange={updateFilter}
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All</option>
                  <option value="Exam">Exam</option>
                  <option value="Event">Event</option>
                  <option value="General">General</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiAlertCircle />
                  Priority
                </span>
                <select
                  name="priority"
                  value={filters.priority}
                  onChange={updateFilter}
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All</option>
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </label>

              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                <FiRefreshCcw />
                Clear
              </button>
            </div>
            </section>
          </aside>

          <div className="min-w-0">
            <section className="mb-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {statCards.map((card) => {
                const Icon = card.Icon;
                return (
                  <article
                    key={card.key}
                    className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${card.color}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold opacity-80">{card.label}</p>
                        <p className="mt-2 text-4xl font-bold">{counts[card.key]}</p>
                      </div>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80 text-xl shadow-sm">
                        <Icon />
                      </span>
                    </div>
                  </article>
                );
              })}
            </section>

            <section>
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-gray-950">Filtered notices</h2>
                <p className="text-sm font-semibold text-gray-500">{filteredNotices.length} result(s)</p>
              </div>

              {filteredNotices.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {filteredNotices.map((notice) => (
                    <NoticeCard key={notice.id} notice={notice} onDeleted={fetchNotices} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-gray-950">No matching notices</h3>
                  <p className="mt-2 text-gray-600">Try changing your search, date, category, or priority filter.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FiRefreshCcw />
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
