const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete"
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const menu = document.getElementById("menu");
const menulink = document.getElementById("menulink");

var todo_array = [];

document.addEventListener("DOMContentLoaded", () => {
  // clear list
  list.innerHTML = "";

  // get localStorage
  var items = JSON.parse(localStorage.getItem("todo"));
  if (items != null) {
    items.forEach(element => {
      set_todo(element);
      todo_array.push(element);
      update();
    });
  }

  // when menu button is clicked
  menulink.addEventListener("click", e => {
    menu.classList.toggle("active");
    e.preventDefault();
  });
});

// when user click 'add Todo' button
async function newTodo() {
  // show an alert to enter todo
  const { value: message } = await Swal.fire({
    title: "Enter",
    input: "text",
    inputPlaceholder: "type in your todo!"
  });
  if (message) {
    set_todo(message);
    todo_array.push(message);
  }

  // store the list to localstorage
  update();
}

function complete(id) {
  const p = document.getElementById(`${id}-text`);
  const li = document.getElementById(`${id}`);

  // delete from list
  var index = todo_array.indexOf(p.innerText);
  todo_array.splice(index, 1);

  // delete from html
  li.remove();
  update();
}

// add message to todo list
function set_todo(message) {
  const li = document.createElement("div");
  li.className += "todo-item";
  li.setAttribute("id", `${todo_array.length}`);
  li.innerHTML = `<p id='${todo_array.length}-text'> ${message} </p>

  <div class="" style="text-align: center; margin-top: 8px;">
    <button class="icon-btn add-btn" onclick="complete(${todo_array.length})">  
      <div class="btn-txt"> complete </div>
    </button> 
  </div>`;

  list.append(li);
}

function update() {
  localStorage.setItem("todo", JSON.stringify(todo_array));
  itemCountSpan.innerHTML = list.childElementCount;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
