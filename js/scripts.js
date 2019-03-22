const gallery = document.querySelector('#gallery');
let employeeList;

gallery.addEventListener('click', e => openModal(e));


// Request data for 12 random users
fetch('https://randomuser.me/api/?results=12')
	.then( response => response.json() )
	.then( data => displayEmployees(data.results) );

function displayEmployees(employees) {
	console.log(employees);
	employeeList = employees;
	console.log(employeeList);

	let html = '';

	employees.map(function(employee) {
		html += `
			<div class="card">
				<div class="card-img-container">
					<img class="card-img" src="${employee.picture.thumbnail}"
					alt="profile picture">
				</div>
				<div class="card-info-container">
					<h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
					<p class="card-text">${employee.email}</p>
					<p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
				</div>
			</div>
		`;
	});
	gallery.innerHTML = html;
}



function openModal(event) {
	// Find ancestor element with the class of 'card'
	let card = event.target.closest('.card');
	// If an ancestor element with the class of 'card' exists
	if(card) {
		console.log(card);
		let employeeEmail = card.children[1].children[1].textContent;
		console.log(employeeEmail);

		





	}
}
