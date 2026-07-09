import { Link } from "react-router-dom";

function ListingCard({ item }) {
  const itemId = item._id || item.id;
  const itemName = item.name || item.title || "Untitled Item";

  const postedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "Recently posted";

  const statusStyle = item.resolved
    ? "bg-gray-200 text-gray-700"
    : item.status === "Lost"
      ? "bg-red-100 text-red-700"
      : "bg-emerald-100 text-emerald-700";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-purple-50">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={itemName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-purple-50 to-purple-100 text-6xl">
            📦
          </div>
        )}

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${statusStyle}`}
        >
          {item.resolved ? "Resolved" : item.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#5F259F]">
          {item.category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-lg font-bold sm:text-xl">
          {itemName}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {item.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>📍 {item.location}</p>

          {item.color && <p>🎨 {item.color}</p>}

          {item.brand && <p>🏷️ {item.brand}</p>}

          {item.username && <p>👤 Posted by: @{item.username}</p>}

          <p>🕒 {postedDate}</p>
        </div>

        {itemId ? (
          <Link
            to={`/items/${itemId}`}
            state={{ item }}
            className="mt-auto flex w-full items-center justify-between border-t border-gray-200 pt-4 font-semibold text-[#5F259F]"
          >
            View Details
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <button
            type="button"
            className="mt-auto flex w-full items-center justify-between border-t border-gray-200 pt-4 font-semibold text-[#5F259F]"
          >
            View Details
            <span>→</span>
          </button>
        )}
      </div>
    </article>
  );
}

export default ListingCard;