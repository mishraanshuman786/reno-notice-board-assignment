import { useState } from "react";
import { useRouter } from "next/router";

function toDateInputValue(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

export default function NoticeForm({ initialNotice, noticeId }) {
  const router = useRouter();
  const isEditing = Boolean(noticeId);

  const [form, setForm] = useState({
    title: initialNotice?.title || "",
    body: initialNotice?.body || "",
    category: initialNotice?.category || "GENERAL",
    priority: initialNotice?.priority || "NORMAL",
    publishDate: toDateInputValue(initialNotice?.publishDate) || toDateInputValue(new Date()),
    image: initialNotice?.image || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(
        isEditing ? `/api/notices/${noticeId}` : "/api/notices",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSubmitting(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="EXAM">Exam</option>
            <option value="EVENT">Event</option>
            <option value="GENERAL">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-gray-900 text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Notice"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}