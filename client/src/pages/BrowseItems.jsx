import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import SearchFilters from "../components/SearchFilters";
import { listings } from "../data/mockListings";

function BrowseItems() {
  const [searchParams] = useSearchParams();

  const startingCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(startingCategory);
  const [status, setStatus] = useState("All");

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const searchText = `
        ${item.title}
        ${item.category}
        ${item.status}
        ${item.location}
        ${item.color}
        ${item.brand}
        ${item.description}
      `.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      const matchesStatus = status === "All" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setStatus("All");
  }

  return (
    <section className="min-h-[70vh] bg-transparent py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Browse items
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Lost and found listings
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Search by item type, color, brand, location, or report status.
          </p>
        </div>

        <SearchFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          clearFilters={clearFilters}
        />

        <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
          <p>
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredListings.length}
            </span>{" "}
            items
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-purple-300 bg-purple-50 p-16 text-center">
            <div className="text-5xl">🔍</div>

            <h3 className="mt-5 text-2xl font-bold">No matching items found</h3>

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
  );
}

export default BrowseItems;