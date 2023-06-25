const { Router } =require ("express");
const {getAllProducts,getProductById,addNewProduct,UpdateProductById,deleteProductById}=require('../controller/prouductsControllers');
const verifyToken=require('../middleWare/Authentication')
const productsRouter=Router();
module.exports=productsRouter;

productsRouter.get('/products',getAllProducts);
productsRouter.get('/products/:id',getProductById);
productsRouter.post('/products',addNewProduct);
productsRouter.put('/products/:id',UpdateProductById);
productsRouter.delete('/products/:id',deleteProductById);