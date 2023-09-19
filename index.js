
function Task(taskName, dueDate, priority) {
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;

    this.getTaskDetail = function () {
        return `${this.taskName} (Due: ${this.dueDate}, Priority: ${this.priority}, Completed: ${this.completed})`;
    };

    this.toggleCompletion = function () {
        this.completed = !this.completed;
    };
}

let taskList = [];

function addTask(taskName, dueDate, priority) {
    const task = new Task(taskName, dueDate, priority);
    taskList.push(task);
}

function deleteLastTask() {
    taskList.pop();
}

function addTaskToFront(taskName, dueDate, priority) {
    const task = new Task(taskName, dueDate, priority);
    taskList.unshift(task);
}

function deleteFirstTask() {
    taskList.shift();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

async function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
    }
}

function renderTasks() {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = '';

    for (const task of taskList) {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = task.getTaskDetail();

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteTaskUI(task.taskName));

        taskDiv.appendChild(deleteButton);
        taskListDiv.appendChild(taskDiv);
    }
}

function addTaskUI() {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    if (taskName && dueDate && priority) {
        addTask(taskName, dueDate, priority);
        saveTasks(); 
        renderTasks();
    }
}

function deleteTaskUI(taskName) {
    taskList = taskList.filter(task => task.taskName !== taskName);
    saveTasks();
    renderTasks();
}

loadTasks().then(() => {
    renderTasks();
});
