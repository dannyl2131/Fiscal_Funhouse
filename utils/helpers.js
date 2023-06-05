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