import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function MyPosts() {
  const currentUser = getCurrentUser();

  const [receivedClaims, setReceivedClaims] = useState([]);
  const [sentClaims, setSentClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  async function loadClaims() {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const API_URL = import.meta.env.VITE_API_URL;
      const [receivedRes, sentRes] = await Promise.all([
        fetch(`${API_URL}/api/claims/received?username=${currentUser.username}`),
        fetch(`${API_URL}/api/claims/sent?username=${currentUser.username}`),
      ]);

      const receivedData = await receivedRes.json();
      const sentData = await sentRes.json();

      if (!receivedRes.ok || !sentRes.ok) {
        throw new Error("Failed to load claims");
      }

      setReceivedClaims(receivedData);
      setSentClaims(sentData);
    } catch (err) {
      console.error("Error loading claims:", err);
      setError("Could not load your claims.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClaims();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDecision(claimId, status) {
    setActionError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/claims/${claimId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Could not update claim");
      }

      await loadClaims();
    } catch (err) {
      console.error("Error updating claim:", err);
      setActionError("Could not update this claim. Please try again.");
    }
  }

  if (!currentUser) {
    return (
      <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm sm:p-10">
          <h1 className="mt-2 text-2xl font-bold">My Posts</h1>
          <p className="mt-4 text-gray-600">
            Please log in to review claims on your listings and check the
            status of claims you've submitted.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]"
          >
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <h1 className="text-4xl font-bold md:text-5xl">My Posts</h1>
          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Review claims on items you posted, and check on the claims you've
            submitted for other people's items.
          </p>
        </div>

        {loading && <p className="text-gray-600">Loading claims...</p>}

        {error && (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        {actionError && (
          <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {actionError}
          </p>
        )}

        {!loading && (
          <>
            <div className="rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#5F259F]">
                Claims on my listings
              </h2>

              {receivedClaims.length === 0 ? (
                <p className="mt-4 text-gray-600">
                  No one has submitted a claim on your listings yet.
                </p>
              ) : (
                <div className="mt-5 grid gap-4">
                  {receivedClaims.map((claim) => (
                    <div
                      key={claim._id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">
                          {claim.item?.name || "Item"}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            claim.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : claim.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        From @{claim.claimantUsername} ({claim.claimantEmail})
                      </p>

                      <p className="mt-3 rounded-xl bg-white p-3 text-sm leading-6 text-gray-700">
                        {claim.answer}
                      </p>

                      {claim.status === "Pending" && (
                        <div className="mt-4 flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleDecision(claim._id, "Approved")}
                            className="rounded-xl bg-[#5F259F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#481978]"
                          >
                            Approve &amp; release my email
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDecision(claim._id, "Rejected")}
                            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#5F259F]">
                Claims I've submitted
              </h2>

              {sentClaims.length === 0 ? (
                <p className="mt-4 text-gray-600">
                  You haven't submitted any claims yet.
                </p>
              ) : (
                <div className="mt-5 grid gap-4">
                  {sentClaims.map((claim) => (
                    <div
                      key={claim._id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">
                          {claim.item?.name || "Item"}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            claim.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : claim.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>

                      <p className="mt-3 rounded-xl bg-white p-3 text-sm leading-6 text-gray-700">
                        {claim.answer}
                      </p>

                      {claim.status === "Approved" && claim.ownerEmail && (
                        <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                          You're verified! Contact the poster at{" "}
                          <a
                            href={`mailto:${claim.ownerEmail}`}
                            className="underline"
                          >
                            {claim.ownerEmail}
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default MyPosts;
