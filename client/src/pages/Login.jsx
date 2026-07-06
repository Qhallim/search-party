import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="min-h-[70vh] bg-transparent py-16">
      <div className="mx-auto max-w-md px-5">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
              Account
            </span>

            <h1 className="mt-3 text-3xl font-bold">Sign in</h1>

            <p className="mt-3 text-gray-600">
              Sign in to post items, claim listings, and manage reports.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="name@myhunter.cuny.edu"
              />
            </div>

            <div>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New user?{" "}
            <Link to="/report-found" className="font-semibold text-[#5F259F]">
              Post an item first
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;