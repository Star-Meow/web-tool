const selectedmenu = document.querySelectorAll("select");
const nowdate = document.querySelector(".datetime");
const nowtime = document.querySelector(".hourtime");
const SetAlarmBtn = document.querySelector("button");
const hour_content = document.querySelector(".hour_content");

let AlarmTime , isAlarmActive = false;

//設定選單
for (let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectedmenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectedmenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 1; i >= 0; i--){
    let ampm = i ==0 ? "上午" : "下午";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectedmenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//setInterval 延遲一段時間後，不斷執行下列程式碼
//這邊不斷重複讓時鐘可以跑動
setInterval(() => {
    let date = new Date(),
    gfyear = date.getFullYear(),
    gmonth = date.getMonth() + 1,
    gdate = date.getDate(),
    ghour = date.getHours(),
    gminute = date.getMinutes(),
    gsecond = date.getSeconds(),
    ampm = "上午";

    if(ghour >= 12){
        ghour = ghour -12;
        ampm = "下午";
    }
    //如果小時為0，設定小時為12
    ghour = ghour == 0? ghour = 12 :ghour;
    //如果時間是個位數，在10位數補0
    gmonth = gmonth < 10 ? '0'+ gmonth : gmonth;
    gdate = gdate < 10 ? '0' + gdate : gdate ;
    ghour = ghour < 10 ? '0' + ghour :ghour;
    gminute = gminute < 10 ? '0' + gminute :gminute;
    gsecond = gsecond < 10 ? '0' + gsecond : gsecond ;


    nowdate.innerText = `${gfyear}/${gmonth}/${gdate}`;
    nowtime.innerText = `${ghour}:${gminute}:${gsecond} ${ampm}`;

    if(AlarmTime == `${ghour}:${gminute} ${ampm}` ){
        RingTone.play();
        RingTone.loop = true;
    }
},500);

function SetAlarm(){
    if(isAlarmActive){
        AlarmTime = "";
        RingTone.pause();
        hour_content.classList.remove("disabled");
        SetAlarmBtn.innerText = "設定鬧鐘";
        return isAlarmActive = false;
    }

    //取得用戶輸入的時間
    let SetTime = `${selectedmenu[0].value}:${selectedmenu[1].value} ${selectedmenu[2].value}`;
    
    if(SetTime.includes("小時") || SetTime.includes("分鐘") || SetTime.includes("上午/下午")){
        return alert("請選擇一個時間再點擊設定鬧鐘!");
    }
    isAlarmActive = true;
    AlarmTime = SetTime;
    hour_content.classList.add("disabled");
    SetAlarmBtn.innerText = "清除鬧鐘";
}

SetAlarmBtn.addEventListener("click", SetAlarm);