const chart = require('chart')
const sequelize = require('../../config/connection');
const {User, Expense} = require('../../models/')
const config = {
  type: 'pie',
  data: data,
};

const data = {
  labels: [
    'Income',
    'Expenses',
    'Remaining'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const findIncome = async function(){
  let income = await User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'income'
    ],
    raw: true
  })
  return income
}

const findExpenses = async function(){
  let expense = await Expense.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'cost'
    ],
    raw: true
  })
  return expense
}
const findRemaining = async function(){
  return findIncome() - findExpenses()
}