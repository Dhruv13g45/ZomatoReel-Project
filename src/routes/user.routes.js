import { Router } from "express";
import { loginUser, logoutUser, registerUser, viewUserProfile } from "../controllers/user.controller";

const router = Router()


router.post("/user-register",registerUser)
router.post("/user-login",loginUser)
router.post("/user-logout",logoutUser)
router.post("/view-user-profile",viewUserProfile)


export default router