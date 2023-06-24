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

  // Store the task in local storage
  var storedTasks = localStorage.getItem('tasks');
  var tasks = storedTasks ? JSON.parse(storedTasks) : [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  input.value = '';

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

function displayNoTasksMessage(show) {
  var messageContainer = document.getElementById('noTasksMessage');

  if (show) {
    messageContainer.style.display = 'block';
  } else {
    messageContainer.style.display = 'none';
  }
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
    rows.push(['"' + taskText + '"']);
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


window.addEventListener('DOMContentLoaded', function() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    var tasks = JSON.parse(storedTasks);
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
    });

    displayNoTasksMessage(false);
  }
});
