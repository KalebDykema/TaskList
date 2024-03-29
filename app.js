// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(
    function(task){
      // Creat li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add text node and append to li
      li.appendChild(document.createTextNode(task));

      // Create new link element
      const link = document.createElement('a');
      // Add classes
      link.className = 'delete-item secondary-content';
      // Add icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>';

      // Append the link to the li
      li.appendChild(link);
      // Append the li to the ul
      taskList.appendChild(li);
    }
  );
}

// Add Task
function addTask(e){
  if(taskInput.value === '') {
    alert('Add a task');
  } else {
    // Creat li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Add text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    // Add classes
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to the li
    li.appendChild(link);
    // Append the li to the ul
    taskList.appendChild(li);

    // Store task in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(
    function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    }
  );

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e){
  // // Method 1
  // taskList.innerHTML = '';

  // Method 2; Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS`
  clearTasksFromLocalStorage();
} 

// Clear from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else{
        task.style.display = 'none';
      }
    }
  );
}