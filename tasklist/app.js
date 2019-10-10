
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', showStoredTasks);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please enter a task first.')
    } else {
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        const taskId = getLastId() + 1;
        listItem.id = 'task-' + taskId;
        listItem.appendChild(document.createTextNode(taskInput.value));

        const deleteBtn = document.createElement('a');
        deleteBtn.className = 'delete-item secondary-content';
        deleteBtn.innerHTML = '<i class="fa fa-remove"></i>';

        listItem.appendChild(deleteBtn);

        taskList.appendChild(listItem);

        storeTaskInLocalStorage(taskInput.value, taskId);

        taskInput.value = '';
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task, taskId) {
    let tasks = getTasksFromLocalStorage();

    const taskObject = {
        id: taskId,
        text: task,
        completed: false,
    }

    tasks.push(taskObject);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getLastId() {
    let tasks = getTasksFromLocalStorage();
    if (!tasks.length) { return 0 };
    return Math.max.apply(Math, tasks.map(function (task) { return task.id; }))
}

// Task changed to object and assigned an ID
// this way if two tasks have the same text, only the selected task will be deleted.
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(Number(e.target.parentElement.parentElement.id.substring(5,)))
        }
    }
}

function removeTaskFromLocalStorage(taskId) {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(function (task, index) {
        if (task.id === taskId) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const filterText = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(filterText) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function getTasksFromLocalStorage() {
    return (localStorage.getItem('tasks') === null) ? [] : tasks = JSON.parse(localStorage.getItem('tasks'));
}

function showStoredTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(function (task) {
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        listItem.id = 'task-' + task.id;
        listItem.appendChild(document.createTextNode(task.text));

        const deleteItem = document.createElement('a');
        deleteItem.className = 'delete-item secondary-content';
        deleteItem.innerHTML = '<i class="fa fa-remove"></i>';

        listItem.appendChild(deleteItem);

        taskList.appendChild(listItem);
    })
}
