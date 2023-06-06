const router = require('express').Router();
const { User, Expense } = require('../models');
const withAuth = require('../utils/auth');

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
      const expenseData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Expense,
            attributes: [
              'name',
              'cost',
            ],
          },
        ],
      });
  
      const expenses = expenseData.get({ plain: true });
      console.log(expenses.expenses[0].name);
      res.render('homepage', { expenses, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});



module.exports = router;
