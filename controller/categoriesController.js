const {getAllCategoriesDB,
       getCategoryByIdDB,
       addNewCategoryDB,
       UpdateCategoryByIdDB,
       deleteCategoryByIdDB}=require('../model/dataBase');
const { object, string, number,array } = require('yup');

 let categorySchema = object({
    name: string().min(3, 'must be at least 3 characters long').required()                                        
});

let getAllCategories=(req,res)=>{
    let allCateg=getAllCategoriesDB();
    console.log(allCateg);
    res.send(allCateg);   
}

let getCategoryById=(req,res)=>{
    let {id}=req.params;
    try
    {
        let selectedCateg=getCategoryByIdDB(id);
        res.status(200).json(selectedCateg);
    }
    catch(err)
    {
        res.status(400).json(err.message);   
    }
   
}

let addNewCategory=(req,res)=>{
    try{
        let newCateg=addNewCategoryDB(req.body);
        res.status(200).json(newCateg);  
    }
    catch(err)
    {
        res.status(400).json(err.message);   
    }
    
 
}

let UpdateCategoryById=(req,res)=>{
    let {id}=req.params;
    try
    {
    let updatedCateg=UpdateCategoryByIdDB(id,req.body);
    res.status(200).json(updatedCateg);
    }
    catch(err)
    {
        res.status(400).json(err.message);   
    }
    
    
    
}

let deleteCategoryById=(req,res)=>{
    let {id}=req.params;
    try
    {
        const category=deleteCategoryByIdDB(id);
        res.status(201).json(category);    
    }
    catch(err)
    {
        res.status(400).json(err.message);   
    }
     
}



module.exports={getAllCategories,getCategoryById,addNewCategory,UpdateCategoryById,deleteCategoryById}