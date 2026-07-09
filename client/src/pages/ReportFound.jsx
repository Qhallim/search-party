import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Electronics",
  "Wallet",
  "Bags",
  "ID Cards",
  "Bottle",
  "Clothing",
  "Keys",
  "Books",
  "Other",
];

const initialFormData = {
  name: "",
  category: "",
  color: "",
  brand: "",
  location: "",
  dateFound: "",
  description: "",
  verificationDetail: "",
};

function ReportFound() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    setFormError("");
    setImageFile(null);
    setImagePreview("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please upload an image file.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function convertImageToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read image file."));

      reader.readAsDataURL(file);
    });
  }

  function resetForm() {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setFormError("");
    setFormSuccess("");

    const currentUser = getCurrentUser();

    if (!currentUser) {
      setFormError("Please log in before submitting a found item report.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.location.trim() ||
      !formData.dateFound ||
      !formData.description.trim() ||
      !formData.verificationDetail.trim()
    ) {
      setFormError(
        "Please fill in the item name, category, location, date, public description, and private verification detail.",
      );
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await convertImageToDataUrl(imageFile);
      const API_URL = import.meta.env.VITE_API_URL;

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        status: "Found",
        color: formData.color.trim(),
        brand: formData.brand.trim(),
        location: formData.location.trim(),
        date: formData.dateFound,
        description: formData.description.trim(),
        verificationDetail: formData.verificationDetail.trim(),
        imageUrl,
        username: currentUser.username || currentUser.email || "unknown",
        userId: currentUser._id || currentUser.id,
      };

      const res = await fetch(`${API_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setFormError(data.error || "Could not submit the found item report.");
        return;
      }

      setFormSuccess("Found item report submitted successfully.");
      resetForm();
    } catch (err) {
      console.error("Found item submission error:", err);
      setFormError(
        "Something went wrong while submitting the report. The backend route may not be ready yet.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[70vh] bg-transparent px-4 py-10 sm:px-5 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-3xl bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <span className="text-sm font-bold uppercase tracking-widest text-[#5F259F]">
            Found item report
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Report a found item
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Add public details about the item, but leave out one identifying
            detail so the real owner can verify it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          {formError && (
            <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {formError}{" "}
              {formError.includes("log in") && (
                <Link to="/login" className="underline">
                  Go to login
                </Link>
              )}
            </p>
          )}

          {formSuccess && (
            <p className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {formSuccess}{" "}
              <Link to="/items" className="underline">
                View listings
              </Link>
            </p>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-semibold">Item name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Student ID card"
              />
            </div>

            <div>
              <label className="font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold">Color</label>
              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Black"
              />
            </div>

            <div>
              <label className="font-semibold">Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Apple, Nike, Hydro Flask"
              />
            </div>

            <div>
              <label className="font-semibold">Found location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: Hunter West lobby"
              />
            </div>

            <div>
              <label className="font-semibold">Date found</label>
              <input
                name="dateFound"
                type="date"
                value={formData.dateFound}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Public description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Describe the item, but do not include every identifying detail."
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">
                Private verification detail
              </label>
              <textarea
                name="verificationDetail"
                value={formData.verificationDetail}
                onChange={handleChange}
                rows="4"
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#5F259F] focus:ring-4 focus:ring-purple-100"
                placeholder="Example: The owner should know what sticker is on the item, what is inside it, or the exact name on the ID."
              />
              <p className="mt-2 text-sm text-gray-500">
                This should not be publicly shown. It will be used to help
                prevent false claims.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Upload photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
              />

              {imagePreview && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Found item preview"
                    className="max-h-80 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-[#5F259F] px-6 py-3 font-semibold text-white transition hover:bg-[#481978] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Submitting..." : "Submit Found Item Report"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReportFound;