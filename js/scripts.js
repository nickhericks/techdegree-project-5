
const gallery = document.querySelector('#gallery');



fetch('https://randomuser.me/api/?results=12')
	.then( response => response.json() )
	.then( data => displayEmployees(data.results) );


function displayEmployees(employees) {
	console.log(employees);

	let html = ``;

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
	})

	gallery.innerHTML = html;
}