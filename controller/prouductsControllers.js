const {getAllProductsDB,getProductByIdDB,addNewProductsDB,UpdateProductsByIdDB,deleteProductsByIdDB}=require('../model/dataBase');

let getAllProducts=(req,res)=>{
    let allProducts=getAllProductsDB();
    console.log(allProducts);
    res.status(200).json(allProducts); 
    
}

let getProductById=(req,res)=>{
    let {id}=req.params;
    try
    {
        let selectedProduct=getProductByIdDB(id);
        res.status(200).json(selectedProduct);
    }
    catch(err)
    {
        res.status(400).json(err.message);   
    }
    
}

let addNewProduct=(req,res)=>{
    try
    {
        let newProduct=addNewProductsDB(req.body);
        res.status(200).json(newProduct);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    } 
}

let UpdateProductById=(req,res)=>{
    let {id}=req.params;
    try
    {
        let updatedProduct=UpdateProductsByIdDB(id,req.body);
        res.status(200).json(updatedProduct);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
   
}

let deleteProductById=(req,res)=>{
    let {id}=req.params;
    try
    {
        const product=deleteProductsByIdDB(id);
        res.status(201).json(product);
    }
    catch(err)
    {
        res.status(400).json(err.message);
    }
   
}


module.exports={getAllProducts,getProductById,addNewProduct,UpdateProductById,deleteProductById}