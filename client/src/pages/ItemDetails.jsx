import { Link, useParams } from "react-router-dom";
import { listings } from "../data/mockListings";

function ItemDetails() {
  const { id } = useParams();
  const item = listings.find((listing) => listing.id === Number(id));

  if (!item) {
    return (
      <section className="min-h-[70vh] bg-transparent py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h1 className="text-4xl font-bold">Item not found</h1>

          <p className="mt-4 text-gray-600">
            This listing does not exist or may have been removed.
          </p>

          <Link
            to="/items"
            className="mt-8 inline-block rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white"
          >
            Back to Listings
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-transparent py-16">
      <div className="mx-auto max-w-5xl px-5">
        <Link to="/items" className="font-semibold text-[#5F259F]">
          ← Back to listings
        </Link>

        <div className="mt-8 grid gap-8 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-[320px_1fr]">
          <div className="grid min-h-72 place-items-center rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
            <span className="text-8xl">{item.icon}</span>
          </div>

          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                item.status === "Lost"
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {item.status}
            </span>

            <h1 className="mt-4 text-4xl font-bold">{item.title}</h1>

            <p className="mt-4 leading-7 text-gray-600">{item.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Category
                </p>
                <p className="mt-1 font-semibold">{item.category}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Location
                </p>
                <p className="mt-1 font-semibold">{item.location}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Color
                </p>
                <p className="mt-1 font-semibold">{item.color}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Brand
                </p>
                <p className="mt-1 font-semibold">{item.brand}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-purple-200 bg-purple-50 p-5">
              <h2 className="font-bold text-[#5F259F]">Ownership check</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {item.privateNote}
              </p>
            </div>

            <button className="mt-8 rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]">
              Claim / Contact About Item
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetails;