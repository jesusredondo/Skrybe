const router = require('express').Router();
const {validarUsuarioSignin,
    validarUsuarioLogin} = require('../validations/userValidations');


router.post('/signin',async(req,res)=>{
    res.send('Success');
});


module.exports = router;