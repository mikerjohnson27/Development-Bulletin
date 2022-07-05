const router =require('express').Router();
const { Task, User_tasks, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newTask = await Task.create({
        ...req.body,
      user_id: req.session.isManager,
      });
      
      res.status(200).json(newTask);
    } catch (e) {
      res.status(500).json(e);
    }
  });

  router.post('/', withAuth, async (req, res) => {
    try {
        const userAssign = await User.findOne({
            where: {
                username: req.body.username,
            },
        }) 

        if (!userAssign) {
            res.status(404).json({ message: 'Incorrect Username. Please try again!' });
            return;
        } 

        const taskAssign = await Task.findOne({
            where: {
                task_name: req.body.task_name,
            },
        }) 

        if (!taskAssign) {
            res.status(404).json({ message: 'Incorrect Task. Please try again!' });
            return;
        }

        const newAssign = await User_tasks.create({
            user_id: userAssign.id,
            task_id: taskAssign.id
        })

        res.status(200).json(newAssign);
      } catch (err) {
        res.status(500).json(err);
      }
    });

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const taskData = await Task.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.isManager,
        },
      });
  
      if (!taskData) {
        res.status(404).json({ message: 'No Task found with this ID!' });
        return;
      }
  
      res.status(200).json(taskData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
