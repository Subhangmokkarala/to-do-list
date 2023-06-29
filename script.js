function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const modeToggle = document.querySelector('.mode-toggle');
  modeToggle.textContent = body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  var storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

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
      tickBtn.classList.add('deleted');
    } else {
      deleteBtn.innerHTML = 'X';
      tickBtn.classList.remove('deleted');
    }
    updateTasksInLocalStorage();
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
    updateTasksInLocalStorage();
  });

  var restoreBtn = document.createElement('button');
  restoreBtn.className = 'restore-btn';
  restoreBtn.innerHTML = '♻️';
  restoreBtn.addEventListener('click', function() {
    li.classList.remove('deleted');
    deleteBtn.innerHTML = 'X';
    tickBtn.classList.remove('deleted');
    updateTasksInLocalStorage();
  });

  var buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';
  buttonsContainer.appendChild(tickBtn);
  buttonsContainer.appendChild(deleteBtn);

  if (li.classList.contains('deleted')) {
    buttonsContainer.appendChild(restoreBtn);
    tickBtn.classList.add('deleted');
  }

  li.appendChild(buttonsContainer);
  taskList.appendChild(li);

  // Retrieve tasks from local storage
  var tasks = getTasksFromLocalStorage();
  tasks.push(task);

  // Save updated tasks to local storage
  saveTasksToLocalStorage(tasks);

  input.value = '';

  // Check if there are no tasks
  if (taskList.children.length === 0) {
    displayNoTasksMessage(true);
  } else {
    displayNoTasksMessage(false);
  }
}

function updateTasksInLocalStorage() {
  var tasks = [];
  var taskList = document.getElementById('taskList');
  var tasksElements = taskList.getElementsByTagName('li');

  for (var i = 0; i < tasksElements.length; i++) {
    var taskText = tasksElements[i].textContent;
    tasks.push(taskText);
  }

  saveTasksToLocalStorage(tasks);
}

function displayTasksFromLocalStorage() {
  var tasks = getTasksFromLocalStorage();
  var taskList = document.getElementById('taskList');

  tasks.forEach(function(task) {
    var li = document.createElement('li');
    li.textContent = task;

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'X';
    deleteBtn.addEventListener('click', function() {
      li.classList.toggle('deleted');
      if (li.classList.contains('deleted')) {
        deleteBtn.innerHTML = '♻️';
        tickBtn.classList.add('deleted');
      } else {
        deleteBtn.innerHTML = 'X';
        tickBtn.classList.remove('deleted');
      }
      updateTasksInLocalStorage();
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
      updateTasksInLocalStorage();
    });

    var restoreBtn = document.createElement('button');
    restoreBtn.className = 'restore-btn';
    restoreBtn.innerHTML = '♻️';
    restoreBtn.addEventListener('click', function() {
      li.classList.remove('deleted');
      deleteBtn.innerHTML = 'X';
      tickBtn.classList.remove('deleted');
      updateTasksInLocalStorage();
    });

    var buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    buttonsContainer.appendChild(tickBtn);
    buttonsContainer.appendChild(deleteBtn);

    if (li.classList.contains('deleted')) {
      buttonsContainer.appendChild(restoreBtn);
      tickBtn.classList.add('deleted');
    }

    li.appendChild(buttonsContainer);
    taskList.appendChild(li);
  });

  // Check if there are no tasks
  if (taskList.children.length === 0) {
    displayNoTasksMessage(true);
  } else {
    displayNoTasksMessage(false);
  }
}

function displayNoTasksMessage(show) {
  var noTasksMessage = document.getElementById('noTasksMessage');
  if (show) {
    noTasksMessage.classList.remove('hidden');
  } else {
    noTasksMessage.classList.add('hidden');
  }
}

function searchTasks() {
  var searchInput = document.getElementById('searchInput');
  var filter = searchInput.value.toUpperCase();
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var taskText = task.textContent || task.innerText;
    if (taskText.toUpperCase().indexOf(filter) > -1) {
      task.style.display = '';
    } else {
      task.style.display = 'none';
    }
  }
}

function exportTasks() {
  var tasks = [];
  var taskList = document.getElementById('taskList');
  var tasksElements = taskList.getElementsByTagName('li');

  for (var i = 0; i < tasksElements.length; i++) {
    var taskText = tasksElements[i].textContent;
    tasks.push(taskText);
  }

  var tasksString = tasks.join('\n');

  var downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(tasksString);
  downloadLink.download = 'tasks.txt';
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Check if there are no tasks initially
displayNoTasksMessage(true);

// Display tasks from local storage
displayTasksFromLocalStorage();
