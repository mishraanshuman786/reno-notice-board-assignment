import prisma from "@/lib/prisma";

const valid_catgories=["EXAM","EVENT","GENERAL"];
const valid_PRORITIES=["NORMAL","URGENT"];

function validateNoticeInput(body){
  const errors=[];

  if(!body.title || typeof body.title!=="string" || !body.title.trim()){
    errors.push("title is required!")
  }
  if(!body.body || typeof body.body !== "string" || !body.body.trim()){
    errors.push("body is required!")
  }
  if(body.category && !valid_catgories.includes(body.category)){
    errors.push("Category must be one of Exam, Event, General!");
  }
  if(body.priority && !valid_PRORITIES.includes(body.priority)){
    errors.push("Priority Must be Normal or Urgent!");
  }
  if(!body.publishDate || isNaN(Date.parse(body.publishDate))){
    errors.push("publish Date must be a valid Date!");
  }

  return errors;
}

export default async function handler(req,res){
    const {id}=req.query;
    const noticeId=parseInt(id,10);

    if(isNaN(noticeId)) return res.status(400).json({error:"Invalid Notice Id."});

    if(req.method==="GET"){
        try{

            const notice=await prisma.notice.findUnique({where:{id:noticeId}});
            if(!notice) return res.status(404).json({error:"Notice Not Found!"});

            return res.status(200).json(notice);
        }
        catch(error){
            console.error(err);
            return res.status(500).json({error:"Failed to Fetch Notice!"});
        }
    }
    if(req.method==="PUT" || req.method==="PATCH"){
        const errors=validateNoticeInput(req.body);
        if(errors.length>0){
            return res. status(400).json({error: errors.join(", ")});
        }

        try{

            const existing=await prisma.notice.findUnique({where:{id:noticeId}});

            if(!existing) return res.status(404).json({error:"Notice Not Found!"});

            const notice=await prisma.notice.update({where:{id:noticeId}, data:{
                title:req.body.title.trim(),
                body:req.body.body.trim(),
                category:req.body.category || "GENERAL",
                priority: req.body.priority || "NORMAL",
                publishDate:new Date(req.body.publishDate),
                image:req.body.image || null

            }});

            return res.status(200).json(notice);


        }
        catch(error){
            console.error(error);
            return res.status(500).json({error:"Failed to Update Notice!"});
        }
    }

    if(req.method==="DELETE"){
        try{
            const existing=await prisma.notice.findUnique({where:{id:noticeId}});
            if(!existing) return res.status(404).json({error:"Notice Not Found!"});

            await prisma.notice.delete({where:{id:noticeId}});

            return res.status(204).end();

        }
        catch(error){
            console.error(error);
            res.status(500).json({error:"Failed to Delete the Notice!"});
        }
    }

    res.setHeader("Allow",["GET","PUT","PATCH","DELETE"]);
    return res.status(405).json({error:`Method ${req.method} not allowed!`});
}

