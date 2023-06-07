const newExpense = async () => {
      document.location.replace('/new');
}
  document.querySelector('#expenseBtn').addEventListener('click', newExpense);