import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {

  //For username
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const username = user?.username;

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userChange", handleStorageChange);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-medium transition ${isActive ? "text-white" : "text-white/80 hover:text-white"
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
          {username ? (
            <div className="rounded-lg border border-white/50 px-4 py-2 font-semibold">
              Welcome back, {username}

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.dispatchEvent(new Event("userChange"));
                }}
                className="ml-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#5F259F]"
              >
                Logout
              </button>

            </div>
          ) : (

            <>
            
            <Link
              to="/register"
              className="rounded-lg border border-white/50 px-4 py-2 font-semibold transition hover:bg-white/10"
            >
              Register
            </Link>
            
            <Link
              to="/login"
              className="rounded-lg border border-white/50 px-4 py-2 font-semibold transition hover:bg-white/10"
            >
              Login
            </Link>
            </>
            

          )}
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
            <Link onClick={() => setMenuOpen(false)} to="/register">
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;