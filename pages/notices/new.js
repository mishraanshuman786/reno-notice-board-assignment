import NoticeForm from "@/components/NoticeForm";

export default function NewNotice() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Add Notice</h1>
      <NoticeForm />
    </div>
  );
}