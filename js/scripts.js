const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let fullEmployeeList = [];
let filteredEmployeeList = [];
let searchString = '';
let currentIndex;

// Add search bar to the page
addSearch();

// Open modal when user clicks employee card
gallery.addEventListener('click', e => openModal(e));

// =====================================
//    FETCH REQUEST
// =====================================

// Request data for 12 random users from the US
fetch('https://randomuser.me/api/?results=12&nat=us')
	.then(response => response.json())
	.then(data => displayEmployees(data.results));

	
// =====================================
//    GENERAL
// =====================================

// Print employee cards to the page
function displayEmployees(employees) {
	// Update filteredEmployeeList
	filteredEmployeeList = employees;

	// Set fullEmployeeList array if not already done
	if (fullEmployeeList.length === 0) {
		fullEmployeeList = employees;
	}

	// Create string variable to hold all gallery HTML
	let galleryHTML = '';

	// Iterate through employees and create HTML card for each
	employees.map(function (employee) {
		galleryHTML += `
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

	// Add all employee cards to the page
	gallery.innerHTML = galleryHTML;
}


// =====================================
//    SEARCH
// =====================================

// Add the search bar to to page
function addSearch() {
	let formHTML = `
		<form action="#" method="get">
			<input type="search" id="search-input" class="search-input" placeholder="Search...">
		</form>
	`;
	// Add search elements to the page
	searchContainer.innerHTML = formHTML;

	const searchInput = document.querySelector('#search-input');

	// Call search() function when input value changes
	searchInput.addEventListener('input', () => {
		searchString = searchInput.value;
		newQuery();
	});
}


// Update filteredEmployeeList using search query and update cards on page
const newQuery = () => {
	filteredEmployeeList = [];

	// For each item in the full employee list
	for (let i = 0; i < fullEmployeeList.length; i++) {
		// Select the employee's full name as a string
		let name = `
			${fullEmployeeList[i].name.first} ${fullEmployeeList[i].name.last}
		`;
		// If the employee's name contains the search query substring
		if (name.includes(searchString)) {
			// Add employee to filteredEmployeeList array
			filteredEmployeeList.push(fullEmployeeList[i]);
		}
	}

	// Update employee cards on page based on filteredEmployeeList array
	displayEmployees(filteredEmployeeList);
};


// =====================================
//    MODAL
// =====================================

// Hide button
function hide(element) {
	element.style.visibility = 'hidden';
}


// Display button
function show(element) {
	element.style.visibility = 'visible';
}


// Update employee info in the modal
function updateInfo(employeeIndex) {
	// Get employee object based on array index
	let employee = filteredEmployeeList[employeeIndex];

	// Format birthday
	let birthday = new Date(employee.dob.date);
	birthday = birthday.getMonth() + 1 + '/' +
		birthday.getDate() + '/' +
		birthday.getFullYear();

	// Build HTML for modal info section
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

	// Add modal HTML to page
	document.querySelector('.modal-info-container').innerHTML = infoHTML;
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
		// Get email of clicked card
		const employeeEmail = card.children[1].children[1].textContent;

		const container = document.createElement('div');
		container.classList.add('modal-container');

		// Use email to find index of employee in filteredEmployeeList array
		currentIndex = filteredEmployeeList.findIndex(employee => employee.email === employeeEmail);

		// Build HTML for modal
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

		// Add modal to page
		document.querySelector('body').append(container);

		// Update employee info in the modal
		updateInfo(currentIndex);

		const closeButton = document.querySelector('.modal-close-btn');
		const prev = document.querySelector('#modal-prev');
		const next = document.querySelector('#modal-next');

		// Close modal if user clicks modal close button
		closeButton.addEventListener('click', e => closeModal(e));

		// Hide appropriate button if first or last card is clicked
		if (currentIndex === 0) hide(prev);
		if (currentIndex === filteredEmployeeList.length - 1) hide(next);

		// Listen for "prev' and 'Next' button clicks and update modal info
		prev.addEventListener('click', () => updateModal(prev, next));
		next.addEventListener('click', () => updateModal(next, prev));

		// Close modal if user clicks on anything except the modal
		document.querySelector('.modal-container').addEventListener('click', e => {
			if (!e.target.closest('.modal') 
					&& !e.target.closest('.modal-btn-container')) {
				closeModal();
			}
		});
	}
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