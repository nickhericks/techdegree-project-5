const gallery = document.querySelector('#gallery');
let employeeList;

gallery.addEventListener('click', e => openModal(e));


// Request data for 12 random users
fetch('https://randomuser.me/api/?results=12')
	.then( response => response.json() )
	.then( data => displayEmployees(data.results) );

function displayEmployees(employees) {
	// console.log(employees);
	employeeList = employees;
	// console.log(employeeList);

	let html = '';

	employees.map(function(employee) {
		html += `
			<div class="card">
				<div class="card-img-container">
					<img class="card-img" src="${employee.picture.large}"
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

// Close modal
function closeModal() {
	const modalContainer = document.querySelector('.modal-container');
	modalContainer.remove();
}


// Open modal
function openModal(event) {
	// Find ancestor element with the class of 'card'
	let card = event.target.closest('.card');
	// If an ancestor element with the class of 'card' exists
	if(card) {
		// console.log(card);
		const employeeEmail = card.children[1].children[1].textContent;
		// console.log(employeeEmail);

		const employee = employeeList.find(employee => employee.email === employeeEmail);
		let birthday = new Date(employee.dob.date);
		birthday = birthday.getMonth() + 1 + '/' + 
									birthday.getDate() + '/' + 
									birthday.getFullYear();

		// console.log(employee);

		const modalHTML = `
			<div class="modal-container">
				<div class="modal">
					<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
					<div class="modal-info-container">
						<img class="modal-img" src="${employee.picture.large}" alt="profile picture">
						<h3 id="name" class="modal-name cap">
							${employee.name.first} ${employee.name.last}
						</h3>
						<p class="modal-text">${employee.email}</p>
						<p class="modal-text cap">${employee.location.city}</p>
						<hr>
						<p class="modal-text">${employee.cell}</p>
						<p class="modal-text cap">
							${employee.location.street}, 
							${employee.location.city}, 
							${employee.location.state} ${employee.location.postcode}
						</p>
						<p class="modal-text">Birthday: ${birthday}</p>
					</div>
				</div>
			</div>
		`;

		gallery.insertAdjacentHTML('afterend', modalHTML);

		let closeButton = document.querySelector('.modal-close-btn');
		closeButton.addEventListener('click', e => closeModal(e));


		document.querySelector('.modal-container').addEventListener('click', e => {
			if (!e.target.closest('.modal')) {
				closeModal();
			}
		});


	}
}

