const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let fullEmployeeList = [];
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


let formHTML = `
	<form action="#" method="get">
		<input type="search" id="search-input" class="search-input" placeholder="Search...">
	</form>
`;

searchContainer.innerHTML = formHTML;





const searchInput = document.querySelector('#search-input');
let searchString = '';
let filteredEmployeeList = fullEmployeeList;


// Update filteredEmployeeList using search query and refresh page
const newQuery = () => {
	filteredEmployeeList = [];

	// For each item in the full employee list
	for (let i = 0; i < fullEmployeeList.length; i++) {
		// Select the employee's name as a string
		let name = fullEmployeeList[i].name.first;
		// If the student's name contains the search query substring
		if (name.includes(searchString)) {
			// Add student item HTML to filteredEmployeeList
			filteredEmployeeList.push(fullEmployeeList[i]);
		}
	}
	console.log(filteredEmployeeList);
	displayEmployees(filteredEmployeeList);
};

// Call search() function when input value changes
searchInput.addEventListener('input', () => {
	searchString = searchInput.value;
	newQuery();
});














// Print employee cards to the page
function displayEmployees(employees) {
	let html = '';

	if(fullEmployeeList.length === 0) {
		fullEmployeeList = employees;
	}
	
	filteredEmployeeList = employees;
	
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
	let employee = filteredEmployeeList[employeeIndex];

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

		currentIndex = filteredEmployeeList.findIndex(employee => employee.email === employeeEmail);

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
		if (currentIndex === filteredEmployeeList.length - 1) hide(next);

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
	if (currentIndex === filteredEmployeeList.length - 1) hide(clickedButton);
	
	// Update employee information in modal
	updateInfo(currentIndex);
	// Ensure non-clicked button is now displayed
	show(otherButton);
}