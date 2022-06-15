const taskInput = document.querySelector(".task_input input");
const addBtn = document.querySelector(".task_input button");
clearall = document.querySelector(".todolist_footer .clear_btn")
filters = document.querySelectorAll(".filters span");
taskbox = document.querySelector(".task_box")


let editID;
let is_edit_task = false;
taskInput.onkeyup = () => {
    let userData = taskInput.value; //取得用戶輸入
    if(userData.trim() != 0){ //如果用戶有輸入東西
        addBtn.classList.add("active"); //給button class為active
    }
    else{ 
        addBtn.classList.remove("active"); // 移除button class 的active
    }
}

let taskLS = JSON.parse(localStorage.getItem("新的待辦事項"));//取得本機儲存

filters.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTask(btn.id)
    });
});

function showTask(filter){
    let li = "";
    const pendingnumber = document.querySelector(".pending_number");
    if(taskLS){
        taskLS.forEach((task,id) => {
            let isComp = task.status == "completed"?"checked":"";
            if(filter == task.status || filter == "alltasks"){
                li +=  `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isComp}>
                            <p class="${isComp}">${task.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showmenu(this)" class="fa fa-ellipsis-h"></i>
                            <ul class="setting_menu">
                                <li onclick="editTask(${id},'${task.name}')"><i class="fa fa-pencil"></i>編輯</li>
                                <li onclick="deleteTask(${id})"><i class="fa fa-trash"></i>刪除</li>
                            </ul>
                        </div>
                    </li>`;
            }
        });
        let taskcount=0;
        taskLS.forEach((task,id) => {
        if(task.status == "pending"){
        taskcount +=1;
        }
    });
    pendingnumber.textContent = taskcount;
    };
    taskbox.innerHTML = li || `<span>沒有任何事項</span>`;    
}

showTask("alltasks")

function showmenu(selectedTask) {//如果被點擊
    //選擇taskmenu的div(最後一個所以使用lastElementChild)
    let taskmenu = selectedTask.parentElement.lastElementChild;
    //增加class=show
    taskmenu.classList.add('show');
    document.addEventListener("click",e => {
        //如果點擊其他地方，拿掉show
        if(e.target.tagName !="I" || e.target !=selectedTask){
            taskmenu.classList.remove("show");
        }
    })
}

function editTask(task_iD,task_name){
    editID = task_iD;
    is_edit_task = true;
    taskInput.value = task_name;
}

function deleteTask(delete_id){
    taskLS.splice(delete_id,1);
    localStorage.setItem("新的待辦事項",JSON.stringify(taskLS));
    showTask("alltasks");
}

clearall.addEventListener("click",() =>{
    taskLS.splice(0, taskLS.length);
    localStorage.setItem("新的待辦事項",JSON.stringify(taskLS));
    showTask("alltasks");
});


function updateStatus(selectedTask){
    let taskname = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){//如果被打勾
        //將狀態更新成完成
        taskname.classList.add("checked");
        taskLS[selectedTask.id].status = 'completed';
    }
    else{
        taskname.classList.remove("checked");
        taskLS[selectedTask.id].status = 'pending';
    }
    //更新狀態後轉換js元素成json字串並存入本地儲存空間
    localStorage.setItem("新的待辦事項",JSON.stringify(taskLS));
}
//用戶點擊了按鈕後的行為
addBtn.onclick = () =>{
    let uer_task = taskInput.value.trim();
    if(!is_edit_task){
        if(!taskLS){//如果本機儲存為空
        taskLS = [];//創建一個空的陣列
        }
        let task_info = {name:uer_task,status:"pending"};
        taskLS.push(task_info);//push資料
    }
    else{
        is_edit_task = false;
        taskLS[editID].name = uer_task;
    }

    taskInput.value = "";
    //轉換js元素成json字串並存入本地儲存空間
    localStorage.setItem("新的待辦事項",JSON.stringify(taskLS));
    showTask("alltasks");
}

