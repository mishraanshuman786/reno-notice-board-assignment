export default function handler(req,res){
    res.status(200).json({message:`Server is running healthy on port 3000`});
}