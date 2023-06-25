const {addNewUserDB}=require('../model/dataBase');


let addNewUser=(req,res)=>{
    try
    {
        let newUser=addNewUserDB(req.body);
        res.status(200).json({...newUser,"success":true});
    }
    catch(err)
    {
        res.status(400).json(err.message);
    } 
}

module.exports={addNewUser};