const uploadFormHandler = async (event) => {
    event.preventDefault();
  
    const file = document.querySelector('#file');
    const taskid = document.querySelector('#taskSelect').value.trim();
  
    if (file && taskid) {
      const response = await fetch('/users/project/upload', {
        method: 'POST', 
        body: file,
      });
    }
  };


  document
    .querySelector('#uploadForm')
    .addEventListener('submit', uploadFormHandler);