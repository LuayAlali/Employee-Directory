
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&=name, picture, email, location, phone, dob, &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// FETCH
 fetch(urlAPI)
 .then(res => res.json())
 .then(data => data.results)
 .then(displayEmployees)
 .catch(err => console.log(err));


// HELPER FUNCTIONS

function displayEmployees(eData){
     employees = eData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
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
        </div>
        `
        gridContainer.innerHTML = employeeHTML;
    })
   
}
// the modal overlay
function displayModal(index) {
    let { name, dob, phone, email, location: {city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
    <img src="${picture.large}" alt="" class="avatar">
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address"> ${location[street]}, ${state}, ${postcode} </p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}


// Event Listeners
gridContainer.addEventListener('click', e => {

    if(e.target !== gridContainer){
        const card  = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);

        // changing index to a number
        let indexNumber = parseInt(index);

        // Selecting the arrows
        const leftArrow = document.querySelector('.left');
        const rightArrow = document.querySelector('.right');

        // event listeners for arrows
    leftArrow.addEventListener('click', e =>{
        if(indexNumber === 11){
            indexNumber = 0;
            displayModal(indexNumber);
        } else if(indexNumber < 11){
            indexNumber += 1;
            displayModal(indexNumber);
        }
        
    });
         rightArrow.addEventListener('click', e => {
             if(indexNumber === 0 ){
                 indexNumber = 11;
                 displayModal(indexNumber);
             }else if(indexNumber > 0){
                 indexNumber -= 1;
                 displayModal(indexNumber);
             }
         });   
        }

    });

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");

});
