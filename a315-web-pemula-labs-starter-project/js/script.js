document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});

function makeTodo(data, timestamp, isCompleted) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);

    if (isCompleted) {
        container.append(createUndoButton(), createTrashButton());
    } else {
        container.append(createCheckButton());
    }

    return container;
}

const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function addTodo() {
    const uncompletedTODOList = document.getElementById(
        UNCOMPLETED_LIST_TODO_ID
    );

    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    const todo = makeTodo(textTodo, timestamp, false);
    const todoObject = composeTodoObject(textTodo, timestamp, false);

    todo[TODO_ITEMID] = todoObject.id;
    todos.push(todoObject);
    uncompletedTODOList.append(todo);
    updateDataToStorage();
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();
    updateDataToStorage();
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function removeTaskFromCompleted(taskElement) {
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, false);
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    listUncompleted.append(newTodo);
    taskElement.remove();
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

// STORAGE SECTION
const STORAGE_KEY = "TODO_APPS";

let todos = [];

function isStorageExist() /* boolean */ {
    if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) todos = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) saveData();
}

function composeTodoObject(task, timestamp, isCompleted) {
    return {
        id: +new Date(),
        task,
        timestamp,
        isCompleted,
    };
}

function findTodo(todoId) {
    for (todo of todos) {
        if (todo.id === todoId) return todo;
    }
    return null;
}

function findTodoIndex(todoId) {
    let index = 0;
    for (todo of todos) {
        if (todo.id === todoId) return index;

        index++;
    }

    return -1;
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for (todo of todos) {
        const newTodo = makeTodo(todo.task, todo.timestamp, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if (todo.isCompleted) {
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}
