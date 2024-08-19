const input = document.querySelector("input");
const taskList = document.querySelector(".task-list");
const form = document.querySelector("form");
let tasks = [];

window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    updateTaskList();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    tasks.push({ text: task, completed: false });
    input.value = "";
    updateTaskList();
    saveTasks();
  }
});

function updateTaskList() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.style.cursor = "pointer";

    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "gray";
    }

    taskText.addEventListener("click", () => {
      task.completed = !task.completed;
      updateTaskList();
      saveTasks();
    });

    li.appendChild(taskText);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      updateTaskList();
      saveTasks();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });

  updateProgressBar();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress");
  const numbers = document.getElementById("numbers");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;

  progressBar.style.width = `${progressPercentage}%`;
  numbers.textContent = `${completedTasks} / ${totalTasks}`;
}
