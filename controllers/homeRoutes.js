const router = require('express').Router();
const { User, Expense } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  const { username } = req.body;

  res.render('login');
});

router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    try {
      // const expenseData = await Expense.findAll({
      //   where: {
      //     user_id: req.session.user_id,
      //   },
      //   attributes: [
      //     'name',
      //     'cost',
      //   ],
      // });
      // const expenses = expenseData.get({ plain: true });
      res.render('homepage', { loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});



module.exports = router;
