const form = document.querySelector(".todo-form");
const input = document.querySelector("#todoInput");
const taskList = document.querySelector(".task-list");

let todos = [];

window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("todos");
  if (storedTasks) {
    todos = JSON.parse(storedTasks);
    renderTodos();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value.toLowerCase().trim();
  if (inputValue) {
    addTodo(inputValue);
    input.value = "";
    renderTodos();
    saveTodos();
  }
});

function addTodo(task) {
  const todoItem = {
    id: Date.now(),
    text: task,
    completed: false,
    date: new Date().toLocaleDateString(),
  };
  todos.push(todoItem);
}

function renderTodos() {
  taskList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = ` 
    <div class="task-content">
    <p class="task-text" style="cursor: pointer;">${todo.text}</p>
    <span class="task-date">${todo.date}</span>
    </div>
    <div class="task-actions">
    <button class="edit-btn"><i class="far fa-edit"></i></button>
    <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;

    if (todo.completed) {
      li.querySelector(".task-text").style.textDecoration = "line-through";
      li.querySelector(".task-text").style.color = "gray";
    }

    li.querySelector(".task-text").addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
      saveTodos();
    });

    // delete
    li.querySelector(".delete-btn").addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
      saveTodos();
    });

    // edit
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newTask = prompt("Edit your task", todo.text);
      if (newTask !== null) {
        todo.text = newTask.trim() || todo.text;
        renderTodos();
        saveTodos();
      }
    });

    taskList.append(li);
  });

  updateStats();
  updateProgressBar();
}

function updateStats() {
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;
  document.querySelector(
    "#numbers"
  ).textContent = `${completedTasks} / ${totalTasks}`;
}

function updateProgressBar() {
  const progressBar = document.getElementById("progress");
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const totalTasks = todos.length;
  const progressPercentage = totalTasks
    ? (completedTasks / totalTasks) * 100
    : 0;

  progressBar.style.width = `${progressPercentage}%`;
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}







// const input = document.querySelector("input");
// const taskList = document.querySelector(".task-list");
// const form = document.querySelector("form");
// let tasks = [];

// window.addEventListener("load", () => {
//   const storedTasks = localStorage.getItem("tasks");
//   if (storedTasks) {
//     tasks = JSON.parse(storedTasks);
//     updateTaskList();
//   }
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const task = input.value.trim();
//   if (task) {
//     tasks.push({ text: task, completed: false });
//     input.value = "";
//     updateTaskList();
//     saveTasks();
//   }
// });

// function updateTaskList() {
//   taskList.innerHTML = "";

//   tasks.forEach((task, index) => {
//     const li = document.createElement("li");
//     const taskText = document.createElement("span");
//     taskText.textContent = task.text;
//     taskText.style.cursor = "pointer";

//     if (task.completed) {
//       taskText.style.textDecoration = "line-through";
//       taskText.style.color = "gray";
//     }

//     taskText.addEventListener("click", () => {
//       task.completed = !task.completed;
//       updateTaskList();
//       saveTasks();
//     });

//     li.appendChild(taskText);

//     const deleteButton = document.createElement("button");
//     deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
//     deleteButton.addEventListener("click", () => {
//       tasks.splice(index, 1);
//       updateTaskList();
//       saveTasks();
//     });

//     li.appendChild(deleteButton);
//     taskList.appendChild(li);
//   });

//   updateProgressBar();
// }

// function saveTasks() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// function updateProgressBar() {
//   const progressBar = document.getElementById("progress");
//   const numbers = document.getElementById("numbers");
//   const completedTasks = tasks.filter((task) => task.completed).length;
//   const totalTasks = tasks.length;
//   const progressPercentage = totalTasks
//     ? (completedTasks / totalTasks) * 100
//     : 0;

//   progressBar.style.width = `${progressPercentage}%`;
//   numbers.textContent = `${completedTasks} / ${totalTasks}`;
// }
