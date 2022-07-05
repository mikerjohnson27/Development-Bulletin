const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const manager = document.queryCommandValue('#manager')
  
    if (name && email && password) {
      const response = await fetch('/api/users/login/create', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, manager }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
