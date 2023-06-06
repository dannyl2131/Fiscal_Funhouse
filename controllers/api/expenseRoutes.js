const router = require('express').Router();
const { User, Expense } = require('../../models');

router.post('/', async (req, res) => {
  try {
      const newExpense = await Expense.create({
      name: req.body.name,
      cost: req.body.cost,
      user_id: req.session.user_id,
    });

    

    // console.log(newExpense);

    res.status(200).json(newExpense);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;