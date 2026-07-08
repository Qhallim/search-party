import { categories } from "../data/categories";

function SearchFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  clearFilters,
}) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-white/90 p-4 shadow-xl backdrop-blur-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px_auto]">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#5F259F]">
            🔍
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search item, color, brand, or location..."
            className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100 sm:text-base"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100 sm:text-base"
        >
          <option value="All">All categories</option>

          {categories.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100 sm:text-base"
        >
          <option value="All">All statuses</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <button
          type="button"
          onClick={clearFilters}
          className="h-14 rounded-xl border border-[#5F259F] bg-white px-5 font-semibold text-[#5F259F] transition hover:bg-purple-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchFilters;