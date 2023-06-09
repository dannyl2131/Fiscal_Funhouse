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
      
      if(expenseData) {
      const expenses = expenseData.get({ plain: true });
      console.log(expenses.expenses[0].name);
      res.render('homepage', { expenses, loggedIn: req.session.loggedIn });
      } else {
        res.render('homepage', { loggedIn: req.session.loggedIn });
      }

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// const chart = require('chart')
// const sequelize = require('../../config/connection');
// const {User, Expense} = require('../../models/')
// const config = {
//   type: 'pie',
//   data: data,
// };

// const data = {
//   labels: [
//     'Income',
//     'Expenses',
//     'Remaining'
//   ],
//   datasets: [{
//     label: 'My First Dataset',
//     data: [300, 50, 100],
//     backgroundColor: [
//       'rgb(255, 99, 132)',
//       'rgb(54, 162, 235)',
//       'rgb(255, 205, 86)'
//     ],
//     hoverOffset: 4
//   }]
// };

// const findIncome = async function(){
//   let income = await User.findOne({
//     where: {
//       id: req.session.user_id
//     },
//     attributes: [
//       'income'
//     ],
//     raw: true
//   })
//   return income
// }

// const findExpenses = async function(){
//   let expense = await Expense.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     attributes: [
//       'cost'
//     ],
//     raw: true
//   })
//   return expense
// }
// const findRemaining = async function(){
//   return findIncome() - findExpenses()
// }

router.get('/new', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('expense', { loggedIn: req.session.loggedIn });
});

module.exports = router;