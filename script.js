let myTasks = [];
const todoTask = document.getElementById("new-task-input");
const submitBtn = document.getElementById("new-task-submit");

submitBtn.addEventListener("click", addTask);
//to add task in task variable
function addTask(event) {
  event.preventDefault();
  let tasks = [];
  if (!todoTask.value) {
    const errorMsg = document.getElementById("errormsg");
    errorMsg.innerHTML = "Please Insert task first!!!!";
  } else {
    let task = { name: todoTask.value, status: true };
    tasks.push(task);
    myTasks.push(task);
    todoTask.value = "";
    setData();
    displayTask(tasks);
  }
}

const displayTask = (tasks) => {
  //where to store the data
  const todoList = document.getElementById("todo-list");
  for (let i in tasks) {
    // create todo row
    const newtodoRow = document.createElement("tr");
    newtodoRow.classList.add(
      "odd:bg-orange-100",
      "even:bg-orange-50",
      "text-orange-700"
    );

    newtodoRow.setAttribute("id", `todo-row${i}`);

    //create todo data for table
    const newtodoData = document.createElement("td");
    newtodoData.innerHTML = tasks[i].name;

    newtodoData.classList.add("todo");
    //create todo data for button
    const newtodoDataBtn = document.createElement("td");

    //buttons for status
    //default tick button
    const statusBtn = document.createElement("button");

      if (tasks[i].status === false) {
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>`;

        newtodoData.classList.add('inactive');
      } else {
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>`;

        newtodoData.classList.remove('inactive');
    }

    // statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    //                     stroke="currentColor" class="w-6 h-6">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    //                   </svg>`;

    //toggle for status
    //true -> not completed
    statusBtn.classList.add("px-4");
    statusBtn.addEventListener("click", () => {
      if (tasks[i].status === true) {
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>`;
        tasks[i].status = false;
        newtodoData.classList.add('inactive');
        setData();
      } else {
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>`;
        tasks[i].status = true;
        newtodoData.classList.remove('inactive');
        setData();
      }
    });

    newtodoDataBtn.appendChild(statusBtn);

    //button for trash

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("px-4");
    deleteBtn.setAttribute("id", `todo-row${i}`);
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>`;

    deleteBtn.addEventListener("click", () => {
      let deleteId = deleteBtn.getAttribute("id");
      myTasks.splice(deleteId,1); 
      newtodoRow.remove();
      setData();


    });
    newtodoDataBtn.appendChild(deleteBtn);

    //add data and button to the tr
    newtodoRow.appendChild(newtodoData);
    newtodoRow.appendChild(newtodoDataBtn);

    //append to table
    todoList.appendChild(newtodoRow);



  //   const countTodo = myTasks.filter((x) => {
  //    x.status===false});
  //    console.log(countTodo);
  // console.log(countTodo.length);
  }
};

const setData = () => {
  localStorage.setItem("myTasks", JSON.stringify(myTasks));

};


function restoreData(){
  if (!localStorage.myTasks) {
    displayTask(myTasks);
  } else {
    //get object from localstorage
    let storedObject = localStorage.getItem("myTasks");
    storedObject = JSON.parse(storedObject);
    myTasks = storedObject;
    displayTask(myTasks);
  }
};

//restore data from localstorage
restoreData();

//clear local storage
// localStorage.clear();
