// DOM
function makeTodoCard(title, description, id) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const todoItemTitle = document.createElement("span");
  const todoItemDescription = document.createElement("span");

  todoItemTitle.classList.add("todo-item-title");
  todoItemDescription.classList.add("todo-item-description");

  todoItemTitle.innerText = title;
  todoItemDescription.innerText = description;

  const todoItemActions = document.createElement("div");
  todoItemActions.classList.add("todo-item-actions");

  const todoEdit = document.createElement("button");
  todoEdit.classList.add("todo-edit");
  todoEdit.innerText = "Edit";

  // on edit click
  todoEdit.addEventListener("click", () => editTodo(id));

  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete");
  todoDelete.innerText = "Delete";

  // on delete click
  todoDelete.addEventListener("click", () => deleteTodo(id));

  todoItemActions.appendChild(todoEdit);
  todoItemActions.appendChild(todoDelete);

  todoItem.appendChild(todoItemTitle);
  todoItem.appendChild(todoItemDescription);
  todoItem.appendChild(todoItemActions);

  const todoList = document.getElementById("todo-list");
  todoList.appendChild(todoItem);
}

function deleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      console.log("Todo Deleted ✅");

      // refetch todos
      getTodos();
    });
}

function editTodo(id) {
  const newTitle = prompt("Enter new title");
  const newDescription = prompt("Enter new description");

  if (newTitle || newTitle) {
    const updated = {};

    if (newTitle) {
      updated.title = newTitle;
    }

    if (newDescription) {
      updated.description = newDescription;
    }

    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Todo Updated ✅");

        // refetch todos
        getTodos();
      });
  } else {
    alert("One of Title, description is required");
  }
}

function getTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  fetch("http://localhost:3000/todos", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((todos) => {
      todos.forEach((todo) => {
        makeTodoCard(todo.title, todo.description, todo.id);
      });
    });
}

function createTodo() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (title.value && description.value) {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Todo Created ✅");

        // refetch todos
        getTodos();

        // clear title and description on successful creation
        title.value = "";
        description.value = "";
      });
  } else {
    alert("Title and description are required");
  }
}
