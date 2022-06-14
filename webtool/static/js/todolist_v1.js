const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");
let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>編輯</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>刪除</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>你還沒新增任何代辦事項</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}
clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});
//取得輸入
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteallBtn = document.querySelector(".todo-list-footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //取得用戶輸入
    if (userData.trim() != 0) { //如果用戶有輸入東西
        addBtn.classList.add("active"); //給button class為active
    } else {
        addBtn.classList.remove("active"); // 移除button class 的active
    }
}

showTasks(); //呼叫showTask的函式

//用戶點擊了按鈕後的行為
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("新的代辦事項"); //取得本機儲存
    if (getLocalStorage == null) { //如果本機儲存為空
        listArr = []; //創建一個空的陣列
    } else {
        listArr = JSON.parse(getLocalStorage); //轉換json字串成js元素
    }
    listArr.push(userData); //上傳或刪除用戶資料
    localStorage.setItem("新的代辦事項", JSON.stringify(listArr)); //轉換js元素成json字串
    showTasks(); //呼叫showTask的函式
}

//新增代辦事項至ul內的函式
function showTasks() {
    let getLocalStorage = localStorage.getItem("新的代辦事項");
    if (getLocalStorage == null) { //如果本機儲存為空
        listArr = []; //創建一個空的陣列
    } else {
        listArr = JSON.parse(getLocalStorage); //轉換json字串成js元素
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //計算並顯示代辦事項數量
    if (listArr.length > 0) {
        deleteallBtn.classList.add("active");
    } else {
        deleteallBtn.classList.remove("active"); // 移除button class 的active
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class='fa fa-trash'></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //新增一個li在ultag裡面
    inputBox.value = ''; //新增後將輸入區清空
}

//刪除的函式
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("新的代辦事項");
    listArr = JSON.parse(getLocalStorage); //轉換json字串成js元素
    listArr.splice(index, 1); //刪除對應值
    localStorage.setItem("新的代辦事項", JSON.stringify(listArr)); //轉換js元素成json字串
    showTasks();
}

deleteallBtn.onclick = () => {
    listArr = []; // 直接定義list為空
    localStorage.setItem("新的代辦事項", JSON.stringify(listArr)); //轉換js元素成json字串
    showTasks();
}