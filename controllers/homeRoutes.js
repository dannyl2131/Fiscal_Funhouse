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

// router.get('/', async (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     try {
//       const userData = await User.findByPk(req.session.user_id, {
//         include: [
//           {
//             model: Expense,
//             attributes: ['name', 'cost'],
//           },
//           {
//             model: User, // assuming UserInfo is the model you want to include
//           },
//         ],
//         attributes: { exclude: ['password', 'email'] },
//       });

//       if (!userData) {
//         res.status(400).json({ message: "No user found!" });
//         return;
//       }

//       const user = userData.get({ plain: true });

//       const userExpenses = user.Expense; // Depends on the association alias
//       const userInfo = user.User; // Depends on the association alias

//       // Generating a list of random userInfo (assuming your generateRandomValues function)
//       const sendDataList = []
//       const indexOfUserInfo = generateRandomValues(0, userInfo.length)
//       for (let i = 0; i < indexOfUserInfo.length; i++) {
//           sendDataList.push(userInfo[indexOfUserInfo[i]])
//       }

//       console.log(userExpenses, sendDataList);  // Log the expenses and the list of random user info
      
//       res.render('homepage', { 
//         expenses: userExpenses, 
//         sendDataList, 
//         platforms: false, // change to actually send platforms
//         favorites: false, //change to actually send favorites
//         profile: true,
//         ownPage: false,
//         loggedIn: req.session.loggedIn 
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

router.get('/new', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('expense', { loggedIn: req.session.loggedIn });
});

module.exports = router;