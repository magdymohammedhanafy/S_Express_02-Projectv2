const { object, string, number} = require('yup');
const yup = require('yup');
require('yup-password')(yup);
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

//data base arays
let users=[];
let products=[];
let categories=[];
/////////////////////////////////////////////////////////////////////////////////

////Schema
///////////////category Schema
 let categorySchema = object({
  name: string().min(3, 'must be at least 3 characters long').required()                                        
});
////////////product Schema
let productSchema = object({
    name: string().min(3, 'must be at least 3 characters long').required(),
    price: number().required(),  
    category_id: number().required(),                                   
  });
/////////user Schema
const userschema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).minLowercase(1).minUppercase(1).minSymbols(1).required(),
    passwordRepeat: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
})
/////////login Schema
const loginschema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).minLowercase(1).minUppercase(1).minSymbols(1).required(),
})

///////////////////////////////////////////////////////////////////////////////////////////////////

//////categories data base methods
let getAllCategoriesDB=()=>{ 
    return categories
};

let getCategoryByIdDB=(id)=>{
 let filteredCategory=categories.find(category=>category.id==id);
 if(!filteredCategory)
 {
     throw new Error("not valid id");
 }
 return filteredCategory;
}

let addNewCategoryDB=(body)=>{
    let newCategory = categorySchema.validateSync(body,{ strict: true });
    let id = setUniqueId();
    let createdDate=new Date();
    newCategory={"id":id,...newCategory,"creationAt":createdDate,"updatedAt":createdDate};
    categories.push(newCategory);
    return newCategory;
}

let UpdateCategoryByIdDB=(id,body)=>{
    let category = categorySchema.validateSync(body,{ strict: true });
    let udatedDate=new Date();
    let filteredCategoryIndex=categories.findIndex(category=>category.id==id);
    let filteredCategory=categories.find(category=>category.id==id);
    if(!filteredCategory)
    {
        throw new Error("not valid id");
    }
    let updatedcategory={"id":Number(id),
    ...category,
    "creationAt":categories[filteredCategoryIndex].creationAt,
    "updatedAt":udatedDate};
    categories[filteredCategoryIndex]=updatedcategory;
    return  categories[filteredCategoryIndex];
}

let deleteCategoryByIdDB=(id)=>{
    let filteredCategoryIndex=categories.findIndex(category=>category.id==id);
    let filteredCategory=categories.find(category=>category.id==id);
    if(!filteredCategory)
    {
        throw new Error("not valid id");
    }
    categories.splice(filteredCategoryIndex,1);
    return filteredCategory;
}
/////////////////////////////////////////////////////////////

////////////////products data base methods
let getAllProductsDB=()=>{ 
    return products;
};

let getProductByIdDB=(id)=>{
 let filteredProduct=products.find(product=>product.id==id);
 if(!filteredProduct)
 {
     throw new Error("not valid id");
 }
 return filteredProduct;
}

let addNewProductsDB=(body)=>{
    let newProduct = productSchema.validateSync(body,{ strict: true });
    let categoryId=newProduct.category_id;
    let validteCategoryId=checkCategoryId(categoryId);
    if(validteCategoryId==false)
    {
        throw new Error("please enter valid category id");
    }
    let id =setUniqueId();
    let createdDate=new Date();
    newProduct={"id":id,...newProduct,"creationAt":createdDate,"updatedAt":createdDate};
    products.push(newProduct);
    return newProduct;
}

let UpdateProductsByIdDB=(id,body)=>{
    let product = productSchema.validateSync(body,{ strict: true });
    let categoryId=product.category_id;
    let validteCategoryId=checkCategoryId(categoryId);
    if(validteCategoryId==false)
    {
        throw new Error("please enter valid category id");
    }
    let udatedDate=new Date();
    let filteredProductIndex=products.findIndex(product=>product.id==id);
    let filteredProduct=products.find(product=>product.id==id);
    if(!filteredProduct)
    {
        throw new Error("not valid id");
    }
    let updatedProduct={"id":Number(id),
    ...product,
    "creationAt":products[filteredProductIndex].creationAt,
    "updatedAt":udatedDate};
    products[filteredProductIndex]=updatedProduct;
    return  products[filteredProductIndex];
}

let deleteProductsByIdDB=(id)=>{
    let filteredProductIndex=products.findIndex(product=>product.id==id);
    let filteredProduct=products.find(product=>product.id==id);
    if(!filteredProduct)
    {
        throw new Error("not valid id");
    }
    products.splice( filteredProductIndex,1);
    return filteredProduct;
}
//////////////////////////////////////////////////////////////////////////////////
///users data base methods
let addNewUserDB=(body)=>{
    let newUser = userschema.validateSync(body,{ strict: true });
    const hashedPassword = hash(body.password);
    newUser.password=hashedPassword;
    newUser={email:newUser.email,password:hashedPassword};
    users.push(newUser);
    return newUser ;
}

let loginDB=(body)=>{
    let loginValidation = loginschema.validateSync(body,{ strict: true });
    let email=loginValidation.email;
    let password=loginValidation.password;
    let user = users.find((user) => user.email === email);
    const hashedPassword = hash(password);
    console.log(user.password);
    let userIndex = users.findIndex((user) => user.email === email);
    if (!user || user.password !== hashedPassword)
    {
    throw new Error("Un Authenticated")
    }
    const token = jwt.sign(user, process.env.JWT_SECRET);
    user={...user,"token":token};
    users[userIndex]=user;
    return user;
}
///////////////////export section
module.exports={getAllCategoriesDB,getCategoryByIdDB,
addNewCategoryDB,UpdateCategoryByIdDB,deleteCategoryByIdDB
,getAllProductsDB,getProductByIdDB,addNewProductsDB
,UpdateProductsByIdDB,deleteProductsByIdDB,addNewUserDB,loginDB};
////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////// helper functions

//check id of category at product
let checkCategoryId=((id)=>{
    let status=false;
    categories.map((category)=>{
        if(category.id===id)
        {
            status=true;
            return status;
        }
    })
    return status;
})

//make unique id
let setUniqueId=(()=>{
    let id = Math.floor(Math.random()*10000);
    return id;
})

const hash = (password) =>{
  return createHash("sha256").update(password, "utf-8").digest("hex");
}
  






