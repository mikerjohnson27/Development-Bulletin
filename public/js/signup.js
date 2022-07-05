const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const manager = document.querySelector('#manager').checked;
  
    if (username && email && password) {
      const response = await fetch('/users/login/create', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, manager}),
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
  .querySelector('.login-form')
  .addEventListener('submit', signupFormHandler);
