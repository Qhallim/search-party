function ReportFound() {
  return (
    <section className="min-h-[70vh] bg-transparent py-16">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Found item report
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Report a found item
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Add public details about the item, but leave out one identifying
            detail so the real owner can verify it.
          </p>
        </div>

        <form className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-semibold">Item name</label>
              <input
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Student ID card"
              />
            </div>

            <div>
              <label className="font-semibold">Category</label>
              <select className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100">
                <option>Electronics</option>
                <option>Wallet</option>
                <option>Bags</option>
                <option>ID Cards</option>
                <option>Bottle</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Found location</label>
              <input
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Hunter West lobby"
              />
            </div>

            <div>
              <label className="font-semibold">Date found</label>
              <input
                type="date"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Public description</label>
              <textarea
                rows="5"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Describe the item, but do not include every identifying detail."
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Private verification detail
              </label>
              <textarea
                rows="4"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: The owner should know what sticker is on the item, what is inside it, or the exact name on the ID."
              />
              <p className="mt-2 text-sm text-gray-500">
                This should not be publicly shown. It will be used to help
                prevent false claims.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Upload photo</label>
              <input
                type="file"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-8 rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]"
          >
            Submit Found Item Report
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReportFound;