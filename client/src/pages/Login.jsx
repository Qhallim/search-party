import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const convertToMD5 = (value) => {
    return md5(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setFormError("");
    setFormSuccess("");

    if (!identifier.trim() || !password.trim()) {
      setFormError("Please enter your email/username and password.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: identifier.trim(),
          password: convertToMD5(password),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setFormError(data.error || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChange"));

      setFormSuccess("Login successful. Redirecting...");
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.error("Login error:", err);
      setFormError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
              Account
            </span>

            <h1 className="mt-3 text-3xl font-bold">Log In</h1>

            <p className="mt-3 leading-6 text-gray-600">
              Log in to post items, claim listings, and manage your reports.
            </p>
          </div>

          {formError && (
            <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {formError}
            </p>
          )}

          {formSuccess && (
            <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {formSuccess}
            </p>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="font-semibold">Email or username</label>
              <input
                type="text"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Email or username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New user?{" "}
            <Link to="/register" className="font-semibold text-[#5F259F]">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;