import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import md5 from "md5";

function Register() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email, 
            username, 
            password : convertToMD5(password)
        }),
        
      });
      
     const data = await res.json();

      if (data.error) {
        alert("Something went wrong during signup. ERROR: " + data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChange"));
      alert("Sign Up Successful!");
      navigate("/");
    } catch (err) {
      alert("Something went wrong "+ err);
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

          <h1 className="mt-3 text-3xl font-bold">Register</h1>

          <p className="mt-3 text-gray-600">
            Sign in to post items, claim listings, and manage reports.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              placeholder="name@stu-mail.hunter.cuny.edu"
            />
          </div>

          <div>
            <label className="font-semibold">Username</label>
            <input
              type="text"
              className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            {loading ? "Signing up..." : "Register"}
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

export default Register;