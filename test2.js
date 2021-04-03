var addModal = new bootstrap.Modal(document.getElementById('addModal'), {
  keyboard: false
})

document.getElementById("addBtn").addEventListener("click", function () {

  addModal.show();
})


/**--------------------------- Add Data------------------------------------ */



document.getElementById("addForm").onsubmit = function (e) {
  e.preventDefault();


  let first_name = document.getElementById("fname").value;
  let last_name = document.getElementById("lname").value;
  let age = document.getElementById("age").value;


  let body = {
    student: {
      first_name,
      last_name,
      age
    }
  }


  fetch("https://www.swatiserver.tk/api/students/store", {
    method: "POST",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(Response => {
      document.getElementById("addForm").reset();
      addModal.hide();
      getList();
    })
    .catch(error => console.log(error))



}





/**-------------------------------- getList------------------------------------- */

function getList() {


  fetch("https://www.swatiserver.tk/api/students")
    .then(Response => Response.json())
    .then(data => {

     if(data.length == 0){
      
      document.getElementById("ss").style.display = "block";
      document.getElementById("tt").style.display = "none";

     }else{
      document.getElementById("ss").style.display = "none";
      document.getElementById("tt").style.display = "block";
      d = data;
      a = "";

      d.forEach(function (element, index) {

        a += `<tr><td>${element.id}</td><td>${element.first_name}</td><td>${element.last_name}</td><td>${element.age}</td><td><button class="btn btn-sm btn-primary" onclick="upList(this)">Update</button></td><td><button class="btn btn-sm btn-danger" onclick="delList(this)">Delete</button></td></tr>`

      })

      document.getElementById("tbody").innerHTML = a;
     }



     
    })

}







/**--------------------------------------- delete Data------------------------------------- */



function delList(a) {


  let id = a.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  // console.log(id);

  fetch("https://www.swatiserver.tk/api/students/" + id, {
    method: "DELETE"
  })
    .then(response => getList())
    .catch(error => console.log(error))
}








/**---------------------------------- update data----------------------------------------------- */




var updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {
  keyboard: false
})



function upList(a) {

  let id = a.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
  console.log(id);

  fetch("https://www.swatiserver.tk/api/students/" + id)
    .then(response => response.json())
    .then(data => {

      document.getElementById("id").value = data.id;
      document.getElementById("ffname").value = data.first_name;
      document.getElementById("llname").value = data.last_name;
      document.getElementById("aage").value = data.age;

    })

  updateModal.show();


}


document.getElementById("updateForm").onsubmit = function (e) {
  e.preventDefault();

  let id = document.getElementById("id").value;
  let first_name = document.getElementById("ffname").value;
  let last_name = document.getElementById("llname").value;
  let age = document.getElementById("aage").value;

  let body = {
    student: {
      first_name,
      last_name,
      age
    }
  }


  fetch("https://www.swatiserver.tk/api/students/" + id, {
    method: "PUT",
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.status == 200) {
        document.getElementById("updateForm").reset();
        updateModal.hide();
        getList();
      }
    })
    .catch(error => console.log(error))
}




window.onload = getList();









/**---------------------------------------------- Delete All data-------------------------------------------*/




document.getElementById("deleteAll").addEventListener("click", function () {

  fetch("https://www.swatiserver.tk/api/all", {
    method: "DELETE"
  })
    .then(response =>{
      getList();
      x = 1; // reset x to 1
    })
    .catch(error => console.log(error))
})











var interval  //global variable
let x =1      //global variable x will be 1 ,













document.getElementById("samplestart").addEventListener("click",function(){ //on sample button click


 interval = setInterval(function(){ //interval function will run
    
    let body = {
      student:{
        first_name : "demo",
        last_name : "demo",
        age : 50
      }
    }
 
    fetch("https://www.swatiserver.tk/api/students/store", {  //post request
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => {
        getList();    // getList called
      })
      .catch(error => console.log(error))

      x++;   //increment x .. here x becomes 12
     
      if(x === 11){ //check if x === 11 , if true run clearinteral function , so interval func will stop
        clearInterval(interval)
      }




  },2000) //interval function will run every 2 secs

})


window.onload = function (){

  setInterval(function(){
      document.getElementById("heart").classList.toggle("beat");

  },600)
}


