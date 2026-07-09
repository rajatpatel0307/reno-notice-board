import Link from "next/link";
import { FiArrowRight, FiPlusCircle } from "react-icons/fi";

export default function HomePage() {
  return (
    <>
      <section className="relative mb-12 min-h-[70vh] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm sm:mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(20,184,166,0.18),transparent_24%),linear-gradient(135deg,#ffffff,#eff6ff_48%,#f8fafc)]" />
        <div className="absolute -right-16 top-16 h-48 w-48 rounded-3xl border border-white/70 bg-white/55 shadow-2xl backdrop-blur transition duration-500 hover:-translate-y-2 hover:rotate-3" />
        <div className="absolute bottom-14 left-8 hidden h-32 w-32 rounded-3xl border border-blue-100 bg-blue-100/70 shadow-xl transition duration-500 hover:translate-x-2 hover:-rotate-6 sm:block" />
        <div className="absolute bottom-20 right-24 hidden h-24 w-64 rotate-[-8deg] rounded-2xl border border-teal-100 bg-white/75 shadow-xl backdrop-blur lg:block" />

        <div className="relative flex min-h-[70vh] items-center px-6 py-16 sm:px-10 lg:px-14">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-blue-700 shadow-sm">
              Modern Notice Management
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight text-gray-950 sm:text-6xl">
              Welcome to Reno Notice Page
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Manage and view notices easily from one clean dashboard. Keep exams, events, general updates, and
              urgent alerts organized for everyone.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-center font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                <FiArrowRight />
                View Dashboard
              </Link>
              <Link
                href="/notices/new"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 text-center font-bold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md"
              >
                <FiPlusCircle />
                Add Notice
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">About Reno Notice Board</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 sm:text-4xl">
            A simple place for important announcements.
          </h2>
          <div className="mt-5 space-y-4 leading-7 text-gray-600">
            <p>
              Reno Notice Board helps users view notices for exams, events, general updates, and urgent alerts from a
              single organized interface.
            </p>
            <p>
              Admins and users can add, edit, and manage notices quickly, while the dashboard makes it easier to search
              and filter information when the board grows.
            </p>
            <p>
              It is useful for schools, offices, and teams that need a clean notice system without complicated steps.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            alt="Professional workspace notice board"
            className="h-full min-h-[320px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </section>
    </>
  );
}
