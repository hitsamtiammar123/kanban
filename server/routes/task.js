const router=require('express').Router();
const controller=require('../controllers/TaskController');
const taskAuthorization=require('../middleware/task-authorization');

router.post('/',controller.create);
router.get('/',controller.fetchById);
router.put('/:id',taskAuthorization,controller.update);
router.delete('/:id',taskAuthorization,controller.delete);

module.exports=router;