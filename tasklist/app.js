
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
        listItem.appendChild(document.createTextNode(taskInput.value));

        const deleteItem = document.createElement('a');
        deleteItem.className = 'delete-item secondary-content';
        deleteItem.innerHTML = '<i class="fa fa-remove"></i>';

        listItem.appendChild(deleteItem);

        taskList.appendChild(listItem);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(taskToRemove) {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(function (task, index) {
        if (taskToRemove.textContent === task) {
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

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showStoredTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(function (task) {
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        listItem.appendChild(document.createTextNode(task));

        const deleteItem = document.createElement('a');
        deleteItem.className = 'delete-item secondary-content';
        deleteItem.innerHTML = '<i class="fa fa-remove"></i>';

        listItem.appendChild(deleteItem);

        taskList.appendChild(listItem);
    })
}
