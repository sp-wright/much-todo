// VALUES

const todoInput = document.querySelector("#todo-text");
const todoBtn = document.querySelector("#todo-submit");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".slider");

// Event Listeners

todoBtn.addEventListener("click", function () {
  if (todoInput.value === "") {
    todoInput.placeholder = "You have to add something!";
  } else {
    addTodo();
    todoInput.placeholder = "Enter to-do...";
  }
});

todoInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (todoInput.value === "") {
      todoInput.placeholder = "You have to add something!";
    } else {
      addTodo(e.target.value);
      e.target.value = "";
      todoInput.placeholder = "Enter to-do...";
    }
  }
});

todoList.addEventListener("click", deleteTodo);
filter.addEventListener("mouseup", filterResults);
filter.addEventListener("touchend", filterResults);
document.addEventListener("DOMContentLoaded", printLocal);

// FUNCTIONS

function addTodo(e) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-text");
  todoDiv.appendChild(newTodo);

  const trash = document.createElement("button");
  trash.classList.add("trash");
  trash.innerHTML = "<i class='trash-icn fas fa-lg fa-trash-alt'></i>";
  todoDiv.appendChild(trash);

  const complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = "<i class='complete-icn fas fa-lg fa-check'></i>";
  todoDiv.appendChild(complete);

  todoList.appendChild(todoDiv);
  saveLocal(todoInput.value);
  todoInput.value = "";
}

function deleteTodo(e) {
  let target = e.target;
  if (e.srcElement.classList[0] === "trash") {
    target.parentElement.classList.add("deleted");
    deleteLocal(e.target.parentElement.firstChild.innerText);
    e.target.parentElement.addEventListener("transitionend", function () {
      target.parentElement.remove();
    });
  } else if (e.srcElement.classList[0] === "complete") {
    target.parentElement.classList.toggle("finished");
    if (target.parentElement.classList.contains("finished")) {
      var audio = new Audio("sounds/kid-cheer.mp3");
      audio.play();
    } else {
      var audio = new Audio("sounds/aww.mp3");
      audio.play();
    }
  }
}

function filterResults(e) {
  let target = todoList.childNodes;
  let value = e.target.value;
  target.forEach(function (todo) {
    switch (value) {
      case "1":
        if (!todo.classList.contains("finished")) {
          todo.classList.remove("hidden");
        } else {
          todo.classList.add("hidden");
        }
        break;
      case "2":
        todo.classList.remove("hidden");
        break;
      case "3":
        if (todo.classList.contains("finished")) {
          todo.classList.remove("hidden");
        } else {
          todo.classList.add("hidden");
        }
        break;
    }
  });
}

function localCheck() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function saveLocal(todo) {
  let todos = localCheck();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteLocal(todo) {
  let todos = localCheck();
  var a = todos.indexOf(todo);
  todos.splice(a, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function printLocal() {
  let todos = localCheck();
  console.log(todos[1]);
  for (i = 0; i < todos.length; i++) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todos[i];
    newTodo.classList.add("todo-text");
    todoDiv.appendChild(newTodo);

    const trash = document.createElement("button");
    trash.classList.add("trash");
    trash.innerHTML = "<i class='trash-icn fas fa-lg fa-trash-alt'></i>";
    todoDiv.appendChild(trash);

    const complete = document.createElement("button");
    complete.classList.add("complete");
    complete.innerHTML = "<i class='complete-icn fas fa-lg fa-check'></i>";
    todoDiv.appendChild(complete);

    todoList.appendChild(todoDiv);
  }
}
