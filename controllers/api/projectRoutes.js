const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newProject = await Project.create({
        ...req.body,
      user_id: req.session.user_id,
      });
      
      res.status(200).json(newProject);
    } catch (e) {
      res.status(500).json(e);
    }
  });

router.post('/upload', function(req, res) {
   if (!req.files) {
    res.status(404).json( { message: "please add upload!" } );
   } else {
    res.status(200).json( { message: "File uploaded!" } );
   }

});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const projectData = await Project.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No Project found with this ID!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;

