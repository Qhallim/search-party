import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";

function Login() {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {

      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/items`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            login: identifier,
            password: convertToMD5(password)
          })
        }
      );

      const data = await res.json();

      if(data.error){

        alert(data.error);
        return;

      }


      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChange"));
      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      alert("Something went wrong" + err);
    } finally {
      setLoading(false);
    }
  };

  const convertToMD5 = (value) => {
    const hash = md5(value);
    return hash;
};

return (
  <section className="min-h-[70vh] bg-transparent py-16">
    <div className="mx-auto max-w-md px-5">
      <div className="rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Account
          </span>

          <h1 className="mt-3 text-3xl font-bold">Log In</h1>

          <p className="mt-3 text-gray-600">
            Login to post items, claim listings, and manage reports.
          </p>
        </div>

        <form className="mt-8 space-y-5">

          <div>
            <label className="font-semibold">Email or Username</label>
            <input
              type="text"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New user?{" "}
          <Link to="/register" className="font-semibold text-[#5F259F]">
            Register to create a post!
          </Link>
        </p>
      </div>
    </div>
  </section>
);
}

export default Login;