document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    addTaskBtn.addEventListener("click", function() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
        saveTasks();
      }
    });
  
    function addTask(taskText) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <span>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
          <input type="checkbox" class="completed-checkbox">
        </span>
      `;
      taskList.appendChild(li);
  
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
      });
  
      const editBtn = li.querySelector(".edit-btn");
      editBtn.addEventListener("click", function() {
        const newText = prompt("Edit the task", taskText);
        if (newText !== null && newText.trim() !== "") {
          taskText = newText.trim();
          li.querySelector(".task-text").textContent = taskText;
          saveTasks();
        }
      });
  
      const completedCheckbox = li.querySelector(".completed-checkbox");
      completedCheckbox.addEventListener("change", function() {
        li.classList.toggle("completed", completedCheckbox.checked);
        saveTasks();
      });
    }
  
    function saveTasks() {
      const tasks = [];
      const taskElements = taskList.querySelectorAll("li");
      taskElements.forEach(task => {
        const taskText = task.querySelector(".task-text").textContent;
        const isCompleted = task.querySelector(".completed-checkbox").checked;
        tasks.push({ text: taskText, completed: isCompleted });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => {
        addTask(task.text);
        const li = taskList.lastElementChild;
        li.querySelector(".completed-checkbox").checked = task.completed;
        li.classList.toggle("completed", task.completed);
      });
    }
  
    loadTasks();
  });
  