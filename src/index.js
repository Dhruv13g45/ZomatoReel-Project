import dotenv from "dotenv"
import connectDB from "./db/db.js"
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



try {
    connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 5000, (req, res)=>{
            console.log("SERVER has been started and is listening !!")
        })
    })
} catch (error) {
    console.log("Error while connecting to the database !!")
}
