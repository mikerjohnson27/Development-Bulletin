const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

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
  try{ 
    let file = req.files.sampleFile;
     let uploadPath = __dirname + '../../../storage/' + file.name;

     if (!req.files) {
      res.status(404).json( { message: "please add upload!" } );
     }

     file.mv(uploadPath, function(err) {
      if(err){
        return res.status(500).send(err);
      }
      res.redirect('back');
     })
  }catch (err) {
    res.json(err);
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

