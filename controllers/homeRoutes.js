const router = require('express').Router();
const { User, Expense } = require('../models');
const withAuth = require('../utils/auth');
const {expenseTotal, remaining} = require('chart.js')
const fs = require('fs')
const handlebars = require('handlebars')

// Login page route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  const { username } = req.body;

  res.render('login');
});

// Homepage route
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
      const incomeData = await User.findByPk(req.session.user_id, {
        attributes: ['income']
      })
      const income = incomeData.get({plain: true})
      if(expenseData) {
      const expenses = expenseData.get({ plain: true });
      const expenseTotal = function(expenses){
        let total = 0
        let arr = []
        for(let i=0; i < expenses.length; i++){
        total += expenses[i].cost
        }
        return total;
      }
      const remaining = function(income){
        return income - expenseTotal(expenses.expenses)
      }
      const chartData = {
        labels: ['Income', 'Expenses', 'Remaining'],
        datasets: [{
          data: [income.income, expenseTotal(expenses.expenses), remaining(income.income)],
          color: '#fff'
        }]
      };
      const template = fs.readFileSync('./views/partials/chart.handlebars', 'utf8');
      const compiledTemplate = handlebars.compile(template);
      const renderedTemplate = compiledTemplate({ chartData });

      // res.send(renderedTemplate);
      res.render('homepage', { expenses, income, renderedTemplate, chartData, loggedIn: req.session.loggedIn });
      } else {
        res.render('homepage', { loggedIn: req.session.loggedIn });
      }

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});


// New expense page route
router.get('/new', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('expense', { loggedIn: req.session.loggedIn });
});

module.exports = router;