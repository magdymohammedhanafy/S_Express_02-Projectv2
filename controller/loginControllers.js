const {loginDB}=require('../model/dataBase');


let login=(req,res)=>{
    try
    {
        let user=loginDB(req.body);
        res.status(200).json(user); 
    }
    catch(err)
    {
        res.status(404).json(err.message); 
    }
   
}

module.exports={login};

