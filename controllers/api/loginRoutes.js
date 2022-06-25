const router =require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try{
        const userCreate = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userCreate);
        });
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/login', async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                username: req.body.username,
            },
        })

        if (!userLogin) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const passwordLogin = await userLogin.checkPassword(req.body.password);

        if (!passwordLogin) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ user: userLogin, message: 'Welcome back to Development Bulletin!' })
        })
    } catch (e) {
        res.status(404).end();
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