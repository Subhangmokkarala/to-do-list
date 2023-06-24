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
    } else {
      deleteBtn.innerHTML = 'X';
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
    updateTasksInLocalStorage();
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
      } else {
        deleteBtn.innerHTML = 'X';
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
      updateTasksInLocalStorage();
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
  });

  // Check if there are no tasks
  if (taskList.children.length === 0) {
    displayNoTasksMessage(true);
  } else {
    displayNoTasksMessage(false);
  }
}

function exportTasks() {
  var taskList = document.getElementById('taskList');
  var tasks = taskList.getElementsByTagName('li');

  if (tasks.length === 0) {
    alert('No tasks to export.');
    return;
  }

  var csvContent = 'data:text/csv;charset=utf-8,';
  var rows = [];

  for (var i = 0; i < tasks.length; i++) {
    var taskText = tasks[i].textContent.replace(/,/g, ''); // Remove commas from task text
    rows.push('"' + taskText + '"');
  }

  csvContent += rows.join('\n');

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'tasks.csv');
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function searchTasks() {
  var input = document.getElementById('searchInput');
  var searchTerm = input.value.toLowerCase();
  var tasks = document.querySelectorAll('#taskList li');

  tasks.forEach(function(task) {
    var taskText = task.textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function displayNoTasksMessage(show) {
  var messageContainer = document.getElementById('noTasksMessage');

  if (show) {
    messageContainer.style.display = 'block';
  } else {
    messageContainer.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', function() {
  displayTasksFromLocalStorage();

  var addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', addTask);

  var exportButton = document.getElementById('exportButton');
  exportButton.addEventListener('click', exportTasks);

  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', searchTasks);
});
