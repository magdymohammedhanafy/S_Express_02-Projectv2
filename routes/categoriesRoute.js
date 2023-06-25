const { Router } =require ("express");
const {getAllCategories,getCategoryById,addNewCategory,UpdateCategoryById,deleteCategoryById}=require('../controller/categoriesController');
const categoriesRouter=Router();
const verifyToken=require('../middleWare/Authentication')
module.exports=categoriesRouter;


categoriesRouter.get('/category',getAllCategories);
categoriesRouter.get('/category/:id',getCategoryById);
categoriesRouter.post('/category',addNewCategory);
categoriesRouter.put('/category/:id',UpdateCategoryById);
categoriesRouter.delete('/category/:id',deleteCategoryById);
  




