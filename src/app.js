import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({embedded:true, limit:"20kb"}))
app.use(cookieParser())


import userRoutes from "./routes/user.routes.js"
import foodPartnerRoutes from "./routes/foodPartner.routes.js"

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/food-partner", foodPartnerRoutes)


export {app}