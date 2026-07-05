import { useMemo, useState } from "react";
import backgroundImage from "./assets/background.png";

const listings = [
  {
    id: 1,
    title: "Black Leather Wallet",
    category: "Wallet",
    status: "Found",
    location: "Hunter West, 3rd Floor",
    date: "Today at 11:20 AM",
    description:
      "A black leather wallet was found near the elevators. Proof of ownership will be required.",
    icon: "👛",
  },
  {
    id: 2,
    title: "Silver Water Bottle",
    category: "Bottle",
    status: "Lost",
    location: "Hunter North, Room 1001",
    date: "Today at 9:45 AM",
    description:
      "Silver insulated water bottle with several stickers on the side.",
    icon: "🥤",
  },
  {
    id: 3,
    title: "Wireless Earbuds",
    category: "Electronics",
    status: "Found",
    location: "Thomas Hunter Hall",
    date: "Yesterday",
    description:
      "White wireless earbuds and charging case found inside a classroom.",
    icon: "🎧",
  },
  {
    id: 4,
    title: "Blue Backpack",
    category: "Bags",
    status: "Lost",
    location: "Hunter Library, 6th Floor",
    date: "Yesterday",
    description:
      "Dark blue backpack containing notebooks and school supplies.",
    icon: "🎒",
  },
  {
    id: 5,
    title: "Hunter Student ID",
    category: "ID Cards",
    status: "Found",
    location: "Hunter East Lobby",
    date: "2 days ago",
    description:
      "A Hunter College student identification card was found near the entrance.",
    icon: "🪪",
  },
  {
    id: 6,
    title: "Graphing Calculator",
    category: "Electronics",
    status: "Lost",
    location: "Hunter North, 4th Floor",
    date: "3 days ago",
    description:
      "Black graphing calculator last seen after a mathematics class.",
    icon: "🧮",
  },
];

const categories = [
  { name: "Electronics", icon: "💻" },
  { name: "Wallet", icon: "👛" },
  { name: "Bags", icon: "🎒" },
  { name: "ID Cards", icon: "🪪" },
  { name: "Bottle", icon: "🥤" },
  { name: "Other", icon: "📦" },
];

function App() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const searchText = `
        ${item.title}
        ${item.category}
        ${item.location}
        ${item.description}
      `.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStatus = status === "All" || item.status === status;
      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, status, category]);

  function showPlaceholder(message) {
    alert(`${message} will be added when routing and the backend are connected.`);
  }

  function clearFilters() {
    setSearch("");
    setStatus("All");
    setCategory("All");
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-gray-900"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="sticky top-0 z-50 bg-[#5F259F] text-white shadow-lg">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/70 font-bold">
              LF
            </div>

            <div>
              <p className="font-bold">Hunter Lost & Found</p>
              <p className="hidden text-xs text-white/70 sm:block">
                Reconnect with your belongings
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a className="font-medium text-white/80 hover:text-white" href="#home">
              Home
            </a>

            <a
              className="font-medium text-white/80 hover:text-white"
              href="#listings"
            >
              Browse Items
            </a>

            <a
              className="font-medium text-white/80 hover:text-white"
              href="#how-it-works"
            >
              How It Works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showPlaceholder("Sign in")}
              className="hidden rounded-lg border border-white/50 px-4 py-2 font-semibold transition hover:bg-white/10 sm:block"
            >
              Sign In
            </button>

            <button
              onClick={() => showPlaceholder("Post item")}
              className="rounded-lg bg-white px-4 py-2 font-semibold text-[#5F259F] transition hover:bg-purple-50"
            >
              + Post Item
            </button>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="overflow-hidden bg-white/40 backdrop-blur-[1px]"
        >
          <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
                Hunter College Community
              </span>

              <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
                Lost something on campus?
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                Search recent listings, report a missing item, or help another
                student recover something they lost.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => showPlaceholder("Lost item report")}
                  className="rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#481978]"
                >
                  Report a Lost Item
                </button>

                <button
                  onClick={() => showPlaceholder("Found item report")}
                  className="rounded-xl border-2 border-[#5F259F] bg-white px-6 py-3 font-semibold text-[#5F259F] transition hover:-translate-y-1 hover:bg-purple-50"
                >
                  Report a Found Item
                </button>
              </div>
            </div>

            <div className="relative hidden min-h-[400px] place-items-center lg:grid">
              <div className="absolute h-80 w-80 rounded-full border-2 border-dashed border-[#5F259F]/30" />
              <div className="absolute h-64 w-64 rounded-full bg-[#5F259F]/10" />

              <div className="relative z-10 grid h-48 w-48 place-items-center rounded-full border-[12px] border-white bg-[#5F259F] text-7xl shadow-2xl">
                🔎
              </div>

              <div className="absolute right-2 top-10 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
                <span className="text-3xl">🎒</span>

                <div>
                  <p className="font-semibold">Blue Backpack</p>
                  <p className="text-xs text-gray-500">Reported lost</p>
                </div>
              </div>

              <div className="absolute bottom-10 left-2 z-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
                <span className="text-3xl">🎧</span>

                <div>
                  <p className="font-semibold">Wireless Earbuds</p>
                  <p className="text-xs text-gray-500">Recently found</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-10 px-5">
          <div className="mx-auto grid max-w-7xl gap-3 rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-xl backdrop-blur-sm md:grid-cols-[1fr_220px_auto]">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#5F259F]">
                🔍
              </span>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by item, color, brand, or location..."
                className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
            >
              <option value="All">All categories</option>

              {categories.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <a
              href="#listings"
              className="flex h-14 items-center justify-center rounded-xl bg-[#5F259F] px-8 font-semibold text-white transition hover:bg-[#481978]"
            >
              Search Items
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24">
          <div className="mx-auto max-w-2xl rounded-3xl bg-white/50 p-6 text-center backdrop-blur-sm">
            <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
              Browse quickly
            </span>

            <h2 className="mt-3 text-4xl font-bold">Search by category</h2>

            <p className="mt-4 leading-7 text-gray-600">
              Select a category to narrow down the current lost and found
              listings.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCategory(item.name);

                  document
                    .getElementById("listings")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`rounded-2xl border bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#5F259F] hover:shadow-lg ${
                  category === item.name
                    ? "border-[#5F259F] bg-purple-50 text-[#5F259F]"
                    : "border-gray-200"
                }`}
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-purple-100 text-3xl">
                  {item.icon}
                </div>

                <p className="mt-4 font-semibold">{item.name}</p>
              </button>
            ))}
          </div>
        </section>

        <section id="listings" className="bg-white/80 py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
                  Recent activity
                </span>

                <h2 className="mt-3 text-4xl font-bold">Latest listings</h2>

                <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                  Browse items recently reported by Hunter College students and
                  staff members.
                </p>
              </div>

              <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
                {["All", "Lost", "Found"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setStatus(item)}
                    className={`flex-1 rounded-lg px-5 py-2 font-semibold transition ${
                      status === item
                        ? "bg-[#5F259F] text-white shadow"
                        : "text-gray-600 hover:text-[#5F259F]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
              <p>
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredListings.length}
                </span>{" "}
                items
              </p>

              {(search || status !== "All" || category !== "All") && (
                <button
                  onClick={clearFilters}
                  className="font-semibold text-[#5F259F] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredListings.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((item) => (
                  <article
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative grid h-48 place-items-center bg-gradient-to-br from-purple-50 to-purple-100">
                      <span className="text-7xl">{item.icon}</span>

                      <span
                        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
                          item.status === "Lost"
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#5F259F]">
                        {item.category}
                      </p>

                      <h3 className="mt-2 text-xl font-bold">{item.title}</h3>

                      <p className="mt-3 min-h-16 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>

                      <div className="mt-5 space-y-2 text-sm text-gray-500">
                        <p>📍 {item.location}</p>
                        <p>🕒 {item.date}</p>
                      </div>

                      <button
                        onClick={() => showPlaceholder(item.title)}
                        className="mt-6 flex w-full items-center justify-between border-t border-gray-200 pt-4 font-semibold text-[#5F259F]"
                      >
                        View Details
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-purple-300 bg-purple-50 p-16 text-center">
                <div className="text-5xl">🔍</div>

                <h3 className="mt-5 text-2xl font-bold">
                  No matching items found
                </h3>

                <p className="mt-2 text-gray-600">
                  Try changing your search terms or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="bg-white/60 py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
                Simple and secure
              </span>

              <h2 className="mt-3 text-4xl font-bold">How it works</h2>

              <p className="mt-4 leading-7 text-gray-600">
                Report, search, verify ownership, and safely reconnect with lost
                belongings.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "1",
                  icon: "📝",
                  title: "Create a report",
                  description:
                    "Post information about an item you lost or found, including its category, description, and location.",
                },
                {
                  number: "2",
                  icon: "🔎",
                  title: "Search for matches",
                  description:
                    "Filter reports using details such as the item type, color, brand, and campus location.",
                },
                {
                  number: "3",
                  icon: "🤝",
                  title: "Verify and reconnect",
                  description:
                    "Verify ownership using private details before arranging a safe return of the item.",
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-purple-100 bg-white p-8 shadow-sm"
                >
                  <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#5F259F] text-sm font-bold text-white">
                    {step.number}
                  </span>

                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-purple-100 text-3xl">
                    {step.icon}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white/70 py-20 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl items-center gap-6 rounded-3xl bg-[#5F259F] px-8 py-10 text-white shadow-xl md:grid-cols-[auto_1fr_auto]">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 text-4xl">
              🛡️
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                Ownership protection
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Help prevent false claims
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-white/75">
                Found-item posts should leave out at least one identifying
                detail. A person claiming the item can provide that detail
                privately to help prove ownership.
              </p>
            </div>

            <button
              onClick={() => showPlaceholder("Safety guidelines")}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-[#5F259F] transition hover:bg-purple-50"
            >
              Safety Guidelines
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#5F259F] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-2">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/70 font-bold">
                LF
              </div>

              <div>
                <p className="font-bold">Hunter Lost & Found</p>
                <p className="text-xs text-white/70">
                  Built for the Hunter College community
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-white/70">
              A student-focused platform for reporting, finding, and safely
              returning lost belongings across campus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-self-end">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Explore</h3>
              <a className="text-sm text-white/70 hover:text-white" href="#home">
                Home
              </a>
              <a
                className="text-sm text-white/70 hover:text-white"
                href="#listings"
              >
                Browse Items
              </a>
              <a
                className="text-sm text-white/70 hover:text-white"
                href="#how-it-works"
              >
                How It Works
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold">Reports</h3>

              <button
                onClick={() => showPlaceholder("Lost item report")}
                className="text-left text-sm text-white/70 hover:text-white"
              >
                Report Lost Item
              </button>

              <button
                onClick={() => showPlaceholder("Found item report")}
                className="text-left text-sm text-white/70 hover:text-white"
              >
                Report Found Item
              </button>

              <button
                onClick={() => showPlaceholder("Contact support")}
                className="text-left text-sm text-white/70 hover:text-white"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-center text-xs text-white/60 sm:flex-row">
            <p>© 2026 Hunter Lost & Found. Student project.</p>
            <p>Hunter College, New York City</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;