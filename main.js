document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".close");
  const addBtn = document.getElementById("addBtn");
  const emptyMessage = document.getElementById("emptyMessage");
  const taskList = document.getElementById("taskList");
  const filterSelect = document.getElementById("filterSelect");

  let tasks = [];

  addTaskBtn.addEventListener("click", function () {
      modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", function () {
      modal.style.display = "none";
  });

  addBtn.addEventListener("click", function () {
      const taskName = document.getElementById("taskName").value;
      const taskDescription = document.getElementById("taskDescription").value;
      const taskDueDate = document.getElementById("taskDueDate").value;

      if (taskName !== "") {
          const task = {
              name: taskName,
              description: taskDescription,
              dueDate: taskDueDate,
          };

          tasks.push(task);
          displayTasks();
          modal.style.display = "none";
          // Очищаем поля ввода
          document.getElementById("taskName").value = "";
          document.getElementById("taskDescription").value = "";
          document.getElementById("taskDueDate").value = "";
      }
  });

  filterSelect.addEventListener("change", function () {
      displayTasks();
  });

  function displayTasks() {
      taskList.innerHTML = "";
      if (tasks.length === 0) {
          emptyMessage.style.display = "block";
      } else {
          emptyMessage.style.display = "none";
          const filteredTasks = filterTasks(tasks);
          filteredTasks.forEach(function (task, index) {
              const taskItem = document.createElement("div");
              taskItem.classList.add("task-item");
              taskItem.innerHTML = `
                  <h3>${task.name}</h3>
                  <p>${task.description}</p>
                  <p>Дата выполнения: ${task.dueDate}</p>
                  <button class="delete-btn">Удалить</button>
                  <button class="complete-btn" data-index="${index}">Выполнено</button>
              `;
              taskList.appendChild(taskItem);
          });
      }
  }

  function filterTasks(tasks) {
      const filterValue = filterSelect.value;
      let filteredTasks = tasks.slice(); // Копируем массив задач

      switch (filterValue) {
          case "name":
              filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
              break;
          case "date":
              filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
              break;
          default:
              // Сортировка по умолчанию, оставляем массив без изменений
              break;
      }

      return filteredTasks;
  }

  taskList.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-btn")) {
          const taskIndex = Array.from(taskList.children).indexOf(event.target.parentElement);
          tasks.splice(taskIndex, 1);
          displayTasks();
      } else if (event.target.classList.contains("complete-btn")) {
          const taskIndex = event.target.getAttribute("data-index");
          taskList.children[taskIndex].classList.toggle("completed");
      }
  });
});
