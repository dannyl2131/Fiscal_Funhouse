const handlebars = require('handlebars')

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

function getUserInfo() {
  const storedUser = JSON.parse(localStorage.getItem('userInfo'));
  return storedUser;
}

handlebars.registerHelper('chart', function (data) {
  const chartData = JSON.stringify(data);

  // Generate the chart HTML
  return new handlebars.SafeString(`
    <canvas id="expenseChart" width="400" height="400"></canvas>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var ctx = document.getElementById('expenseChart').getContext('2d');
        var chartData = ${chartData};
        
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: {}
        });
      });
    Chart.defaults.color = "#fff";
    </script>
  `);
});