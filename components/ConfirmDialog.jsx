export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => !loading && onCancel()}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{message}</p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 text-sm font-medium px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 text-sm font-medium px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}