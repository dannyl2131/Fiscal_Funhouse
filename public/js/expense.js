const expenseFormHandler = async (event) => {
    event.preventDefault();
    console.log("expense route hit");
    const name = document.querySelector('#expense-name').value.trim();
    const cost = document.querySelector('#expense-amount').value.trim();
    
    if (name && cost) {
      const response = await fetch('/api/expense/', {
        method: 'POST',
        body: JSON.stringify({ name, cost }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to make expense.');
      }
    }
  };

  document
  .querySelector('.expense-form')
  .addEventListener('submit', expenseFormHandler);

  