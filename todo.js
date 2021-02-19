const toDoForm = document.querySelector(".js-todo-form"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todo-list");

const TODO_LS = "toDos";
let toDoId = 1;

const toDos = [];

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDos(text) {
    const li = document.createElement("li");
    li.id = toDoId;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = text;

    li.appendChild(deleteBtn);
    li.appendChild(span);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: toDoId
    };
    toDoId += 1;
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
 const loadedToDos = localStorage.getItem(TODO_LS);
 if(loadedToDos !== null) {
    const parsedLoadedToDos = JSON.parse(loadedToDos);
    parsedLoadedToDos.forEach(function(toDo) {
        paintToDos(toDo.text);
    });
 }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();