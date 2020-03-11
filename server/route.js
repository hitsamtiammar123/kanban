const router=require('express').Router();
const auth=require('./routes/auth');
const task=require('./routes/task');
const authenticate=require('./middleware/authenticate');

router.use('/',auth);
router.use('/task',authenticate,task);

module.exports=router;