const gallery = document.querySelector('#gallery');
let employeeList;
let currentIndex;

gallery.addEventListener('click', e => openModal(e));

// =====================================
// FETCH REQUEST
// =====================================

// Request data for 12 random users from the US
fetch('https://randomuser.me/api/?results=12&nat=us')
	.then(response => response.json())
	.then(data => displayEmployees(data.results));

// =====================================
// HELPER FUNCTIONS
// =====================================













// Print employee cards to the page
function displayEmployees(employees) {
	let html = '';
	employeeList = employees;
	// console.log(employeeList);
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



function updateInfo(employeeIndex) {
	let employee = employeeList[employeeIndex];

	let birthday = new Date(employee.dob.date);
	birthday = birthday.getMonth() + 1 + '/' +
		birthday.getDate() + '/' +
		birthday.getFullYear();

	let infoHTML =  `
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
	`;

	document.querySelector('.modal-info-container').innerHTML = infoHTML;

}


// Open modal
function openModal(event) {
	// Find ancestor element with the class of 'card'
	let card = event.target.closest('.card');
	// If an ancestor element with the class of 'card' exists
	if(card) {
		const employeeEmail = card.children[1].children[1].textContent;
		const container = document.createElement('div');
		container.classList.add('modal-container');

		currentIndex = employeeList.findIndex(employee => employee.email === employeeEmail);

		container.innerHTML = `
			<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
				</div>
			</div>
			<div class="modal-btn-container">
				<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
				<button type="button" id="modal-next" class="modal-next btn">Next</button>
			</div>
		`;

		document.querySelector('body').append(container);

		updateInfo(currentIndex);

		const closeButton = document.querySelector('.modal-close-btn');
		const prev = document.querySelector('#modal-prev');
		const next = document.querySelector('#modal-next');

		closeButton.addEventListener('click', e => closeModal(e));

		if (currentIndex === 0) hide(prev);
		if (currentIndex === 11) hide(next);

		prev.addEventListener('click', () => updateModal(prev, next));
		next.addEventListener('click', () => updateModal(next, prev));
	}
}

// Hide button
function hide(element) {
	element.style.visibility = 'hidden';
}

// Display button
function show(element) {
	element.style.visibility = 'visible';
}

// Update modal state when 'Prev' or 'Next' button is clicked
function updateModal(clickedButton, otherButton) {
	// Update currentIndex global variable
	// Minus 1 if 'Prev' button clicked
	// Plus 1 if 'Next' button clicked
	currentIndex = (clickedButton.textContent === 'Prev') 
		? (currentIndex - 1) 
		: (currentIndex + 1);
	
	// Hide clicked button if currentIndex is first or last
	if (currentIndex === 0) hide(clickedButton);
	if (currentIndex === 11) hide(clickedButton);
	
	// Update employee information in modal
	updateInfo(currentIndex);
	// Ensure non-clicked button is now displayed
	show(otherButton);
}