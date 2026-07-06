import { Link } from "react-router-dom";

function ListingCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
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

        <Link
          to={`/items/${item.id}`}
          className="mt-6 flex w-full items-center justify-between border-t border-gray-200 pt-4 font-semibold text-[#5F259F]"
        >
          View Details
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}

export default ListingCard;