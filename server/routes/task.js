const router=require('express').Router();
const controller=require('../controllers/TaskController');

router.post('/',controller.create);
router.get('/',controller.fetchById);
router.put('/:id',controller.update);
router.delete('/:id',controller.delete);

module.exports=router;