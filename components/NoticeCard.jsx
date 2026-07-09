import { useRouter } from "next/router";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";

export default function NoticeCard({ notice, onDeleted }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/notices/${notice.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete Failed!");

      onDeleted(notice.id);
    } catch (err) {
      alert("Could not Delete Notice. Please try again!");
      setDeleting(false);
      setConfirming(false);
    }
  };

  const categoryColors = {
    EXAM: "bg-blue-100 text-blue-800",
    EVENT: "bg-purple-100 text-purple-800",
    GENERAL: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 h-full">
      {notice.image ? (
        <img
          src={notice.image}
          alt={notice.title}
          className="w-full h-32 sm:h-36 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-32 sm:h-36 flex justify-center items-center object-cover rounded-lg border-2 border-dashed">
          <h4>No Image Selected!</h4>
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 break-words">
          {notice.title}
        </h3>

        {notice.priority === "URGENT" && (
          <span className="shrink-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Urgent
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm whitespace-pre-wrap flex-1">
        {notice.body}
      </p>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded-full font-medium ${categoryColors[notice.category]}`}
        >
          {notice.category}
        </span>
        <span className="text-gray-400">
          {new Date(notice.publishDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => router.push(`/notices/${notice.id}/edit`)}
          className="flex-1 text-sm font-medium px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          Edit
        </button>

        <button
          onClick={() => setConfirming(true)}
          className="flex-1 text-sm font-medium px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={confirming}
        title="Delete this notice?"
        message={`"${notice.title}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Confirm Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}