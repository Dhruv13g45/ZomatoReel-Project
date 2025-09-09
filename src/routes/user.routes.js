import { Router } from "express";
import { loginUser, logoutUser, registerUser, viewUserProfile } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


router.post("/user-register", upload.none(),registerUser)
router.post("/user-login",upload.none(),loginUser)



// secured routes
router.post("/user-logout",verifyJWT,upload.none(),logoutUser)
router.post("/view-user-profile",verifyJWT,upload.none(),viewUserProfile)


export default router