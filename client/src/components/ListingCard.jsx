import { Link } from "react-router-dom";

function ListingCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <div className="relative aspect-square max-h-[420px] overflow-hidden bg-purple-50">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover rounded-t-2xl"
        />

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${item.status === "Lost"
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


        <h3 className="mt-2 text-xl font-bold">
          {item.name}
        </h3>


        <p className="mt-3 min-h-16 text-sm leading-6 text-gray-600">
          {item.description}
        </p>


        <div className="mt-5 space-y-2 text-sm text-gray-500">

          <p>
            📍 {item.location}
          </p>

          <p>
            🎨 {item.color}
          </p>

          {item.brand && (
            <p>
              🏷️ {item.brand}
            </p>
          )}

          <p>
            👤 Posted by: @{item.username}
          </p>

          <p>
            🕒 {new Date(item.createdAt).toLocaleDateString()}
          </p>

        </div>


        <button
          className="mt-6 flex w-full items-center justify-between border-t border-gray-200 pt-4 font-semibold text-[#5F259F]"
        >
          View Details
          <span>→</span>
        </button>

      </div>

    </article>
  );
}

export default ListingCard;