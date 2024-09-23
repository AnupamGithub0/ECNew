import express from 'express'
import { test } from '../controllers/test.js'
import { signin, signup } from '../controllers/userAuthenticate/user.js'
import { isAdmin, jwtVerify } from '../middlewares/jwtVerify.js'
import { getAdmin } from '../controllers/admin/getAdmin.js'
import { createProduct } from '../controllers/admin/createProduct.js'
import {getProducts } from '../controllers/product/getProduct.js'
import { singleProduct } from '../controllers/product/getSingleProduct.js'
import { productByCategory } from '../controllers/product/productByCategory.js'
import { getAllProductByCategory } from '../controllers/product/getAllproductsCategory.js'
import { productStats } from '../controllers/productStats.js'
import { searchProduct } from '../controllers/searchProducts.js'
import { payment } from '../controllers/payment/cashfee.js'
import { verify } from '../controllers/payment/verify.js'
import { paymentOwner } from '../controllers/payment/payment.js'
import {getOrdersByOwner } from '../controllers/getOrders.js'
import { ProductStatus } from '../controllers/admin/ProductStatus.js'
import { updateProductStatus } from '../controllers/admin/updateProductStatus.js'
import { google } from '../controllers/google.js'
import { recommendedProduct } from '../controllers/product/recommended.js'

const route = express.Router()

route.get("/test",test)
route.post("/signup",signup)
route.post("/signin",signin)


//product-create-admin
route.post("/signin",signin)
route.post("/create-product",isAdmin,jwtVerify,createProduct)
route.get("/products",getProducts)
route.get("/get-product/:productId",singleProduct)


//by category
route.get("/category",productByCategory)
route.get("/all-products/:category",getAllProductByCategory)

//product stats 
route.post("/update-product-status",productStats)
route.get("/search",searchProduct)

//cashfee test
route.post("/payment",payment)
route.post("/verify",verify)
route.post("/save-payment",jwtVerify,paymentOwner)

route.get("/get-orders/:id",jwtVerify,getOrdersByOwner)

//get admin
route.get("/admin",isAdmin,jwtVerify,getAdmin)

//product-status
route.post("/product-status",jwtVerify,ProductStatus)
route.post("/updateStatus",isAdmin,jwtVerify,updateProductStatus)

//google auth
route.post("/google",google)

//recommended products
route.post("/recommended",recommendedProduct)




export default route
