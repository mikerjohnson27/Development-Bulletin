const router = require('express').Router();
const { Project, Task, User_tasks } = require('../models');
const withAuth = require('../utils/auth');

router.get('/project:id', withAuth, async (req, res) => {
    try {
      const projectData = await Project.findAll({
        attributes: {  },
        order: [['', '']],
      });
  
      const projects = projectData.map((project) => project.get({ plain: true }));
  
      res.render('homepage', {
        projects,
        logged_in: req.session.logged_in,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  });

