import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const convertToMD5 = (value) => {
    return md5(value);
  };

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setFormError("");
    setFormSuccess("");

    if (!email.trim() || !username.trim() || !password.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password: convertToMD5(password),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setFormError(data.error || "Registration failed. Please try again.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChange"));

      setFormSuccess("Account created successfully. Redirecting...");
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.error("Register error:", err);
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

            <h1 className="mt-3 text-3xl font-bold">Register</h1>

            <p className="mt-3 leading-6 text-gray-600">
              Create an account to report lost items, post found items, and help
              return belongings.
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

          <form onSubmit={handleRegister} noValidate className="mt-8 space-y-5">
            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="name@stu-mail.hunter.cuny.edu"
              />
            </div>

            <div>
              <label className="font-semibold">Username</label>
              <input
                type="text"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Choose a username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#5F259F]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;