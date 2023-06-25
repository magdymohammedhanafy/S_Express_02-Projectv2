const { Router } =require ("express");
const {login}=require("../controller/loginControllers")
const loginRouter=Router();
module.exports=loginRouter;


loginRouter.post("/login", login);