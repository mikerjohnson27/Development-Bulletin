const router = require('express').Router();
const { Project, Task } = require('../../models');
const withAuth = require('../../utils/auth');
const fileUpload = require('express-fileupload');
const path = require('path');
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
    let file = req.files.file;
    let taskid = req.body.taskSelect;
    let uploadPath = path.join(process.env.TEMP_DIR, file.name);

     if (!req.files) {
      res.status(404).json( { message: "please add upload!" } );
     }

     file.mv(uploadPath, function(err) {
      if(err){
        return res.status(500).send(err);
      }

      Task.update(
        {
          file_path: uploadPath,
        },
        {
          where: {id: taskid},
        }
      )

      res.redirect('back');
     })
  }catch (err) {
    res.json(err);
  }
});
router.get('/load-file', withAuth, async (req, res) => {
  try{
    const filePath = req.query.filePath;

    res.sendFile(filePath);
  } catch (e) {
    res.status(500).end();
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

