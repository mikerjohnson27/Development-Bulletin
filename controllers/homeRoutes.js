const router = require('express').Router();
const { Project, User, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findAll({});

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    const taskData = await Task.findAll({ 
      where: { project_id: req.params.id },
      include: {
        model:  User, as: "UsersForTasks",
      }
    });

    const project = projectData.get({ plain: true });
    const task = taskData.map((task) => task.get({ plain: true }));

    res.render('project', {
      project,
      task,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dev', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Task, as: 'TasksForUser'
      },
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;