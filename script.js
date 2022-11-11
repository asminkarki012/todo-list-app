let myTasks = [];
const todoTask = document.getElementById("new-task-input");

// Blink cursor in input field initially
todoTask.focus();

const submitBtn = document.getElementById("new-task-submit");

submitBtn.addEventListener("click", addTask);
//to add task in task variable
function addTask(event) {
  event.preventDefault();
  if (!todoTask.value) {
    const errorMsg = document.getElementById("errormsg");
    errorMsg.innerHTML = "Please Insert task first!!!!";
  } else {
    const errorMsg = document.getElementById("errormsg");
    errorMsg.innerHTML = "";

    var count = 0;
    const task = { id: count, name: todoTask.value, status: false };
    count++;

    //unshift add task front of array
    myTasks.unshift(task);
    todoTask.value = "";
    setData();

    displayTask();
    window.location.reload();
  }
}

const displayTask = () => {
  //where to append the new task child @tbody
  const todoList = document.getElementById("todo-list");

  for (let i in myTasks) {
    // create todo row
    const newtodoRow = document.createElement("tr");
    newtodoRow.classList.add(
      "odd:bg-orange-100",
      "even:bg-orange-50",
      "text-orange-700"
    );

    // newtodoRow.setAttribute("id", `todo-row${myTasks[i].id}`);

    //create todo data for table
    const newtodoData = document.createElement("td");
    newtodoData.innerHTML = myTasks[i].name;

    // id to edit the task inside table
    newtodoData.setAttribute("id", `todo${myTasks[i].id}`);
    newtodoData.classList.add("todo");

    //create todo data for button
    const newtodoDataBtn = document.createElement("td");

    // to set edit delete and check in same row
    newtodoDataBtn.classList.add("flex", "gap-4", "m-auto");

    //buttons for status
    //default tick button
    //status is false when task is not complete;
    const statusBtn = document.createElement("button");

    if (myTasks[i].status === true) {
      // cross sign
      statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>`;

      newtodoData.classList.add("inactive");
    } else {
      //tick sign
      statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>`;

      newtodoData.classList.remove("inactive");
    }

    // statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    //                     stroke="currentColor" class="w-6 h-6">
    //                     <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    //                   </svg>`;

    //toggle for status
    //true -> not completed
    // statusBtn.classList.add("px-4");
    statusBtn.addEventListener("click", () => {
      if (myTasks[i].status === true) {
        //tick sign
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>`;
        myTasks[i].status = false;
        newtodoData.classList.remove("inactive");
        setData();
      } else {
        // cross sign
        statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>`;

        myTasks[i].status = true;
        newtodoData.classList.add("inactive");
        setData();
      }
    });

    newtodoDataBtn.appendChild(statusBtn);

    //button for edit

    const editBtn = document.createElement("button");

    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
    `;
    // editBtn.classList.add("px-4", "m-auto");
    let flag = true;
    editBtn.addEventListener("click", () => {
      if (flag) {
        newtodoData.setAttribute("contenteditable", "true");
        flag = false;
        editBtn.classList.toggle("text-blue-500");
      } else {
        newtodoData.setAttribute("contenteditable", "false");
        flag = true;
        const editedText = document.getElementById(`todo${myTasks[i].id}`);
        newtodoData.innerHTML = editedText.textContent;
        myTasks[i].name = editedText.textContent;
        setData();
        editBtn.classList.toggle("text-blue-500");
      }
    });

    newtodoDataBtn.appendChild(editBtn);

    //button for trash

    const deleteBtn = document.createElement("button");

    deleteBtn.setAttribute("id", `todo-row${myTasks[i].id}`);
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>`;

    deleteBtn.addEventListener("click", () => {
      let deleteId = deleteBtn.getAttribute("id");
      myTasks.splice(deleteId, 1);
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
  // Reset global variable after setting up
};

function restoreData() {
  if (!localStorage.myTasks) {
    displayTask(myTasks);
  } else {
    //get object from localstorage
    let storedObject = localStorage.getItem("myTasks");
    storedObject = JSON.parse(storedObject);
    myTasks = storedObject;
    displayTask(myTasks);
  }
}

//restore data from localstorage
restoreData();

//clear local storage
function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}

//to implement search and resetsearch

// function searchData() {
//   // e.preventDefault();
//   const searchInput = document.getElementById("search-input").value;

//   let filter = searchInput.toUpperCase();
//   let tbody = document.getElementById("todo-list");
//   let tr = tbody.getElementsByTagName("tr");

//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     let td = tr[i].getElementsByTagName("td")[0];
//     txtValue = td.textContent || td.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       tr[i].style.display = "";
//     } else {
//       tr[i].style.display = "none";
//     }
//   }
// }

// function resetSearchData() {
//   let tbody = document.getElementById("todo-list");
//   let tr = tbody.getElementsByTagName("tr");
//   const clearSearch = document.getElementById("search-input");
//   clearSearch.value = "";

//   for (i = 0; i < tr.length; i++) {
//     tr[i].style.display = "";
//   }
// }
