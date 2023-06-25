# Final project

You will implement a backend to support a shopping application, the application will support login, registration, authentication, and authorization

## APIS
### Users
POST /login
```json
{
    "email": "string",
    "password": "string",
}
```
Validation: 
- email must be a valid email
- password: must be 8 characters with at least 1 capital and 1 small and 1 special character

returns:
```json
{
    "email": "string",
    "password": "string",
    "token": "string"
}
```

POST /registration
```json
{
    "email": "string",
    "password": "string",
    "passwordRepeat": "string"
}
```
Validation: 
- email must be a valid email
- password: must be 8 characters with at least 1 capital and 1 small and 1 special character
- passwordRepeat: must equal password

returns
```json
{
    "success": true
}
```

### Categories
- check that the user is logged in
POST /category
```json
{
    "name": "string",
}
```
Validation:
- name: string with at least 3 characters

PUT /category/:id
```json
{
    "name": "string",
}
```
Validation:
- name: string with at least 3 characters

GET /category
returns list of categories
GET /category/:id
return the category with the correct_id
DELETE /category/:id
return the deleted category

### Products
- check that the user is logged in
POST /products
```json
{
    "name": "string",
    "price": "number",
    "category_id": "number"  
}
```
Validation:
- name: string with at least 3 characters
- price: Number 
- category_id: Must be an existing in categories

PUT /products/:id
```json
{
    "name": "string",
    "price": "number",
    "category_id": "number"
}
```
Validation:
- name: string with at least 3 characters
- price: Number 
- category_id: Must be an existing in categories

GET /products
returns list of products
GET /products/:id
return the product with the correct_id
DELETE /products/:id
return the deleted product