const router =require('express').Router();
const { User } = require('../../models');

router.get('/signup', async (req, res) =>{
    try{
        res.render('signup');
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/create', async (req, res) => {
    try{
        const userCreate = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            is_manager: req.body.manager,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            req.body.manager ? req.session.isManager = true : req.session.isManager = false;
            res.status(200).json(userCreate);
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                email: req.body.email,
            },
        })

        if (!userLogin) {
            res.status(404).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const passwordLogin = userLogin.checkPassword(req.body.password);
        const user = userLogin.get({ plain: true });
        const manager = user.is_manager;

        if (!passwordLogin) {
            res.status(404).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            manager ? req.session.isManager = true : req.session.isManager = false;

            res.status(200).json({ user: userLogin, message: 'Welcome back to Development Bulletin!' })
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(200).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;