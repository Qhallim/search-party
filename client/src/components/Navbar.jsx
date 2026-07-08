import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Browse Items", path: "/items" },
  { label: "Report Lost", path: "/report-lost" },
  { label: "Report Found", path: "/report-found" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")),
  );

  const username = user?.username;

  useEffect(() => {
    function handleUserChange() {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    window.addEventListener("storage", handleUserChange);
    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleUserChange);
      window.removeEventListener("userChange", handleUserChange);
    };
  }, []);

  function logout() {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#5F259F]/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-white/70 text-sm font-bold sm:h-11 sm:w-11">
            LF
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold sm:text-base">
              Hunter Lost & Found
            </p>
            <p className="hidden text-xs text-white/70 sm:block">
              Reconnect with your belongings
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {username ? (
            <div className="flex items-center gap-3 rounded-lg border border-white/40 px-3 py-2">
              <span className="max-w-40 truncate text-sm font-semibold">
                Welcome, {username}
              </span>

              <button
                onClick={logout}
                className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#5F259F] transition hover:bg-purple-50"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#5F259F] transition hover:bg-purple-50"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((current) => !current)}
          className="rounded-lg border border-white/40 px-3 py-2 text-lg font-bold transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/15 bg-[#5F259F] px-4 py-4 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 grid gap-3">
              {username ? (
                <div className="rounded-xl border border-white/20 p-3">
                  <p className="mb-3 text-sm font-semibold">
                    Welcome, {username}
                  </p>

                  <button
                    onClick={logout}
                    className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#5F259F]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-white/50 px-4 py-2 text-center text-sm font-semibold transition hover:bg-white/10"
                  >
                    Register
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-[#5F259F] transition hover:bg-purple-50"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;