const { Router } =require ("express");
const {addNewUser}=require("../controller/registerRouteControllers")
const registerRouter=Router();
module.exports=registerRouter;


registerRouter.post("/registration", addNewUser);

  
