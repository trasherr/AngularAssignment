import express from 'express';
import jwt from "jsonwebtoken";

const app = express()

const teacherAuth = app.use((req, res, next) => {
    const headers = JSON.parse(JSON.stringify(req.headers))
    try{
        let jtwToken = jwt.verify(headers.authentication,process.env.ACCESS_TOKEN)
        req.body.identity = jtwToken.id;
        next()
    }
    catch(e){
        res.status(419)
        res.send({message: "Authentication Failed"})
    }

})

export default teacherAuth;
