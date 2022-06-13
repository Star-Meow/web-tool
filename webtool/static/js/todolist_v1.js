//取得輸入
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteallBtn = document.querySelector(".todo-list-footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; //取得用戶輸入
    if(userData.trim() != 0){ //如果用戶有輸入東西
        addBtn.classList.add("active"); //給button class為active
    }
    else{ 
        addBtn.classList.remove("active"); // 移除button class 的active
    }
}

showTasks();//呼叫showTask的函式

//用戶點擊了按鈕後的行為
addBtn.onclick = () =>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("新的代辦事項");//取得本機儲存
    if(getLocalStorage == null ){//如果本機儲存為空
        listArr = [];//創建一個空的陣列
    }
    else{
        listArr = JSON.parse(getLocalStorage);//轉換json字串成js元素
    }
    listArr.push(userData);//上傳或刪除用戶資料
    localStorage.setItem("新的代辦事項",JSON.stringify(listArr));//轉換js元素成json字串
    showTasks();//呼叫showTask的函式
}

//新增代辦事項至ul內的函式
function showTasks(){
    let getLocalStorage = localStorage.getItem("新的代辦事項");
    if(getLocalStorage == null ){//如果本機儲存為空
        listArr = [];//創建一個空的陣列
    }
    else{
        listArr = JSON.parse(getLocalStorage);//轉換json字串成js元素
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //計算並顯示代辦事項數量
    if(listArr.length > 0){
        deleteallBtn.classList.add("active");
    }
    else{ 
        deleteallBtn.classList.remove("active"); // 移除button class 的active
    }
    let newLiTag ='';
    listArr.forEach((element,index) => { 
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})";><i class='fa fa-trash'></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;//新增一個li在ultag裡面
    inputBox.value = '';//新增後將輸入區清空
}

//刪除的函式
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("新的代辦事項");
    listArr = JSON.parse(getLocalStorage);//轉換json字串成js元素
    listArr.splice(index,1);//刪除對應值
    localStorage.setItem("新的代辦事項",JSON.stringify(listArr));//轉換js元素成json字串
    showTasks();
}

deleteallBtn.onclick = () => {
    listArr = [];// 直接定義list為空
    localStorage.setItem("新的代辦事項",JSON.stringify(listArr));//轉換js元素成json字串
    showTasks();
}
