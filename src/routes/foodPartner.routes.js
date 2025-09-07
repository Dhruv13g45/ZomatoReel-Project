import { Router } from "express";
import { createFoodVideo, deleteFoodVideo, loginFoodPartner, logoutFoodPartner, registerPartner } from "../controllers/foodPartner.controller";

const router = Router()

router.post("/register-partner",registerPartner)
router.post("/login-partner",loginFoodPartner)
router.post("/logout-partner",logoutFoodPartner)
router.get("/view-partner-profile",viewFoodPartnerProfile)
router.post("/create-food-reel",createFoodVideo)
router.delete("/delete-food-reel",deleteFoodVideo)



export default router