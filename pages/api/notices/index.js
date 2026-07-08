import prisma from "@/lib/prisma";

function validateNoticeInput(body){
    const errors=[];

    if(!body.title?.trim()) errors.push("title is required!");
    if(!body.body?.trim()) errors.push("body is required!");
    if (!body.publishDate || isNaN(Date.parse(body.publishDate))) {
    errors.push("publishDate must be a valid date");
  }
  return errors;
}

export default async function handler(req,res){
    if(req.method==="GET"){
        const notices=await prisma.notice.findMany({
            orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
        });

        return res.status(200).json(notices);
    }

    if(req.method==="POST"){
        const errors=validateNoticeInput(req.body);

        if(errors.length) return res.status(400).json({error: errors.join(", ")});

        const notice=await prisma.notice.create({
            data:{
                title:req.body.title.trim(),
                body:req.body.body.trim(),
                category:req.body.category || "GENERAL",
                priority: req.body.priority || "NORMAL",
                publishDate:new Date(req.body.publishDate),
                image:req.body.image || null
            }
        });

        return res.status(201).json(notice);

    }

     res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });

}