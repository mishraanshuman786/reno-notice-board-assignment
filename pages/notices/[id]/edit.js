import NoticeForm from "../../../components/NoticeForm";
import prisma from "../../../lib/prisma";

export default function EditNotice({ notice }) {
  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Notice not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Edit Notice</h1>
      <NoticeForm initialNotice={notice} noticeId={notice.id} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return { props: { notice: null } };
  }

  const notice = await prisma.notice.findUnique({ where: { id } });

  return {
    props: {
      notice: notice ? JSON.parse(JSON.stringify(notice)) : null,
    },
  };
}