const router=require('express').Router();
const controller=require('../controllers/AuthController');
const authenticate=require('../middleware/authenticate');

router.post('/login',controller.login);
router.post('/register',controller.register);
router.post('/login/google',controller.loginWithGoogle);
router.put('/user',authenticate,controller.editProfile);

module.exports=router;