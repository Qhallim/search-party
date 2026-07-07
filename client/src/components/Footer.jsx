import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#5F259F] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-2">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/70 font-bold">
              LF
            </div>

            <div>
              <p className="font-bold">Hunter Lost & Found</p>
              <p className="text-xs text-white/70">
                Built for the Hunter College community
              </p>
            </div>
          </div>

          <p className="mt-6 leading-7 text-white/70">
            A student-focused platform for reporting, finding, and safely
            returning lost belongings across campus.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:justify-self-end">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Explore</h3>
            <Link className="text-sm text-white/70 hover:text-white" to="/">
              Home
            </Link>
            <Link className="text-sm text-white/70 hover:text-white" to="/items">
              Browse Items
            </Link>
            <Link
              className="text-sm text-white/70 hover:text-white"
              to="/register"
            >
              Register
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold">Reports</h3>
            <Link
              className="text-sm text-white/70 hover:text-white"
              to="/report-lost"
            >
              Report Lost Item
            </Link>
            <Link
              className="text-sm text-white/70 hover:text-white"
              to="/report-found"
            >
              Report Found Item
            </Link>
            <Link className="text-sm text-white/70 hover:text-white" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-5 text-center text-xs text-white/60 sm:flex-row">
          <p>© 2026 Hunter Lost & Found. Student project.</p>
          <p>Hunter College, New York City</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;