"use strict";


//////////////// DOM /////////////////////

let addbtn = document.querySelector(".add");

let desc = document.querySelector("#new");

let tableBody = document.querySelector("tbody");

let container = document.querySelector(".container");

let secondTd = document.querySelector(".secondTd");

let modal = document.querySelector(".modal");

let main = document.querySelector(".main");

let date = document.querySelector(".date");

let deletebtn = document.querySelector(".delete");

let completebtn = document.querySelector(".complete");


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 

let tasks = new Map();

let id = 1;


switch(mm){
    case "01":
        mm = "January";
        break;
    case "02":
        mm = "February";
        break;
    case "03":
        mm = "March";
        break;
    case "04":
        mm = "April";
        break;
    case "05":
        mm = "May";
        break;
    case "06":
        mm = "June";
        break;
    case "07":
        mm = "July";
        break;
    case "08":
        mm = "August";
        break;
    case "09":
        mm = "September";
        break;
    case "10":
        mm = "October";
        break;
    case "11":
        mm = "November";
        break;
    case "12":
        mm = "December";
        break;
}
date.textContent = dd + "  " + mm;



//////////////// Functions //////////////////////


//Adding a new task
const addTask = function(value,status){

    if(value != ""){

        // Add task to the task list 
        tasks.set(value,status);

        // Add task to UI
        updateUI(value, status);
    }
   
    window.localStorage.setItem(value,status);
    //clear the input field
    desc.value = "";

}

// updating UI 
const updateUI = function(desc, status){
    let html, newHtml;

    html = '<tr><td>%Task%</td><td class="secondTd"><img id = "%id%" src="images/%status%.png" alt="%status%"></td></tr>';

    newHtml = html.replace('%Task%',desc);
    newHtml = newHtml.replaceAll('%status%',status);
    newHtml = newHtml.replaceAll('%id%',id);
    id++;

    tableBody.insertAdjacentHTML("afterbegin",newHtml);
     
}

//Completed Task
const completedTask = function(event){
    
    document.getElementById(event.target.id).src = "images/complete.png";
    tasks.set(document.getElementById(event.target.id).parentNode.previousSibling.textContent, "complete");
    window.localStorage.setItem(document.getElementById(event.target.id).parentNode.previousSibling.textContent, "complete");
}

// Delete Task
const deleteTask = function(event){
   
   tasks.delete(document.getElementById(event.target.id).parentNode.previousSibling.textContent);
   window.localStorage.removeItem(document.getElementById(event.target.id)
                                    .parentNode.previousSibling.textContent);
    event.target.parentNode.parentNode.remove();

}



////////////////// Event Listeners //////////////////////


//Adding Task
addbtn.addEventListener("click", function(){
    addTask(desc.value,"pending");
});

document.addEventListener('keypress',function(e){
    if(e.keyCode ===13 || e.key === "Enter"){
        addTask(desc.value, "pending");
    }
})

//Complete Or Delete Task
container.addEventListener('click',function(event){
    if(event.target.parentNode.classList.contains("secondTd")){
        completedTask(event);
    }

});

container.addEventListener('dblclick',function(event){
    if(event.target.parentNode.classList.contains("secondTd")){
        deleteTask(event);
        
    }

});

// Retrieving Data onLoad
window.onload = function(){

    for(let i=0; i< localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)) === "pending" || localStorage.getItem(localStorage.key(i)) === "complete"){
            addTask(localStorage.key(i),localStorage.getItem(localStorage.key(i)))
        }
    }
}
