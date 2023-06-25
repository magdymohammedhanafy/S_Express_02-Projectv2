
const express=require('express');
const dotenv=require("dotenv");
dotenv.config({path:'config.env'});
const categoriesRouter=require('./routes/categoriesRoute');
const productsRouter=require('./routes/productRoute');
const registerRouter=require('./routes/registerRoute');
const loginRouter=require('./routes/loginRoute');
const authentication=require('./middleWare/Authentication')

let app=express();

//middle wares
app.use(express.json());
app.use(registerRouter);
app.use(loginRouter);
app.use(authentication)
app.use(categoriesRouter);
app.use(productsRouter);


//listening
let PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('server listineng to http://localhost:3000');
})

