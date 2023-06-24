// Function to retrieve tasks from localStorage
function retrieveTasks() {
  var tasks = localStorage.getItem('tasks');
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task to the list
function addTask() {
  var input = document.getElementById('taskInput');
  var task = input.value;
  if (task === '') {
    alert('Please enter a task.');
    return;
  }

  var tasks = retrieveTasks();

  // Create a new task object
  var newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };

  // Add the task to the tasks array
  tasks.push(newTask);

  // Save the updated tasks to localStorage
  saveTasks(tasks);

  // Display the tasks
  displayTasks();

  input.value = '';
}

// Function to delete a task from the list
function deleteTask(taskId) {
  var tasks = retrieveTasks();

  // Find the task with the specified ID
  var taskIndex = tasks.findIndex(function(task) {
    return task.id === taskId;
  });

  if (taskIndex !== -1) {
    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    // Save the updated tasks to localStorage
    saveTasks(tasks);

    // Display the tasks
    displayTasks();
  }
}

// Function to toggle the completion status of a task
function toggleTaskCompletion(taskId) {
  var tasks = retrieveTasks();

  // Find the task with the specified ID
  var task = tasks.find(function(task) {
    return task.id === taskId;
  });

  if (task) {
    // Toggle the completed property of the task
    task.completed = !task.completed;

    // Save the updated tasks to localStorage
    saveTasks(tasks);

    // Display the tasks
    displayTasks();
  }
}

// Function to display the tasks
function displayTasks() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  var tasks = retrieveTasks();

  if (tasks.length === 0) {
    taskList.innerHTML = 'No tasks found.';
  } else {
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];

      var li = document.createElement('li');
      li.textContent = task.task;

      if (task.completed) {
        li.classList.add('completed');
      }

      var deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = 'X';
      deleteBtn.addEventListener('click', function() {
        var taskId = parseInt(this.dataset.taskId);
        deleteTask(taskId);
      });
      deleteBtn.dataset.taskId = task.id;

      var tickBtn = document.createElement('button');
      tickBtn.className = 'tick-btn';
      tickBtn.innerHTML = '&#10004;';
      tickBtn.addEventListener('click', function() {
        var taskId = parseInt(this.dataset.taskId);
        toggleTaskCompletion(taskId);
      });
      tickBtn.dataset.taskId = task.id;

      var buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'buttons-container';
      buttonsContainer.appendChild(tickBtn);
      buttonsContainer.appendChild(deleteBtn);

      li.appendChild(buttonsContainer);
      taskList.appendChild(li);
    }
  }
}

// Display the tasks when the page loads
displayTasks();
