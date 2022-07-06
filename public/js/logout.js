const logout = async () => {
    const response = await fetch('/users/login/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/login');
    } else {
      const resjson = await response.json()
      console.log(resjson)
      alert(resjson.message);
    }
  };
document.querySelector('#logout').addEventListener('click', logout)