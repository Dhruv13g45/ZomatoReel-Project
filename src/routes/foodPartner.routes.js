import { Router } from "express";
import { createFoodVideo, deleteFoodVideo, loginFoodPartner, logoutFoodPartner, registerPartner, viewFoodPartnerProfile } from "../controllers/foodPartner.controller.js";

import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/register-partner",upload.none(),registerPartner)
router.post("/login-partner",upload.none(),loginFoodPartner)
router.post("/logout-partner",verifyJWT,upload.none(),logoutFoodPartner)
router.post("/view-partner-profile",verifyJWT,upload.none(),viewFoodPartnerProfile)
router.post("/create-food-reel",verifyJWT,upload.single("foodVideo"),createFoodVideo)
router.delete("/delete-food-reel",verifyJWT,upload.none(),deleteFoodVideo)



export default router