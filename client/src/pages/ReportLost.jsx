import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportLost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    status: "Lost",
    description: "",
    location: "",
    color: "",
    brand: "",
    contact: "",
    username: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (image) {
        data.append("image", image);
      }

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to create post");
      }

      setMessage("Your item post was created successfully.");
      setFormData({
        name: "",
        category: "Electronics",
        status: "Lost",
        description: "",
        location: "",
        color: "",
        brand: "",
        contact: "",
        username: "",
      });
      setImage(null);
      navigate("/items");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[70vh] bg-transparent py-16">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Lost item report
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Report a lost item
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Add a clear photo, a helpful description, and your contact details so the item can be reunited with its owner.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-xl">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-semibold">Item name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Blue backpack"
              />
            </div>

            <div>
              <label className="font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              >
                <option>Electronics</option>
                <option>Wallet</option>
                <option>Bags</option>
                <option>ID Cards</option>
                <option>Bottle</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              >
                <option>Lost</option>
                <option>Found</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Color</label>
              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Black"
              />
            </div>

            <div>
              <label className="font-semibold">Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Apple, Nike, Hydro Flask"
              />
            </div>

            <div>
              <label className="font-semibold">Your username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: alex123"
              />
            </div>

            <div>
              <label className="font-semibold">Last seen location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Hunter Library"
              />
            </div>

            <div>
              <label className="font-semibold">Contact / meetup info</label>
              <input
                name="contact"
                value={formData.contact || ""}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Text me at 555-0100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Describe the item, the location, and how to reach you."
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Upload photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setImage(event.target.files?.[0] || null)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              />
            </div>
          </div>

          {message && (
            <p className="mt-6 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Uploading..." : "Submit Lost Item Report"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReportLost;