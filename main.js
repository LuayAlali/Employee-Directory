
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&=name, picture, email, location, phone, dob, &noinfo &nat=CA`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// FETCH
 fetch(urlAPI)
 .then(res => res.json())
 .then(displayEmployees)
 .catch(err => console.log(err));


// HELPER FUNCTIONS

function displayEmployees(eData){
    employees = eData;
    let employeeHTML = '';

    employees.forEach( (employee, index) => {
        let name = comployee.name;
        let email = employee.email;
        let city = employee.city;
        let picture = employee.picture;
    

        employeeHTML += `
        <div class="card" data-index="${index}">
		<img src="${picture.large}" class="avatar">
		<div class="text-container">
		<h2 class="name">${name.first} ${name.last}</h2>
		<p class="email">${email}</p>
		<p class="address">${city}</p>
		</div>
        `
     
    });
    gridContainer.innerHTML = employeeHTML;
}