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
  deleteBtn.innerHTML = 'X';
  deleteBtn.addEventListener('click', function() {
    li.classList.toggle('deleted');
    if (li.classList.contains('deleted')) {
      deleteBtn.innerHTML = '♻️';
    } else {
      deleteBtn.innerHTML = 'X';
    }
  });

  var tickBtn = document.createElement('button');
  tickBtn.className = 'tick-btn';
  tickBtn.innerHTML = '&#10004;';
  tickBtn.addEventListener('click', function() {
    if (li.classList.contains('deleted')) {
      // Permanent delete
      li.remove();
    } else {
      // Toggle completion
      li.classList.toggle('completed');
    }
  });

  var restoreBtn = document.createElement('button');
  restoreBtn.className = 'restore-btn';
  restoreBtn.innerHTML = '♻️';
  restoreBtn.addEventListener('click', function() {
    li.classList.remove('deleted');
    deleteBtn.innerHTML = 'X';
  });

  var buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.appendChild(tickBtn);
  buttonsContainer.appendChild(deleteBtn);

  if (li.classList.contains('deleted')) {
    buttonsContainer.appendChild(restoreBtn);
  }

  li.appendChild(buttonsContainer);
  taskList.appendChild(li);

  input.value = '';
}
