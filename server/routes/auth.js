const router = require('express').Router();


router.post('/signin',async(req,res)=>{
    res.send('Petición recogida correctamente');
});


module.exports = router;