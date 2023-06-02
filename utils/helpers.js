module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },
};

//Grab numbers from Table

const mysql = require ('mysql');

function combineNumbersFromTable(config, tableName, ColumnName){
  return new Promise((resolve, reject) => {
    const connection =mysql.createConnection(config);
    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      const numbers=results.map((row) => row[columnName]);
      const combinedNumber = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);
      resolve(combinedNumber);
    });
    connection.end();
  })
}

const config = {
  user: 'root',
  password: '',
  database: 'pennywise_db',
};

const tableName = 'expense';
const columnName = 'number_column';

combineNumbersFromTable(config, tableName, columnName)
  .then((combinedNumber) => {
    console.log('Combined number:', combinedNumber);
  });

// Formatting currency.
function formatCurrency(amount) {
  return amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

function calculateTotal(number) {
  return numbers.reduce ((total, num) => total + num, 0)
}

function formatNumber(number) {
  return number.toLocaleString('en-US');
}

function calculateMonthlySavings(income, expenses) {
  return income - expenses;
}