const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/products.controller");
const sliderController = require("../controllers/sliders.controller");
const relatedProductController = require("../controllers/related-product.controller");
const {authenticateToken} = require("../middleware/auth");
const orderController = require("../controllers/order.controller"); 
const cartController = require("../controllers/cart.controller");
const userController = require("../controllers/users.controller");
const express = require("express");

const router = express.Router();
router.post("/category", [authenticateToken], categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/categories", [authenticateToken], categoryController.findcategory);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", [authenticateToken], categoryController.delete);


router.post("/slider", sliderController.create);
router.get("/slider", sliderController.findAll);
router.get("/slider/:id", sliderController.findOne);
router.put("/slider/:id", sliderController.update);
router.delete("/slider/:id", sliderController.delete);

router.post("/product", productController.create);
router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);


router.post("/relatedProduct", relatedProductController.create);
router.delete("/relatedProduct/:id", relatedProductController.delete);

router.post("/cart", [authenticateToken], cartController.create);
router.get("/cart", [authenticateToken], cartController.findAll);
router.delete("/cart", [authenticateToken], cartController.delete);

//router.post("/cart", cartController.create);
//router.get("/cart", cartController.findAll);
//router.delete("/cart",  cartController.delete);


router.post("/order", [authenticateToken], orderController.order_create);
router.get("/order", [authenticateToken], orderController.get_orders);
router.get("/order/find/:userId", [authenticateToken], orderController.find_order);
router.get("/order/:id", [authenticateToken], orderController.delete_order);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
