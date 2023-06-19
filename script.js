function addTask() {
    var input = document.getElementById('taskInput');
    var task = input.value;
    if (task === '') {
      alert('Please enter a task.');
      return;
    }
  
    var taskList = document.getElementById('taskList');
    var li = document.createElement('li');
    li.textContent = task;
  
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      taskList.removeChild(li);
    });
  
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  
    input.value = '';
  }
  