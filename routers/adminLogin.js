const express = require('express');
const router = express.Router();

const auth =(req,res,next)=> {
    if(req.session.admin){
        res.redirect('/admin')
    }else{
        next()
    }
}

router.get('/',auth,(req,res)=> {
    res.render('adminlogin',{error:""})
})
router.post('/',async(req,res)=>{
    console.log("Entere username and password for admin is ", req.body)
    const emailDB = "admin@gmail.com"
    const passwordDB = "123456"
    const { email , password } = req.body
    if(emailDB===email){
        if(passwordDB!==password){
            res.render('adminlogin',{error:"Wrong password"})
        }else{
            req.session.admin =true
            res.redirect('/admin')
        }
    }else{
        res.render('adminlogin',{error:"You are not an admin"})
    }
}) 

module.exports = router