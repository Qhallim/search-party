import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import SearchFilters from "../components/SearchFilters";

function BrowseItems() {
  const [searchParams] = useSearchParams();

  const startingCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(startingCategory);
  const [status, setStatus] = useState("All");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchItems() {
    try {
      setLoading(true);
      setError("");


      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/items`);

      if (!res.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await res.json();

      setItems(data);

    } catch (err) {
      console.error("Error loading items:", err);
      setError("Unable to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);


  const filteredListings = useMemo(() => {
    return items.filter((item) => {
      const searchText = `
        ${item.name}
        ${item.category}
        ${item.status}
        ${item.location}
        ${item.color}
        ${item.brand}
        ${item.description}
      `.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesStatus =
        status === "All" || item.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [items, search, category, status]);


  function clearFilters() {
    setSearch("");
    setCategory("All");
    setStatus("All");
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user){

    return (
      <section className="min-h-[70vh] flex items-center justify-center px-5">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="text-6xl">🔒</div>
  
          <h1 className="mt-6 text-3xl font-bold">
            Sign in to browse listings
          </h1>
  
          <p className="mt-4 leading-7 text-gray-600">
            To help protect student privacy, only registered users can browse
            lost and found reports. Create an account or sign in to continue.
          </p>
  
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]"
            >
              Register
            </Link>
  
            <Link
              to="/login"
              className="rounded-xl border border-[#5F259F] px-6 py-3 font-semibold text-[#5F259F] transition hover:bg-purple-50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    );

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
              {loading ? "..." : filteredListings.length}
            </span>{" "}
            items
          </p>
        </div>


        {loading && (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="text-4xl animate-spin">
              ⏳
            </div>

            <h3 className="mt-4 text-xl font-bold">
              Loading items...
            </h3>

            <p className="mt-2 text-gray-600">
              Fetching lost and found listings.
            </p>
          </div>
        )}


        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-12 text-center">

            <div className="text-5xl">
              ⚠️
            </div>

            <h3 className="mt-5 text-2xl font-bold">
              Something went wrong
            </h3>

            <p className="mt-2 text-gray-600">
              {error}
            </p>

            <button
              onClick={fetchItems}
              className="mt-6 rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white"
            >
              Try Again
            </button>

          </div>
        )}


        {!loading && !error && filteredListings.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filteredListings.map((item) => (
              <ListingCard
                key={item._id}
                item={item}
              />
            ))}

          </div>
        )}


        {!loading && !error && filteredListings.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-purple-300 bg-purple-50 p-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

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
  );
}

export default BrowseItems;