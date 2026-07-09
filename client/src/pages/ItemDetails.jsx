import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function ItemDetails() {
  const { id } = useParams();
  const location = useLocation();

  const passedItem = location.state?.item;

  const [item, setItem] = useState(passedItem || null);
  const [loading, setLoading] = useState(!passedItem);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");
  const [claimError, setClaimError] = useState("");
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [submittingClaim, setSubmittingClaim] = useState(false);

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (passedItem) {
      setItem(passedItem);
      setLoading(false);
      return;
    }

    async function fetchItem() {
      try {
        setLoading(true);
        setError("");

        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/api/items/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch item");
        }

        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Error loading item:", err);
        setError("This listing does not exist or could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id, passedItem]);

  async function handleClaimSubmit(event) {
    event.preventDefault();

    setClaimError("");

    if (!currentUser) {
      setClaimError("Please log in before submitting a claim.");
      return;
    }

    if (item.resolved) {
      setClaimError("This item has already been claimed.");
      return;
    }

    if (!answer.trim()) {
      setClaimError("Please answer the verification question.");
      return;
    }

    setSubmittingClaim(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/claims`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item._id,
          claimantUsername: currentUser.username,
          claimantEmail: currentUser.email,
          answer: answer.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setClaimError(data.error || "Could not submit your claim.");
        return;
      }

      setClaimSuccess(true);
      setAnswer("");
    } catch (err) {
      console.error("Claim submission error:", err);
      setClaimError("Something went wrong while submitting your claim.");
    } finally {
      setSubmittingClaim(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <div className="text-4xl">⏳</div>

          <h1 className="mt-4 text-2xl font-bold">Loading item...</h1>

          <p className="mt-2 text-gray-600">Fetching the listing details.</p>
        </div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <div className="text-5xl">🔍</div>

          <h1 className="mt-4 text-3xl font-bold">Item not found</h1>

          <p className="mt-4 text-gray-600">
            {error || "This listing does not exist or may have been removed."}
          </p>

          <Link
            to="/items"
            className="mt-8 inline-block rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]"
          >
            Back to Listings
          </Link>
        </div>
      </section>
    );
  }

  const itemName = item.name || item.title || "Untitled Item";

  const postedDate = item.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "Recently posted";

  return (
    <section className="min-h-[70vh] bg-transparent px-4 py-8 sm:px-5 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/items"
          className="inline-flex items-center rounded-xl bg-white/85 px-4 py-2 text-sm font-semibold text-[#5F259F] shadow-sm backdrop-blur-sm transition hover:bg-white sm:text-base"
        >
          ← Back to listings
        </Link>

        <div className="mt-6 grid overflow-hidden rounded-3xl bg-white/95 shadow-xl backdrop-blur-sm lg:mt-8 lg:grid-cols-[420px_1fr]">
          <div className="relative h-72 bg-gradient-to-br from-purple-50 to-purple-100 sm:h-96 lg:h-auto lg:min-h-full">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={itemName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-7xl sm:text-8xl">
                📦
              </div>
            )}

            <span
              className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-bold sm:right-5 sm:top-5 ${
                item.resolved
                  ? "bg-gray-200 text-gray-700"
                  : item.status === "Lost"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {item.resolved ? "Resolved" : item.status}
            </span>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#5F259F]">
              {item.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {itemName}
            </h1>

            <p className="mt-4 leading-7 text-gray-600">{item.description}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Location
                </p>
                <p className="mt-1 font-semibold">
                  {item.location || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Color
                </p>
                <p className="mt-1 font-semibold">
                  {item.color || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Brand
                </p>
                <p className="mt-1 font-semibold">
                  {item.brand || "Not provided"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase text-gray-400">
                  Date posted
                </p>
                <p className="mt-1 font-semibold">{postedDate}</p>
              </div>

              {item.username && (
                <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Posted by
                  </p>
                  <p className="mt-1 font-semibold">@{item.username}</p>
                </div>
              )}
            </div>

            <div className="mt-7 rounded-2xl border border-purple-200 bg-purple-50 p-5">
              <h2 className="font-bold text-[#5F259F]">Ownership check</h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {item.verificationDetail ||
                  "The person claiming this item should be able to provide details that were not publicly shown in the listing."}
              </p>
            </div>

            {currentUser && currentUser.username === item.username ? (
              <p className="mt-7 rounded-xl bg-purple-50 px-4 py-3 text-sm font-semibold leading-6 text-[#5F259F]">
                This is your listing. Review incoming claims from{" "}
                <Link to="/my-posts" className="underline">
                  My Posts
                </Link>
                .
              </p>
            ) : claimSuccess ? (
              <p className="mt-7 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
                Your answer was submitted. Check{" "}
                <Link to="/my-posts" className="underline">
                  My Posts
                </Link>{" "}
                to see if the poster approves it and releases their contact
                info.
              </p>
            ) : item.resolved ? (
              <p className="mt-7 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold leading-6 text-gray-600">
                This item has already been claimed and is no longer accepting
                claims.
              </p>
            ) : (
              <form onSubmit={handleClaimSubmit} className="mt-7">
                <label className="font-semibold">Your answer</label>
                <textarea
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  rows="3"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                  placeholder="Answer the ownership check question above"
                />

                {claimError && (
                  <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {claimError}{" "}
                    {claimError.includes("log in") && (
                      <Link to="/login" className="underline">
                        Go to login
                      </Link>
                    )}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submittingClaim}
                  className="mt-4 w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {submittingClaim ? "Submitting..." : "Claim / Contact About Item"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ItemDetails;