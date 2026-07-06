import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { categories, listings } from "../data/mockListings";

function Home() {
  const recentListings = listings.slice(0, 3);

  return (
    <>
      <section className="overflow-hidden bg-transparent">
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
              <Link
                to="/report-lost"
                className="rounded-xl bg-[#5F259F] px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#481978]"
              >
                Report a Lost Item
              </Link>

              <Link
                to="/report-found"
                className="rounded-xl border-2 border-[#5F259F] bg-white px-6 py-3 text-center font-semibold text-[#5F259F] transition hover:-translate-y-1 hover:bg-purple-50"
              >
                Report a Found Item
              </Link>
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

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white/50 p-6 text-center backdrop-blur-sm">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Browse quickly
          </span>

          <h2 className="mt-3 text-4xl font-bold">Search by category</h2>

          <p className="mt-4 leading-7 text-gray-600">
            Choose a category to browse lost and found reports faster.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((item) => (
            <Link
              key={item.name}
              to={`/items?category=${encodeURIComponent(item.name)}`}
              className="rounded-2xl border border-gray-200 bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#5F259F] hover:shadow-lg"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-purple-100 text-3xl">
                {item.icon}
              </div>

              <p className="mt-4 font-semibold">{item.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-transparent py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
                Recent activity
              </span>

              <h2 className="mt-3 text-4xl font-bold">Latest listings</h2>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                Browse items recently reported by students and staff.
              </p>
            </div>

            <Link
              to="/items"
              className="rounded-xl bg-[#5F259F] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#481978]"
            >
              Browse All Items
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-transparent py-20">
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
                  "Post information about an item you lost or found, including category, description, and location.",
              },
              {
                number: "2",
                icon: "🔎",
                title: "Search for matches",
                description:
                  "Filter reports using details like item type, color, brand, and campus location.",
              },
              {
                number: "3",
                icon: "🤝",
                title: "Verify and reconnect",
                description:
                  "Verify ownership privately before arranging a safe return.",
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
    </>
  );
}

export default Home;