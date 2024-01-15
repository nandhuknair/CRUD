const express = require('express');
const router = express.Router()
const homeSchema = require('../models/homeSchema')

const auth =(req,res,next)=> {
    if(req.session.user){
        res.redirect('/home')
    }else{
        next()
    }
}
router.get('/',auth,(req,res)=> {
    res.render('login',{error : ""})
})
router.post('/',async(req,res)=> {
    console.log('Entered login email and password is : ',req.body)
    try {
        const {loggedemail , loggedpassword} = req.body
        const userExist = await homeSchema.findOne({email:loggedemail})
        console.log("User exist is : ",userExist)
        if(userExist){
            if(userExist.password === loggedpassword){
                req.session.user = true
                // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
                res.redirect('/home')
            }else{
                res.render('login',{error:"Wrong password"})
            }
            
        }else{
            res.render('login',{error:"Entered email is wrong"})
        }
        
    } catch (error) {
        console.error("Error while login to the homepage",error)
        res.render('login',{error:"Error while login"})
    }
})


module.exports = router
    





    