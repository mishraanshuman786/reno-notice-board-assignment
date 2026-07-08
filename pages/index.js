import Image from "next/image";
import localFont from "next/font/local";

import { useEffect,useState } from "react";
import Link from "next/link";
import NoticeCard from "@/components/NoticeCard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

  const [notices,setNotices]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    fetch("/api/notices")
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      setNotices(data);
      setLoading(false);
    })
    .catch(()=>{
      setError("Failed To Load Notices.");
      setLoading(false);
    })

  },[]);

  const handleDeleted=(id)=>{
          setNotices((prev)=>prev.filter((n)=>n.id!==id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
          <Link href="/notices/new" className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition" >
          * Add Notice</Link>
        </div>

        {loading && <p className="text-gray-500 ">Loading notices...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && notices.length===0 && (
          <p className="text-gray-500">No Notices Yet. Create The First One. </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            notices.map((notice)=>(
              <NoticeCard key={notice.id}  notice={notice} onDeleted={handleDeleted}/>
            )

            )
          }

        </div>

      </div>

    </div>
  
  );
}
