import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-white" : "text-white/80 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#5F259F] text-white shadow-lg">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-white/70 font-bold">
            LF
          </div>

          <div>
            <p className="font-bold">Hunter Lost & Found</p>
            <p className="hidden text-xs text-white/70 sm:block">
              Reconnect with your belongings
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/items" className={linkClass}>
            Browse Items
          </NavLink>

          <NavLink to="/report-lost" className={linkClass}>
            Report Lost
          </NavLink>

          <NavLink to="/report-found" className={linkClass}>
            Report Found
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-lg border border-white/50 px-4 py-2 font-semibold transition hover:bg-white/10"
          >
            Sign In
          </Link>

          <Link
            to="/report-found"
            className="rounded-lg bg-white px-4 py-2 font-semibold text-[#5F259F] transition hover:bg-purple-50"
          >
            + Post Item
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/40 px-3 py-2 font-bold md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/15 bg-[#5F259F] px-5 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4">
            <Link onClick={() => setMenuOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/items">
              Browse Items
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/report-lost">
              Report Lost
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/report-found">
              Report Found
            </Link>
            <Link onClick={() => setMenuOpen(false)} to="/login">
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;